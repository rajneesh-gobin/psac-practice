# Science Labs: student usability audit and redesign proposal

Date: 12 September 2026. Audience: product owner, teachers and implementers.

## Verdict and limits

The reported difficulty is credible and supported by the implementation. Ten students across Grades 5–9 reportedly could not understand how to complete the questions. Treat this as a serious failure of independent use in that trial. It does not establish that every lab fails, that every student would fail, or that simulations have no educational value.

The product offers substantial experiment functionality, but students must understand several separate systems before reaching the questions: the bench, guided experiments, missions, discoveries, notebooks and completion rewards. Some interactions also behave inconsistently with their instructions.

This is a source-based usability audit, with targeted execution of actual JavaScript functions. It is not an observed student session or a visual walkthrough of the deployed site. The deployed URL and students' specific labs, devices and task wording were not supplied. Local code includes the syntax and star-radius fixes made earlier in this conversation; deployment of those fixes is unverified. Detailed journey review sampled Circuit Board (Grades 4/6/7/9), Sun, Earth & Moon (6/7), and Food Tests (8), plus the shared shell and CSS. Earlier checks covered syntax in all 47 lab JavaScript files.

## Findings supported by the code

| Priority | Finding | Evidence | Student consequence |
|---|---|---|---|
| P0 | A circuit guide can direct the wrong operation and make recovery hard. | `lab_circuit.js:386`: tapping an occupied slot with a different selected component replaces it. `:410`: placing a wire does not reset the selected tool. `:1134`: switch steps highlight the switch, but dim the hand tool. `labs.css:155` disables pointer interaction with dimmed controls. | After placing a wire, following “Tap the switch” can replace the switch with wire. The learner followed the instruction but the guide does not advance. |
| P0 | Loading/rendering faults undermine any learning flow. | Earlier work found apostrophe syntax failures in ten lab data files including Circuit; Sun/Moon also had a negative canvas radius. These are fixed locally. | A broken or partly mounted lab can feel like unexplained, non-working buttons. Verify the deployed revision before interpreting every failure as a design issue. |
| P1 | Experiment completion and question completion are separate journeys. | Circuit `:1098` saves guide completion and offers another guide, exploration or the Missions tab. `:790` starts a mission with a reset/replacement layout. Food `:487` resets its rack on mission start. Sun/Moon `:449` resets its simulation. | “I finished the experiment—why have I not answered anything, and why am I starting again?” |
| P1 | Too many equally plausible starting choices. | Circuit `:1167` presents guides, missions and free building. Grade 7 has 4 guides, 3 missions and 14 discoveries. Food Grade 8 has 5 guides, 2 missions and 16 discoveries. Sun/Moon `:834` renders 11 tool buttons at Grade 6 and 13 at Grade 7. These are content/control counts, not measured simultaneous viewport counts. | Students must choose a route before knowing how the routes differ. |
| P1 | Guidance is available, but does not consistently continue into missions. | Circuit `:793` stops the guide on mission start; `:1138` only computes target highlighting when a guide is active. Mission question button `:1372` is absent until the success condition is met. | The support disappears on the route required to reach the questions. The missing question button does not explain what is still required. |
| P1 | Progress can claim things the student has not done. | Sun/Moon `lab_sunmoon_data.js:462` accepts two generic observations for the shadow mission. `lab_sunmoon.js:290` and `:353` increment that counter. Its checklist at `:787` names sunrise, noon and sunset; it also marks “Answer the questions” done when the experiment is merely ready. | The checklist and the actual completion rules disagree, making progress hard to trust. |
| P1 | Some completion rules measure clicking rather than the intended evidence. | Sun/Moon's seasons mission accepts `spinning: true`; the shadow mission does not require the stick or distinct times. `_satisfied` at `lab_sunmoon.js:501` can skip an observe step because an earlier observation/time change already increased the counter. | A learner may advance without making the intended comparison or recording a fresh observation. |
| P2 | Feedback and evidence are separated. | Shared quiz `lab_core.js:408` receives question text, choices and explanation; its overlay does not include the student's experiment readings. Circuit's notebook is a different panel region. | Questions become a recall quiz after a simulation rather than an explanation of the evidence the student collected. |
| P2 | Mobile layout changes position between modes. | `labs.css:199` puts the side panel first on narrow screens, then reverses that order during a guide. The guide becomes sticky at `:209`, but remains after the canvas in the stage markup. | This may create loss of position or repeated scrolling between instructions, apparatus and results. This is a layout risk requiring phone testing, not a measured visual finding. |
| P2 | Generic stuck hints are not tied to the current task. | `lab_core.js:534–559` queries a combined selector for a start item or primary button after inactivity. It does not choose the active lesson's missing requirement. A combined selector returns the first matching element in document order, not a ranked selector preference. | A pulsing button can be irrelevant to why the student is stuck. |
| P2 | Rewards can penalize productive experimentation. | Circuit `:889` reduces mission stars for hazards, wiring mistakes and quiz performance. | Students can experience a useful mistake as failure. Safety learning still matters, but practice should support correction and explanation. |
| P2 | Grade 5 is an alias rather than a dedicated lesson progression. | `lab_core.js:106` maps Grade 5 to Grades 4 and 6. | Grade 5 suitability needs an explicit teacher/content check. Shared access alone does not establish that the instructions and prerequisites fit. |

