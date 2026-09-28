# PROJECT BRIEF

_Last updated: 2026-09-28_

## 1. What the app is

A mobile review app for **aspiring senior deck officers** preparing for the **MARINA (Philippines) deck officer licensure exams**. It is similar to the app "mtestm": students pick a subject, answer multiple-choice practice questions, take timed mock exams, see their score with the correct answers and explanations, and track their progress over time.

Working name: **(to be decided)**. Placeholder in the code will be "Deck Review".

## 2. Who it is for

- **Main users:** deck cadets and officers (OIC-NW, 2nd Mate, Chief Mate, Master candidates) studying for MARINA deck exams.
- **Audience size:** public. Any aspiring senior deck officer can download it.
- **Where they use it:** often on board ships with **slow or no internet**. The app must work fully offline once installed.

## 3. The project owner

- The owner is a Chief Mate on a container ship with **no coding background**.
- All instructions must be in plain language, one step at a time.
- Internet on board is slow or limited, so big downloads should be done in port when possible.

## 4. Exam scope

- **Deck department only** (no engine questions).
- Questions will be grouped by **exam level** and **subject/function**. For example, the reference app has a deck called "C13 Deck MGT F2", which means Management level, Function 2.
- **To confirm with owner:** the exact list of subjects/functions to use as categories.

## 5. Where the questions come from

- The owner has **their own question files** and the right to use them.
- **To confirm:** the file format (Excel, Word, PDF?) and whether explanations are already included.
- The questions will be converted into one standard format and **built into the app**, so no internet is needed to practise.

## 6. Feature list

### Version 1 (must have)
1. **Question bank by subject**: browse subjects and see how many questions each has.
2. **Practice mode**: answer multiple-choice questions (A–D) one at a time and see right or wrong straight away, with an explanation. Two orders: **in sequence** and **random**.
3. **Timed mock exam**: a set number of questions with a countdown timer. Answers are only shown at the end.
4. **Results screen**: score, pass/fail, and a list of every question with the student's answer, the correct answer and the explanation.
5. **Progress tracking**: for each subject, questions answered, % correct and mock exam history.
6. **Mistakes list** (like mtestm's "Error-Prones"): questions the student got wrong, for re-practice.
7. **Favorites**: star a question to review later.
8. **Works offline**: everything above works with no internet.

### Later (nice to have)
- Personal notes on a question
- "Mastered" marking, and hiding mastered questions
- Flashcard mode
- User accounts and progress backup to the internet
- Leaderboard / ranking list
- AI explanations
- Dark mode / eye-friendly green reading background (mtestm has one)
- Updating the question bank without reinstalling the app
- Earning money (ads or paid version), to be decided much later

## 7. Chosen technology (and why, in plain language)

**Plan: build as a web page (HTML) first, then turn it into Android + iPhone store apps later.**

### Stage 1: HTML web app (now)
| Tool | What it is | Why we chose it |
|---|---|---|
| **HTML** | The language that describes what is on the page (text, buttons). | The simplest possible start. No installs needed. |
| **CSS** | The language for colors, sizes and layout. | Makes the app look like a phone app. |
| **JavaScript** | The language that makes things happen (checking answers, timer, scores). | Runs in every browser. It will also run inside the future store apps. |
| **Plain files, no extra tools** | The app is just a few files in a folder. You double-click `index.html` to open it in Chrome. | No big downloads, which suits slow ship internet. Works offline. |
| **Questions in `questions.js`** | All questions stored in one file inside the app folder. | Works offline. It's kept separate so questions can be updated without touching the app code. |
| **Browser storage (localStorage)** | A small storage area inside the browser that remembers things. | Saves progress, mistakes and favorites on the device, without internet or logins. |
| **VS Code** | The program on your laptop where you edit files. | You already have it. |

### Stage 2: store apps (later)
| Tool | What it is | Why |
|---|---|---|
| **Capacitor** | A free tool that wraps our web app inside a real Android app and iPhone app. | We reuse almost all of the Stage 1 work instead of rewriting it. |
| **Node.js, Android Studio / cloud build for iPhone** | Tools needed only when making store versions. | To be planned when we reach Stage 2. Large downloads, so do it in port. |

Note: Apple may reject apps that are "just a website". Ours works fully offline and has real features, so it should pass. We will review Apple's rules before submitting.

### Costs to know about (only when publishing, not now)
- **Google Play developer account:** US$25, paid once.
- **Apple developer account:** US$99 **per year**.
- Stage 1 costs nothing.
