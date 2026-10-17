# GPA & Grade Calculator

## 1. Project Overview

GPA & Grade Calculator is a simple web app that helps college students calculate their semester GPA, estimate their cumulative GPA, and figure out what GPA they need in future semesters to hit a target.

I built this for OIM3690 Mini Project 2 because I kept doing this math by hand (or in a messy spreadsheet) every time I wanted to see how a grade would affect my GPA. I wanted a tool that updates instantly as I add courses or change my goals, so I can explore "what if" scenarios without redoing the math myself.

## 2. Features

These are the features that are actually built and working in this repository:

- **Add, edit, and delete courses** — each course has a name, a letter grade (A through F, dropdown), and credit hours (1–5, dropdown, defaults to 4).
- **Course list** — shows all added courses, with Edit and Delete buttons for each.
- **Semester GPA** — automatically calculated using a credit-weighted formula and displayed to two decimal places.
- **Cumulative GPA** — combines a previous GPA and previous completed credits (optional, user-entered) with the current semester's courses.
- **Target GPA planner** — enter a target cumulative GPA and planned future credits to see the average GPA needed to reach it, including messages for achievable, already-secured, and impossible (>4.00) targets.
- **Input validation** — empty course names, missing grade selections, invalid credit hours, and out-of-range GPA values are all rejected with inline error messages (no `alert()` popups).
- **localStorage persistence** — courses and all form values are saved automatically and restored when the page is reopened or refreshed.
- **Reset All** — clears every course, every input, and the saved data, returning the app to its original empty state without reloading the page.
- **Responsive layout** — works on desktop, tablet, and mobile screen sizes.
- **Keyboard accessibility** — every input, dropdown, and button can be reached and used with the keyboard alone, with visible focus outlines.

## 3. How to Use

1. Open `index.html` in a web browser (or visit the live site once it's deployed — see below).
2. Fill out the **Add Course** form with a course name, letter grade, and credit hours, then click **Add Course**.
3. The course appears in the **Course List**, and the **Semester GPA** card updates automatically.
4. (Optional) Enter your **Previous Cumulative GPA** and **Previous Completed Credits** to see your estimated **Cumulative GPA**.
5. (Optional) Enter a **Target Cumulative GPA** and **Planned Future Credits** in the Target GPA Planner to see the average GPA you'd need in future semesters.
6. Use the **Edit** or **Delete** buttons on any course to update your information — all GPA results recalculate instantly.
7. Click **Reset All** to clear everything and start over.
8. Your courses and settings are saved automatically, so they'll still be there the next time you open the page in the same browser.

## 4. Technologies Used

- **HTML** — semantic page structure and accessible forms.
- **CSS** — all styling lives in `css/styles.css`, following the design system in `DESIGN.md`.
- **Vanilla JavaScript** — all logic lives in `js/script.js`, with no frameworks, libraries, or build tools.
- **localStorage (Web Storage API)** — saves course and planner data in the browser so it persists across page reloads.

No server, database, or external API is used, per `AGENTS.md`.

## 5. Live Website

TODO: Add the GitHub Pages link here once the site is deployed.

## 6. Differences from My Original Proposal

`PRD.md`'s suggested JavaScript state structure included `previousGPA`, `previousCredits`, `targetGPA`, and `futureCredits` as fields directly inside the main `state` object:

```javascript
const state = {
  courses: [],
  previousGPA: null,
  previousCredits: null,
  targetGPA: null,
  futureCredits: null
};
```

In the actual implementation, `state` only holds `courses` and `editingCourseId`. The previous GPA, previous credits, target GPA, and future credits values are instead read directly from their form inputs each time a calculation runs, and are saved to `localStorage` as part of a separate `saveState()` call. I made this choice because it avoids keeping two copies of the same value in sync (one in `state` and one in the input field), and it still satisfies the PRD's requirement that "all GPA results must be calculated from the current state rather than stored as independent values that may become outdated" — the form inputs act as the single source of truth for these fields.

## 7. What I Learned

- **JavaScript state:** I learned how to keep a single array of course objects (`state.courses`) as the "source of truth" for the app, and how every other part of the page (the course list, the GPA numbers) is just a re-rendering of that array rather than something tracked separately.
- **Dynamic calculations:** Instead of calculating GPA once and storing the result, every add/edit/delete/input event re-runs the GPA formulas from scratch using the current state. This means the displayed numbers can never go "stale" or get out of sync with the actual course list.
- **localStorage:** I learned how to serialize the course array and form values into a JSON string with `JSON.stringify()`, save it with `localStorage.setItem()`, and safely read it back with `JSON.parse()` (wrapped in a `try/catch` in case the saved data is ever corrupted or from an old format).

## 8. Required Question — AI Collaboration and Reflection

One piece of AI-generated output I reviewed and did not accept as-is was the Target GPA Planner's result message. The AI's original version displayed the same plain text color for every outcome — whether the target was easily achievable, already secured, or mathematically impossible (requiring a GPA above 4.00).

My `DESIGN.md` defines a dedicated "Success Text" color (`#167347`) and states that "the section should clearly distinguish achievable targets from targets requiring a GPA above 4.00." I compared the rendered page against this requirement and noticed the planner never actually used that color — every result looked identical regardless of whether the news was good or bad.

I asked for this to be fixed so that achievable/secured results are shown in green (`var(--color-success)`) and impossible results are shown in red (`var(--color-error)`), matching the existing error-message styling already used elsewhere on the page. I verified the fix by entering test values for all three outcomes and checking the rendered text color in the browser before accepting the change.

This experience taught me that AI-generated code can work correctly but still miss important design details. Even though the GPA calculations were accurate, I needed to compare the actual website with my DESIGN.md to make sure the results were displayed clearly. It also helped me understand why testing different scenarios is important, instead of just checking whether the code runs.

**Git Commit:** [`c8b81d1`](https://github.com/azaz2005mzhu3/gpa-grade-calculator/commit/c8b81d1b873e37c8a46fd344d311eda74fee86e7) — "Color-code Target GPA Planner result by achievability status"