Targeted reproductions: executing the actual `tapSlot` function with the wire tool selected and a switch in the target slot called `place(slot, 'wire')`, rather than operating the switch. Executing the Sun/Moon `missionReady` function returned true for a shadow state with two observations, no stick and no distinct times, and true for seasons with spinning alone. These establish logic behavior; they do not substitute for browser end-to-end tests.

## What is worth keeping

The product already has first-visit “Show me how” entry points, grade filtering, one-step guide text, target highlights, some read-aloud controls, simulated outcomes, notebooks, corrective feedback and saved results. Circuit data has extensive passing solver/recipe tests. Saying there is literally no flow or no useful functionality would be inaccurate.

However, the presence of these features does not prove that a student can complete a meaningful activity independently. Adding another help paragraph or more badges is unlikely to resolve the separation between activities and questions.

Earlier broad tests reported 17 of 22 data suites failing. Many failures concern guide-button contracts; some may reflect stale tests after interaction changes. Do not convert that figure into “17 broken labs.” Reconcile the intended behavior and test expectations, and add real student-path checks.

## Proposed student journey

Make a short investigation the default entry point. Keep free exploration accessible as a secondary route. Each investigation should answer one interesting question and include its own questions and completion result.

**Choose a question → Predict → Experiment → Record/compare → Explain → Finish → Try a new case or explore**

1. **Choose:** show one recommended activity with an outcome and estimated duration; put other activities behind “Choose another.” Example: “Can you make this bulb light? About 4 minutes. Build it, test it, answer 2 questions.” Duration is an initial design target to validate, not a measured completion time.
2. **Predict:** ask for a simple prediction before revealing the result. Predictions are ungraded and revisable.
3. **Experiment:** start with a useful setup. Keep the current goal, one next instruction and relevant controls visible together. Teach the unfamiliar interaction briefly, then let the learner make meaningful choices.
4. **Record/compare:** show the actual result beside the apparatus. Capture stable results, and let the student identify the change or compare two trials. Teach manual measurement only when measurement is the learning objective.
5. **Explain:** ask a question using the student's saved evidence. On difficulty, offer a relevant hint or a return to the experiment without losing progress.
6. **Finish:** say exactly what is completed: “Investigation complete. You compared an open and closed circuit and explained the result.” Show what to practise next and make free exploration optional.

Do not force children through a long click-by-click script for the whole lesson. Reduce interface confusion while preserving scientific thinking: predictions, variable choices, comparisons, reasoning and transfer. PhET warns that excessive procedural directions can restrict exploration; EEF describes fading worked-example support as learners become more independent. The proposed combination is a design recommendation, not proof that this implementation will improve learning.

## Concrete first pilot: Circuit Board

Learning objective for the primary version: explain that the bulb lights when the circuit makes a complete loop.

| Phase | What the student sees/does | Completion evidence |
|---|---|---|
| Start | “Can you light the bulb?” A cell, bulb and switch already placed; one obvious wire gap. Main action: “Start investigation.” | The selected activity is clear. |
| Predict | “Will the bulb light with this gap?” Choose yes/no. | Prediction stored, no penalty. |
| Try | “Connect the gap.” Only the relevant wire action is introduced. Then “Close the switch.” | Correct connection and switch state, validated from the solver. |
| Notice | Bulb lights. Ask “What changed?” Then allow opening/closing the switch. | Two actual states recorded: closed/lit, open/dark. |
| Explain | “Why did the bulb go out?” The two observations remain visible beside the choices. | Answer and feedback acknowledged; misconception-specific retry supported. |
| Transfer | Show a different circuit with a gap elsewhere. Ask the learner to repair it with less guidance. | Successful repair and explanation, with assistance level recorded separately. |
| Finish | “You completed: Making a complete circuit.” Optional “Try conductors” and “Explore the bench.” | Investigation saved once; no switch to a separate mission or reset required to finish. |

Keep meters, symbols, component banks and safety scenarios out of the first task unless that task needs them. Safety scenarios belong in clearly labelled relevant activities, rather than competing with “close the switch.” The broader sandbox remains available.

For Grades 7–8, progress to series/parallel comparisons, test selection and recording results. For Grade 9, allow more setup decisions, quantitative readings, graphs and exam-style explanations. Use task prerequisites and demonstrated independence as well as grade; an older novice may still need interaction help.

