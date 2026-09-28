# CODE MAP

_Last updated: 2026-09-28_

## 1. Folder structure (actual)

```
PROJECT 1/
├── docs/                      ← project documentation (single source of truth)
│   ├── PROJECT_BRIEF.md
│   ├── DESIGN.md
│   ├── CODE_MAP.md
│   ├── SESSION_LOG.md
│   └── NEXT_STEPS.md
├── app/                       ← THE APP (this whole folder becomes the store app later)
│   ├── index.html             ← the page itself. Double-click to open the app.
│   ├── style.css              ← colors, fonts, layout
│   ├── app.js                 ← all the logic: screens, practice, exam, timer, scoring, saving progress
│   └── questions.js           ← the subject list + ALL questions
├── index.html                 ← tiny page that forwards web visitors to app/index.html (for GitHub Pages)
├── APP LAYOUT (1).jfif        ← mtestm screenshots used as design reference
├── APP LAYOUT (2).jfif
├── QUESTIONS (1).jfif
├── QUESTIONS (2).jfif
└── QUESTIONS (3).jfif
```

## 2. What each file does (plain language)

### `app/index.html`
The empty "frame" of the app. It loads `style.css`, then `questions.js`, then `app.js`. It has two boxes: `#app`, where every screen is drawn, and `#modal`, for pop-ups like "Are you sure?" and the exam question map. You rarely need to touch it.

### `app/style.css`
How everything looks. The color codes at the top (`--navy`, `--green`, etc.) match DESIGN.md. Change a color there and it changes everywhere.

### `app/questions.js`
- `SUBJECTS`: the subjects shown on the Home screen (id, level, name).
- `QUESTIONS`: every question. The instructions for adding one are at the top of the file.
- A question with `sample: true` is a placeholder and shows a yellow "SAMPLE QUESTION" tag in the app.

### `app/app.js`
The brain of the app, in sections:
| Section | What it does |
|---|---|
| Settings | `PASS_MARK` (70) and `SECONDS_PER_QUESTION` (60). Safe to change. |
| Saved progress | Loads and saves progress in browser storage (key `deckReview.v1`). Records right/wrong answers, the mistakes list, favorites, last position and exam history. |
| Screen switching | `go()` opens a screen, `back()` returns, `tab()` switches bottom tabs. |
| Starting practice | `startPractice()` starts the modes: sequential, random, mistakes, favorites, view, retry. |
| Mock exam | Timer, question map, submit, scoring. |
| SCREENS | One function per screen: home, subject, practice, examSetup, exam, results, mistakes, favorites, progress. |
| Swipe / keys | Swipe left/right on phones, or use the ← → arrow keys on a laptop, to change question. |

## 3. Question data format

In `questions.js`, each question looks like this:

```js
{
  id: "MGT-F3-0001",
  subject: "MGT-F3",
  question: "In a jacking system, what is referred to as a pinion?",
  choices: ["Gearwheel", "Flexible coupling", "Flexible shaft", "Flexible joint"],
  answer: 0,
  explanation: "The pinion is the small gearwheel that meshes with the rack."
},
```

- `id` must be unique.
- `subject` must match an `id` in `SUBJECTS`.
- `answer` counts from 0 (0 = A, 1 = B, 2 = C, 3 = D).
- `explanation` can be `""`.
- Keep a comma between question blocks.

## 4. Current question bank
- **3 real questions** from the owner's mtestm screenshots (in MGT-F3). The explanations for these were **written by Claude and should be checked** by the owner.
- **10 sample questions** (marked `sample: true`) spread across the three subjects, so every feature can be tested.
- The watertight-door question from the screenshot was **left out**, because its answers refer to a diagram we don't have and its correct answer wasn't shown.

## 5. How to run and test the app

**On the laptop:**
1. Open File Explorer and go to `Desktop\PROJECT 1\app`.
2. Double-click `index.html`. It opens in Chrome or Edge. **You should see:** a navy header "Deck Review" and three subject cards.
3. To see it phone-sized: press **F12**, then click the phone/tablet icon at the top-left of the panel that opens (or press **Ctrl+Shift+M**).
4. After changing a file in VS Code, save it (**Ctrl+S**), then press **F5** in the browser to reload.

**Progress is saved per browser.** Progress in Chrome is separate from progress in Edge. Use "Reset all progress" on the Progress tab to start fresh.

**Online / on a phone (GitHub Pages):**
- The project is uploaded to GitHub through the website, by drag-and-drop (Git is not installed on the laptop).
- Web address format: `https://YOUR-USERNAME.github.io/deck-review/`
- **To publish changes:** on the GitHub repository page, click **Add file → Upload files**, drag in the changed files **into the same folder they live in** (for example open the `app` folder on GitHub first, then upload `questions.js`), and click **Commit changes**. The website updates in 1–2 minutes.

⚠️ With a free GitHub account the repository is **public**: anyone can see the files, including every question. Consider this before uploading a full paid-quality question bank.
