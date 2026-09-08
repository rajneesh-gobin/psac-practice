# Onboarding audit

Last reviewed: 8 September 2026

This review uses one simple test for every role: can a new person tell what to
do next without understanding the structure of the application? “Easy” means
the next useful action is visible and explained in everyday language. “Hard”
means the user must understand a product term, discover a hidden menu, or
interpret a dashboard before receiving value.

## Current journey scorecard

| Journey | Current difficulty | What already helps | Main remaining friction |
| --- | --- | --- | --- |
| Visitor to parent registration | Medium | Clear family purpose and friendly visual treatment | Registration, email state and sign-in recovery are separate concepts; the visitor may not know whether to register, confirm, resend or reset |
| Parent creates the first child | Medium–easy | One compact family setup form, parent chooses the child PIN, and login details are explained | “Family name”, username and PIN create a three-part login that the parent must remember to give the child |
| Parent hands the device to a child | Easy after setup | One-time callout points to **Switch to student mode** and quietly disappears; installed child shortcuts reduce later switching | Before seeing the callout, “student mode” can sound like a setting rather than handing the device to the child |
| Returning parent | Medium | Session restoration, retry state and dedicated parent dashboard exist | A failed first family fetch still feels like a broken account even when Retry succeeds |
| Second parent / co-parent | Medium–hard | Add-parent access exists beside Add child and in Settings | The distinction between adding a parent, changing account settings and sharing family access is not self-explanatory |
| Child signs in | Medium | Four-digit PIN and remembered/installable child profile are child-friendly | First use still requires family name + username + PIN unless launched from the personal shortcut |
| Child chooses what to practise | Easy | A five-question first mission, subject cards, hints and game zone provide obvious starting points | The full syllabus and percentages can become dense after the first mission; progress language must consistently reflect coverage, not only accuracy |
| Teacher first login | Medium–easy | Home answers “what is active?”, “who needs help?” and exposes three large actions | A teacher with no data sees several product areas before understanding the classroom workflow |
| Teacher creates a classroom | Easy | Short creation form and two access models | “Individual PINs” creates numbered pupil slots, which previously looked like a finished roster |
| Teacher opens a new classroom | **Easy after this change** | A three-step guide now says: name pupils, set an activity, then share link + PIN; it adapts to shared and individual PIN classrooms | Worksheet versus on-screen questions still requires a choice, but it is now introduced at the moment it matters |
| Pupil opens teacher work | Easy | The teacher shares one link and the pupil supplies either a personal/class PIN or nickname, depending on assignment mode | The teacher must communicate the correct PIN rule outside the app; share copy should always include it clearly |
| Teacher checks progress | Medium–easy | Home, classroom overview, Results and “may need help” summaries use real submission data | Similar information exists at home, classroom and Results levels; labels must keep the scope clear |
| Admin first use | Hard, acceptable for a power role | Main areas are separated into Members, Teachers, Content, Reports, Roles, Plans and Maps | There is no role-based starting checklist; high-impact actions and diagnostics compete equally for attention |

## Change implemented from this audit

A classroom with no work no longer opens on a full command dashboard. It opens
on a three-step setup guide based on the classroom’s real state:

1. Name the generated pupil slots and review their private PINs, or view the
   shared class PIN.
2. Create the first on-screen activity or worksheet.
3. Open the work item and share its link with the correct PIN instructions.

The guide explicitly explains that classroom pupils are guests and do not need
family accounts. It opens automatically after classroom creation, can be
dismissed without removing any feature, and can be reopened using **How
classrooms work** on an established classroom.

## Recommended next onboarding improvements

These are ordered by benefit and implementation size.

1. **One sign-in recovery decision screen.** After an email is entered, explain
   the actual state: active account → sign in/reset password; awaiting approval
   → resend/continue; no account → register. This removes guessing.
2. **Printable or shareable child login card.** Immediately after creating a
   child, offer one card containing family name, child username, PIN and the
   login address. This makes the three-part login a hand-off object, not a
   memory task.
3. **Co-parent invitation wizard.** Use three plain steps: enter the other
   parent’s email, explain what they can see, send invitation. Avoid routing a
   first-time user through general Account & Settings.
4. **Role-specific empty home states.** Keep the normal dashboards for active
   users, but show one primary path when there is no data: parent → add child;
   teacher → create classroom; child → first mission; admin → review account
   health and pending items.
5. **Admin “start here” strip.** A small dismissible checklist should identify
   pending registrations, unresolved question reports and failed content
   imports. Admin is the only role where a denser interface is justified, but
   urgency still needs hierarchy.
6. **Consistent help language.** Use “pupil”, “classroom”, “work link”, “PIN” and
   “submission” consistently. Avoid changing between guest, student, member,
   assignment and homework when they describe the same step in one journey.

## Acceptance standard for future screens

Every new-role or empty-data screen should pass these checks:

- One visually dominant next action, written as a verb.
- A one-sentence explanation of what happens after tapping it.
- No unexplained zero-value analytics before the user creates data.
- No more than one unfamiliar choice at a time.
- A safe way to go back, skip help, and reopen help later.
- Touch targets of at least 44 px and readable light/dark contrast.
- Refresh returns to the same role and meaningful location.
- Network failure says that data was not lost and offers a retry.

