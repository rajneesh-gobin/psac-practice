// Re-encode a Chrome-produced RGB(A) PNG as 8-bit grayscale, deflate level 9.
// These past-paper diagrams are black line art on white, so colour costs 3-4x
// for nothing. No dependencies — Node's zlib does the work.
//
//   node pnggray.js in.png out.png
const fs = require('fs');
const zlib = require('zlib');

function readChunks(buf) {
  const out = [];
  let p = 8; // skip signature
  while (p < buf.length) {
    const len = buf.readUInt32BE(p);
    const type = buf.toString('ascii', p + 4, p + 8);
    out.push({ type, data: buf.subarray(p + 8, p + 8 + len) });
    p += 12 + len;
  }
  return out;
}

function crc32(buf) {
  let c, crc = 0xffffffff;
  for (let n = 0; n < buf.length; n++) {
    c = (crc ^ buf[n]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = c ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}

const [, , IN, OUT] = process.argv;
const src = fs.readFileSync(IN);
const chunks = readChunks(src);
const ihdr = chunks.find(c => c.type === 'IHDR').data;
const W = ihdr.readUInt32BE(0), H = ihdr.readUInt32BE(4);
const depth = ihdr[8], colorType = ihdr[9];
if (depth !== 8 || (colorType !== 2 && colorType !== 6)) {
  console.error('expected 8-bit RGB/RGBA, got depth ' + depth + ' colorType ' + colorType); process.exit(1);
}
const CH = colorType === 6 ? 4 : 3;

const raw = zlib.inflateSync(Buffer.concat(chunks.filter(c => c.type === 'IDAT').map(c => c.data)));
const stride = W * CH;
const px = Buffer.alloc(H * stride);          // unfiltered RGB(A)
let sp = 0;
for (let y = 0; y < H; y++) {
  const f = raw[sp++];
  const row = raw.subarray(sp, sp + stride); sp += stride;
  const cur = px.subarray(y * stride, (y + 1) * stride);
  const prev = y ? px.subarray((y - 1) * stride, y * stride) : null;
  for (let x = 0; x < stride; x++) {
    const a = x >= CH ? cur[x - CH] : 0;
    const b = prev ? prev[x] : 0;
    const c = prev && x >= CH ? prev[x - CH] : 0;
    let v = row[x];
    if (f === 1) v += a;
    else if (f === 2) v += b;
    else if (f === 3) v += (a + b) >> 1;
    else if (f === 4) {
      const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
      v += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
    }
    cur[x] = v & 0xff;
  }
}

// grayscale, one filter-0 byte per row, then Sub-filter which suits line art
const outRaw = Buffer.alloc(H * (W + 1));
for (let y = 0; y < H; y++) {
  const o = y * (W + 1);
  outRaw[o] = 1; // Sub
  let prevG = 0;
  for (let x = 0; x < W; x++) {
    const i = y * stride + x * CH;
    // luma; alpha is opaque throughout a PDF render
    const g = (src.length, (px[i] * 299 + px[i + 1] * 587 + px[i + 2] * 114) / 1000) | 0;
    outRaw[o + 1 + x] = (g - prevG) & 0xff;
    prevG = g;
  }
}

const newIhdr = Buffer.alloc(13);
newIhdr.writeUInt32BE(W, 0); newIhdr.writeUInt32BE(H, 4);
newIhdr[8] = 8; newIhdr[9] = 0; newIhdr[10] = 0; newIhdr[11] = 0; newIhdr[12] = 0;

const out = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', newIhdr),
  chunk('IDAT', zlib.deflateSync(outRaw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);
fs.writeFileSync(OUT, out);
console.log(IN.split(/[\\/]/).pop() + ' -> ' + OUT.split(/[\\/]/).pop() + '  ' + W + 'x' + H + '  ' +
  (src.length / 1024).toFixed(0) + ' KB -> ' + (out.length / 1024).toFixed(0) + ' KB');
