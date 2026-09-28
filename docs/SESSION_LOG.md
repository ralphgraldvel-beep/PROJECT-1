# SESSION LOG

_Never delete entries. Add each new session at the bottom._

---

## Session 1 — 2026-09-28

### What we did
- Set up the working relationship: plain-language, step-by-step instructions, complete files only, and documentation kept in `/docs`.
- Reviewed the owner's 5 mtestm screenshots (a deck "Detail" screen and several question screens) to understand the style of app wanted.
- Asked the owner the key questions about scope.
- Chose the technology.
- Created the first version of all five documentation files.

### Decisions made (and why)
| Decision | Reason |
|---|---|
| Exam scope: **MARINA deck exams only** | Owner's choice. Keeps the first version focused. |
| Platform: **Android + iPhone store apps** | Owner's choice. The audience is public students on both kinds of phone. |
| Audience: **all aspiring senior deck officers** (public) | Owner's choice. |
| Questions come from **the owner's own files** | Owner has their own material and the right to use it. mtestm questions will not be copied. |
| Technology: **Expo (React Native)** | One codebase for both Android and iPhone, beginner-friendly, and iPhone builds can be done from Windows without a Mac. |
| **Questions built into the app, progress saved on the phone** | The app must work offline at sea. No server needed for version 1, so it's simpler and free to run. |
| User accounts, leaderboard and AI explanations **postponed** | Not needed to be useful. They add complexity and need a server. |

### Problems and solutions
- The screenshots are `.jfif` files, which Claude's image viewer did not open directly. They were copied to temporary `.jpg` versions for viewing. The originals are unchanged. (No action needed from the owner.)

### Open questions for the owner
1. What format are your question files in (Excel, Word, PDF)? Do they include explanations?
2. What subjects/functions should the app list?
3. What passing mark and time limit should mock exams use?
4. App name?

### Decision change (same session, 2026-09-28)
- **Changed:** technology from **Expo (React Native)** to **a plain HTML/CSS/JavaScript web app first**, to be turned into Android + iPhone store apps **later using Capacitor**.
- **Why:** the owner wants to start simpler. The HTML approach needs no installs and no big downloads (good for ship internet). You just double-click the file to open it. Capacitor lets us reuse the same code for the store apps later, so no work is wasted.
- **Effect:** the Node.js / Expo Go / 300–500 MB download steps are removed from the near-term plan. Updated PROJECT_BRIEF.md (section 7), CODE_MAP.md and NEXT_STEPS.md.

### First working version built (same session, 2026-09-28)
The owner said to go ahead using the questions available now.

**What was built** (in `app/`: `index.html`, `style.css`, `app.js`, `questions.js`):
- Home screen with the subject list, progress bars and a "Continue where you left off" card
- Subject detail screen with 4 counters and 6 mode buttons
- Practice: sequential (remembers position), random, mistakes, favorites, view-with-answers. Green/red feedback, explanations, favorite star, swipe or arrow keys to change question.
- Mock exam: choose the number of questions, countdown timer (1 min per question), question map, submit confirmation, auto-submit when time runs out, quit confirmation
- Results screen: score, %, PASSED/FAILED (70%), time used, "Retry wrong answers", and an answer review with explanations
- Mistakes, Favorites and Progress tabs, and a "Reset all progress" button
- Progress is saved in the browser, so it survives closing the page

**Decisions**
| Decision | Reason |
|---|---|
| Used the 3 screenshot questions + 10 clearly tagged SAMPLE questions | The owner's real question files aren't shared yet. The samples let every feature be tested. |
| Left out the watertight-door question | Its answers (1.0–4.0) refer to a missing diagram, and the correct answer wasn't visible. |
| Placeholder subjects: Management Level Functions 1–3 (STCW) | Based on "C13 Deck MGT F2" in the screenshot. **Owner to confirm the real subject list.** |
| Added a "Favorites" tile on the subject screen (not in the original DESIGN.md) | Makes the starred questions for one subject easy to reach. DESIGN.md updated. |
| A question leaves the Mistakes list after 2 correct answers in a row | Proves it was learned, not guessed. |
| Unanswered exam questions count as wrong | Same as a real exam. |

**Testing:** ran an automated click-through of every screen in Chrome (hidden, in the background). All 23 checks passed with no errors. Screenshots at phone size looked correct.

**Problems and solutions**
- Node.js isn't installed on the laptop. Not a problem, because Stage 1 doesn't need it.

### Putting the app online (same session, 2026-09-28)
- **Decision:** host on **GitHub Pages** (free), uploading by **drag-and-drop on github.com**. Reason: Git isn't installed, and the web upload needs no downloads (good for ship internet).
- Added a root `index.html` that forwards visitors to `app/index.html`, so the web address opens the app directly.
- Suggested repository name: `deck-review`, giving the address `https://USERNAME.github.io/deck-review/`.
- **Note:** a free GitHub repository is public, so all files and questions are visible to anyone. This is fine for the current sample questions. Revisit before uploading the full real question bank.
- Status at end of session: instructions given to the owner. Whether the upload succeeded is to be confirmed next session.