## Other sampled lab proposals

- **Sun/Moon:** separate day/night, shadows, moon phases and eclipses into short investigations. For shadows, record a distinct observation for sunrise, noon and sunset with the stick present. Show three snapshots together and ask which shadow is shortest and why. Do not mark questions done before submission. Review the seasons model separately: spinning Earth alone is not adequate evidence of a seasons investigation.
- **Food Tests:** begin with one question such as “Does bread contain starch?” Limit the first setup to the sample, iodine test and a control, with observed colours labelled in words. Add a prediction, comparison and explanation. Introduce the other food tests in later investigations, then use an unknown sample as a transfer challenge. Keep safe simulation handling instruction within the relevant steps.
- **Across labs:** use “Start,” “Continue,” “Check my result,” “Explain,” and “Finish” consistently. Avoid making students learn “guide” versus “mission” as a prerequisite for learning science.

## Implementation plan

**First: repair trust and completion logic.** Verify deployed loading/rendering fixes. Correct the circuit tool/guide mismatch. Make shadow checklists and readiness derive from the same validated observation records. Ensure a learner can recover from a wrong action without restarting. Fix the intended contracts before changing tests to pass.

**Next: implement one complete investigation, not a simultaneous rewrite of every lab.** Pilot Circuit Board for one primary grade and Grade 7; use the same lesson shell with different content. Preserve existing simulation/data functions. Add a shared lesson controller to the lab shell, with each lab providing its allowed actions, observation capture and completion checks.

An activity should define its objective, grade/prerequisites, starting setup, steps, evidence requirements, questions and transfer task. Persist an attempt's activity/version, current step, observations, answers and assistance separately from final completion. Reloading should offer “Continue your investigation.” A task completes from validated actions/evidence, not an arbitrary number of button clicks. Provide graceful resume handling if an activity changes version.

Question rendering should accept relevant evidence from the current attempt. Training completion and independent first-attempt performance should be distinguishable, so using hints does not prevent finishing or falsely imply independent mastery. Keep this separate from exam mastery until an intentional assessment policy is defined.

**Then: expand only after student testing.** Port one observational lab (Sun/Moon) and one procedural lab (Food Tests). Those three interaction types will expose whether the shared flow generalizes. Preserve advanced/free exploration access; do not impose a rigid wizard on every use case.

## Validation with students

Invite returning students and some first-time users. Returning students can compare the redesign but are no longer a clean first-use sample. Record grade, device, selected activity, version and whether an adult helped. Observe individually before group discussion.

Give a task, not navigation directions: “Use this investigation to find out why a bulb goes out. Complete its questions. Tell me when you are finished.” Do not explain which tab to use. When a student stops, ask “What are you looking for?” Record the exact step, action and expectation.

Suggested pilot acceptance targets, to agree before testing:

- At least 8/10 start the intended activity within 30 seconds without adult direction.
- At least 8/10 complete the short investigation and find its questions without adult navigation help. Built-in help is allowed and recorded.
- All tested paths avoid crashes, unrecoverable states and unexplained disabled controls.
- At least 8/10 can tell when the activity is finished and explain the target concept in their own words or a simple drawing.
- Check transfer with a new example; completing the interface alone is not evidence of learning.
- Inspect every grade/device subgroup and every failure; these small-sample targets are product gates, not statistical proof of educational effectiveness.

Useful events: activity started, step entered, valid experiment action, evidence captured, hint requested, question answered, resumed, completed and runtime error. Record elapsed time per step and adult intervention during moderated testing. Avoid treating every extra tap as confusion: purposeful exploration matters. Collect only the task data needed for the evaluation.

Technical checks should use actual visible controls for full student paths, include wrong actions and recovery, verify the questions unlock only after the displayed requirements, and cover reload/resume, keyboard use and narrow phone layouts. Data-only recipe tests and a page without overflow cannot establish usability.

## Research used to inform the proposal

- [PhET: designing and facilitating small-group simulation activities](https://phet.colorado.edu/en/teaching-resources/teaching-with-phet/small-group): focused, inquiry-oriented activities around simulations.
- [PhET: guidance for homework activities](https://phet.colorado.edu/files/guides/UG-Guide-HW_en.pdf): excessive procedural direction can restrict exploration; support sense-making and student decisions.
- [EEF: supporting pupils with worked examples](https://educationendowmentfoundation.org.uk/news/supporting-pupils-with-worked-examples): use worked examples and gradually fade support toward independent practice.
- [EEF: Improving Secondary Science](https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/science-ks3-ks4): evidence-informed science teaching guidance, relevant to the secondary portion of this audience.

Recommendation: retain the simulation investment, fix the concrete defects, and replace the beginner entry experience with a small number of coherent investigations. Success means a student can say what they are testing, what happened, why it happened and when they have finished.
