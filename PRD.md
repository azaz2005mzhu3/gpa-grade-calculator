# Product Requirements Document (PRD)

## 1. Project Name

GPA & Grade Calculator

## 2. Project Overview

GPA & Grade Calculator is a web application that helps college students calculate their semester GPA, estimate their cumulative GPA, and plan for future academic goals.

The application allows users to enter courses, grades, and credit hours, then automatically calculates GPA results based on the saved information.

The goal is to make academic planning easier through a simple, interactive, and accessible website.

## 3. Target Users

The primary users are college students who want to:

- Calculate their semester GPA.
- Understand how different grades affect their cumulative GPA.
- Explore possible grade scenarios.
- Determine what GPA they need in future semesters to reach a target.
- Save their academic information for later use.

## 4. Core Features

### Feature 1: Course Management

Users can:

- Add a course by entering its name, letter grade, and credit hours.
- Edit an existing course.
- Delete a course.
- View all added courses in a course list.

Each course will be represented as a JavaScript object.

Example:

```javascript
{
  id: 1,
  name: "Finance",
  grade: "A-",
  credits: 4
}
```

The application will store course objects in an array.

Whenever a course is added, edited, or deleted, the displayed GPA will automatically update.

### Feature 2: Semester GPA Calculator

The calculator will convert letter grades into grade points and calculate a credit-weighted GPA.

For the initial implementation, the application will use the following 4.0 grading scale:

| Letter Grade | Grade Points |
|---|---|
| A | 4.00 |
| A- | 3.67 |
| B+ | 3.33 |
| B | 3.00 |
| B- | 2.67 |
| C+ | 2.33 |
| C | 2.00 |
| C- | 1.67 |
| D+ | 1.33 |
| D | 1.00 |
| D- | 0.67 |
| F | 0.00 |

This is an initial project grading scale. The exact grade-point values and treatment of special grades should be checked against the relevant college policy before using the tool for official academic planning.

Formula:

Semester GPA = Sum of (Grade Points × Course Credits) / Total Semester Credits

The result will be displayed to two decimal places.

The calculator will use unrounded values internally and round only the displayed result.

### Feature 3: Cumulative GPA Calculator

Users can enter:

- Previous cumulative GPA
- Total previously completed GPA credit hours

The calculator will combine this information with the courses entered for the current semester.

Formula:

Updated Cumulative GPA =

(Previous GPA × Previous Credits + Current Semester Quality Points) / (Previous Credits + Current Semester Credits)

The result will be displayed to two decimal places.

If previous academic information is not entered, the application will display the current semester GPA separately without assuming it represents the student's full cumulative academic record.

### Feature 4: Target GPA Planner

Users can enter:

- Target cumulative GPA
- Planned future credit hours

The application will calculate the average GPA needed across those future credits to reach the target.

The calculation will use the user's current estimated cumulative GPA and total credits, including any current-semester courses entered.

Formula:

Required Future GPA =

(Target GPA × Total Credits After Future Semester − Current Total Quality Points) / Planned Future Credits

The application will display:

- The required future GPA.
- A message if the target is achievable.
- A message if the required GPA is greater than 4.00.
- A message if the target has already been secured mathematically even with a future GPA of 0.00.
- An instruction to enter the necessary information when the calculation cannot yet be performed.

If the calculated required GPA is negative, display 0.00 as the minimum GPA needed and explain that the target is already secured under the entered assumptions.

The tool will not guarantee that a particular target GPA can be achieved.

### Feature 5: Local Storage

The application will use localStorage to save:

- Course information
- Previous GPA and credit hours
- Target GPA
- Planned future credit hours

Saved information should remain available after refreshing or reopening the page in the same browser.

### Feature 6: Reset

Users can click a Reset button to:

- Remove all entered courses.
- Clear previous GPA information.
- Clear target GPA information.
- Remove the application's saved localStorage data.
- Return the application to its original empty state.

Reset must work without refreshing the page.

## 5. JavaScript State

The application will maintain its information using JavaScript state.

Example structure:

```javascript
const state = {
  courses: [],
  previousGPA: null,
  previousCredits: null,
  targetGPA: null,
  futureCredits: null
};
```

The application should include functions responsible for:

- Adding courses
- Editing courses
- Deleting courses
- Calculating semester GPA
- Calculating cumulative GPA
- Calculating required future GPA
- Saving and loading localStorage data
- Updating the displayed interface
- Resetting the application

