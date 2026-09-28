# DESIGN

_Last updated: 2026-09-28_

## 1. Reference

The design is inspired by the app **mtestm**. The owner saved five screenshots in the project folder:

- `APP LAYOUT (1).jfif`: a question screen (green reading background, top toolbar, "View answer" button)
- `APP LAYOUT (2).jfif`: a deck/subject "Detail" screen (counters and practice mode buttons)
- `QUESTIONS (1)`, `(2)`, `(3).jfif`: question screens with the correct answer highlighted in green

We copy the **layout ideas**, not mtestm's name, logo or questions.

## 2. Design principles

- **Big, readable text.** Questions can be long, and people often study when tired after a watch.
- **One question per screen.** Large, easy-to-tap answer buttons.
- **Simple, calm colors.** Maritime navy with clear green/red for right/wrong.
- **No clutter, no ads** in version 1.
- **Works one-handed** on a phone.

## 3. Colors

| Use | Color | Hex code |
|---|---|---|
| Main color (headers, buttons) | Navy blue | `#1F3A68` |
| Accent (highlights, progress bars) | Sea blue | `#2F80C9` |
| Correct answer | Green | `#2E9E5B` |
| Wrong answer | Red | `#D64545` |
| Favorite star | Amber | `#F2A900` |
| Page background | Off-white | `#F7F8FA` |
| Main text | Near-black | `#1C1C1E` |
| Secondary text | Grey | `#6B7280` |

(A hex code is a short code that tells the computer an exact color.)

## 4. Fonts

- Use the **phone's built-in font** (Roboto on Android, San Francisco on iPhone). No font downloads are needed and it's easy to read.
- Question text: 18 pt. Answer text: 17 pt. Headings: 22 pt, bold.

## 5. Screens

### 5.1 Home screen
- App name at the top.
- A **"Continue where you left off"** card.
- A list of **subjects** (for example "Management – Function 2: Cargo Handling & Stowage"). Each row shows the number of questions and a small progress bar (% answered).
- Bottom tab bar: **Home · Mistakes · Favorites · Progress**.

### 5.2 Subject detail screen (like `APP LAYOUT (2)`)
- Subject title, and the number of questions.
- A row of 4 counters: **Mistakes · Favorites · Answered · Accuracy %**.
- Buttons in a grid (icon + label):
  - **Sequential Practice**: questions in order, starting where you stopped
  - **Random Practice**: questions shuffled
  - **Mock Exam**: timed test
  - **Review Mistakes**
  - **Favorites**: practise this subject's starred questions (added 2026-09-28)
  - **View Questions**: browse with answers shown
- Buttons with nothing to practise (for example no mistakes yet) are greyed out.

### 5.3 Practice question screen (like `QUESTIONS (1)–(3)`)
- **Top bar:** back arrow · question counter (for example **24 / 331**) · star (favorite) button.
- Question text.
- Four answer buttons, each with a circle letter **A B C D** and the answer text.
- When the student taps an answer:
  - If it's right, the chosen answer turns **green**.
  - If it's wrong, the chosen answer turns **red** and the correct one turns **green**.
  - An **Explanation** box appears below (if the question has one).
- **Bottom:** "Previous" and "Next" buttons. Swiping left/right also moves between questions.

### 5.4 Mock exam setup screen
- Choose the number of questions (for example 25 / 50 / 100) and the time limit.
- Shows the **passing score** (MARINA passing mark to be confirmed; default 70%).
- A **"Start Exam"** button.

### 5.5 Mock exam question screen
- Same as the practice screen, but:
  - A **countdown timer** at the top.
  - Right/wrong is **not** shown until the end.
  - A **question map** button shows a grid of numbers so the student can jump to any question and see which are unanswered.
  - A **"Submit"** button (asks "Are you sure?" first). The exam also submits automatically when time runs out.

### 5.6 Results screen
- A big score (for example **42 / 50 · 84%**) and **PASSED** / **FAILED**.
- Time used.
- A list of all questions. Tap one to see your answer, the correct answer and the explanation.
- Buttons: **Retry wrong answers** · **Back to subject**.

### 5.7 Mistakes screen and Favorites screen
- Lists of questions grouped by subject, with a **"Practise these"** button.
- A question leaves the Mistakes list after it's answered correctly twice in a row.

### 5.8 Progress screen
- Overall accuracy and total questions answered.
- Per-subject accuracy bars.
- Mock exam history: date, subject, score, pass/fail.

## 6. How the user moves between screens

```
Home ──tap subject──▶ Subject Detail ──▶ Practice (Sequential / Random)
  │                         │
  │                         ├──▶ Mock Exam Setup ──▶ Mock Exam ──▶ Results
  │                         │
  │                         └──▶ Review Mistakes / View All Questions
  │
  └── bottom tabs: Home · Mistakes · Favorites · Progress
```

The back arrow always returns to the previous screen. Leaving a mock exam early asks "Quit exam? Your answers will be lost."
