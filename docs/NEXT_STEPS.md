# NEXT STEPS

_Last updated: 2026-09-28_

## Where we stopped

**Stage 1 (HTML web app): the first working version is built** in `PROJECT 1\app`. Open it by double-clicking `index.html`. Every Version 1 feature works: subjects, practice modes, mock exam with timer, results, mistakes, favorites and progress. It currently has **3 real questions + 10 SAMPLE questions**.

## Unfinished / waiting on the owner

- **The real question files** (Excel, Word or PDF?), so they can be loaded into `questions.js`
- **The real subject list** (currently placeholders: Management Level Functions 1–3)
- **Check the explanations** Claude wrote for the 3 real questions (`questions.js`, MGT-F3-0001 to 0003)
- Confirm the exam rules: pass mark 70% and 1 minute per question are current defaults
- App name (placeholder "Deck Review")

## Known bugs / limitations

- No known bugs.
- Progress is saved per browser. Chrome and Edge keep separate progress.
- Can't be opened on a phone yet (see task 3).
- Leaving a mock exam with the browser's own back button or by closing the tab loses the exam without asking. The in-app ‹ button asks first.

## Next tasks, in order

1. **Owner tests the app on the laptop** and lists anything to change (look, wording, behaviour).
2. **Load the real questions:** the owner shares a question file, and we build a quick way to convert it into `questions.js` (probably Excel → copy/paste → converter page).
3. **Put the app online for phone testing:** IN PROGRESS. The plan is GitHub Pages via drag-and-drop upload (see CODE_MAP.md section 5). Confirm the site works at `https://USERNAME.github.io/deck-review/`, then open it on Android/iPhone and "Add to Home Screen".
4. **Make it installable and offline on phones** (a "PWA": a web app that installs like a normal app and works with no signal).
5. **Stage 2:** wrap it with Capacitor into Android and iPhone store apps.

## Later ideas (not scheduled)
Notes on questions, "mastered" marking, flashcards, dark/green reading mode, accounts and backup, leaderboard, AI explanations.