All GPA results must be calculated from the current state rather than stored as independent values that may become outdated.

## 6. User Interactions

The application will support at least three different types of interaction:

1. Text and number inputs for course names, credits, and GPA information.
2. Dropdown menus for letter grades and course credit hours.
3. Buttons for adding, editing, deleting, and resetting courses.

Changing valid inputs or submitting actions will update the relevant calculations and displayed information without reloading the page.

## 7. Interface States

### Empty State

When the application is opened for the first time:

- Display the application title and a short introduction.
- Display an empty course form.
- Show a message such as "No courses added yet. Add your first course to get started."
- Show GPA placeholders instead of calculated values.
- Display the target GPA planner with empty fields.

### Invalid Input State

The application must handle invalid inputs.

Examples:

- Empty course name
- Missing grade selection
- Credit hours that are zero or negative
- Invalid or nonnumeric credit hours
- Previous GPA outside the 0.00–4.00 range
- Target GPA outside the 0.00–4.00 range
- Negative previous credits
- Zero or negative planned future credits

When an input is invalid:

- Display a clear error message near the relevant field.
- Do not add or save invalid course data.
- Preserve existing valid data.
- Allow users to correct the error.
- Do not use JavaScript alert() boxes.

### Active State

After valid courses have been added:

- Display the course list.
- Display the calculated semester GPA.
- Display the estimated cumulative GPA when sufficient previous academic information is available.
- Display the target GPA calculation when sufficient information is available.
- Automatically update results when relevant data changes.

### Reset State

After clicking Reset:

- Clear all course information and settings.
- Remove the saved application data from localStorage.
- Display the original empty-state message.
- Return the form and GPA displays to their initial states.

## 8. Layout Requirements

The application should include:

1. Header with application name and short description.
2. Add Course form.
3. Course List section.
4. Semester GPA and Cumulative GPA summary cards.
5. Target GPA Planner section.
6. Reset button.

The interface should be easy to navigate and responsive on desktop and mobile screens.

## 9. Technical Requirements

- Use HTML, CSS, and vanilla JavaScript only.
- Do not use React, Tailwind, or other frameworks.
- Do not use external JavaScript libraries.
- Do not use a server, database, or external API.
- Store user data in JavaScript state and localStorage.
- Update the interface dynamically without page reloads.
- Use semantic HTML and accessible form labels.
- Keep the code organized and beginner-friendly.
- Follow DESIGN.md for visual styling.
- Follow AGENTS.md for development rules.
- Deploy the application using GitHub Pages.

## 10. Checks

The following checks must pass before the project is considered complete.

### Course Management

- Adding a valid course displays it in the course list.
- Editing a course updates its information.
- Deleting a course removes it.
- Each change recalculates the relevant GPA results.

### GPA Calculations

- Courses with different credit hours are weighted correctly.
- Semester GPA calculations use the correct grade-point values.
- Cumulative GPA includes previous and current academic information.
- Results are displayed to two decimal places.
- Calculations use unrounded intermediate values.

### Target GPA Planner

- Entering a target GPA and future credits displays the required GPA.
- Changing the target updates the result.
- An impossible target displays an appropriate message.
- Missing information does not produce misleading results.

### Validation

- Empty course names are rejected.
- Invalid credit hours are rejected.
- GPA values outside 0.00–4.00 are rejected.
- Error messages appear without breaking the page.

### Storage and Reset

- Refreshing the page preserves saved information.
- Reset removes all saved information.
- The application returns to the empty state without reloading.

### Design and Accessibility

- The website works on desktop and mobile screens.
- Buttons and inputs are keyboard accessible.
- All form inputs have visible labels.
- The design follows DESIGN.md.
- The deployed GitHub Pages website works correctly.

## 11. Later

The following features are outside the scope of Mini Project 2:

- Importing transcripts automatically.
- Supporting multiple universities' grading systems.
- Maintaining separate historical semester records.
- Exporting GPA reports as PDF files.
- Creating student accounts or login systems.
- Connecting directly to university academic systems.
- Using a cloud database or external API.

## 12. Success Criteria

The project is successful when students can enter and manage courses, calculate their GPA accurately according to the defined grading scale, explore future GPA goals, save their information, and reset the application.

The final website must be deployed on GitHub Pages and ready for an in-class demonstration.