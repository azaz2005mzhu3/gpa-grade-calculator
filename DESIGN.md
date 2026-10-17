# Design Direction — GPA & Grade Calculator

## 1. Design Goal

Create a clean, modern, and easy-to-use academic planning tool that helps college students understand their grades and plan for future semesters.

The website should make GPA calculations feel simple and approachable rather than complicated or overwhelming.

## 2. Target Audience

The primary audience is college students who want to track their academic performance and explore possible grade scenarios.

The design should feel professional, organized, and student-friendly.

## 3. Visual Style

The overall style will be minimalist, modern, and professional.

The interface will use a light blue and white color palette, rounded cards, subtle borders, and generous spacing.

The design should resemble a simple academic dashboard.

Design keywords:

- Clean
- Minimalist
- Professional
- Calm
- Organized
- Easy to navigate

## 4. Color Palette

| Element | Color |
|---|---|
| Page Background | #F5F9FF |
| Card Background | #FFFFFF |
| Light Blue Accent | #DCEBFA |
| Primary Blue | #377DB8 |
| Main Text | #1F344A |
| Secondary Text | #64748B |
| Border | #D9E3EE |
| Error Text | #B42318 |
| Success Text | #167347 |

Primary blue will be used for important actions, selected controls, and GPA highlights.

White cards will separate different sections of the calculator.

Error colors will only be used for invalid inputs or important warnings.

## 5. Typography

Use a clean system sans-serif font, such as Arial or the system font stack.

Typography guidelines:

- Main heading: 30–32px, bold.
- Section headings: 20–24px, semibold.
- Body text: 15–16px.
- Input labels: 14–16px.
- GPA result numbers: 32–40px, bold.
- Helper text: 13–14px.

Text should have sufficient contrast against the background.

Avoid unnecessary decorative fonts.

## 6. Page Layout

The website will use a centered layout with a maximum content width of approximately 1100px.

### Header

The header will contain:

- Application title: GPA & Grade Calculator
- Short description: "Track your grades. Plan your goals."
- A simple academic-themed icon, if useful.

### Course Entry Section

Display a card containing:

- Course Name input
- Letter Grade dropdown
- Credit Hours dropdown
- Add Course button

The form should be clearly labeled and easy to complete.

Credit hours will default to 4, but users can choose another supported value.

### Course List Section

Display all added courses in an organized list.

Each course will show:

- Course name
- Letter grade
- Credit hours
- Edit button
- Delete button

Courses should be visually separated using subtle borders or spacing.

### GPA Summary Section

Display two summary cards:

**Semester GPA**

Shows the calculated GPA for the entered courses.

**Cumulative GPA**

Shows the estimated cumulative GPA using previous academic information and current courses.

The GPA numbers should be the most visually prominent elements in these cards.

### Target GPA Planner

Display a separate card containing:

- Target GPA input
- Planned Future Credits input
- Required Future GPA result
- A short explanation of the result

The section should clearly distinguish achievable targets from targets requiring a GPA above 4.00.

### Reset Section

Provide a Reset All button near the bottom of the page.

The reset button should be visually secondary to the Add Course button.

## 7. Buttons and Interactive Elements

### Primary Buttons

- Blue background
- White text
- Rounded corners
- Clear hover and focus states

### Secondary Buttons

- White or light blue background
- Blue text
- Subtle border

### Delete and Reset Buttons

- Clearly labeled
- Visually distinct from primary actions
- Use restrained warning styling where appropriate

### Inputs and Dropdowns

- Consistent height and spacing
- Rounded borders
- Visible labels
- Clear focus indicators
- Helpful placeholder text when appropriate

Interactive elements should be large enough to use comfortably on mobile devices.

## 8. Application States

### Empty State

When no courses have been added:

- Display the course entry form.
- Show a friendly empty-state message.
- Use placeholders such as "--" for unavailable GPA results.
- Keep the interface visually balanced without showing misleading zero GPA values.

Example message:

"No courses added yet. Add your first course to get started."

### Invalid Input State

When the user enters invalid information:

- Highlight the relevant input with a visible error border.
- Display a short error message directly below the input.
- Keep the rest of the page usable.
- Preserve previously entered valid information.

Example message:

"Please enter a valid number of credit hours."

Do not display errors using alert() pop-ups.

### Active State

When courses have been added:

- Display all saved courses.
- Show the semester GPA prominently.
- Show the cumulative GPA when enough information is available.
- Display the target GPA result when the necessary inputs are present.
- Update the results immediately after valid changes.

### Reset State

After the user clicks Reset All:

- Remove the displayed courses.
- Clear all form values and saved settings.
- Return GPA results to their initial placeholders.
- Display the original empty-state message.

The reset state should visually match the first-visit empty state.

## 9. Responsive Design

### Desktop

- Use a centered content container.
- Display GPA summary cards side by side.
- Use a multi-column layout for course form fields where space allows.
- Keep the course list easy to scan.

### Tablet

- Reduce horizontal spacing.
- Allow form fields and cards to wrap naturally.
- Maintain readable text sizes.

### Mobile

- Stack major sections vertically.
- Display summary cards in a single column.
- Stack course information and action buttons when necessary.
- Make buttons and inputs easy to tap.
- Avoid horizontal scrolling.
- Maintain comfortable spacing around interactive elements.

## 10. Accessibility

The application should:

- Use semantic HTML elements.
- Provide visible labels for every input.
- Support keyboard navigation.
- Display clear focus indicators.
- Use readable font sizes.
- Maintain sufficient color contrast.
- Avoid communicating errors through color alone.
- Display validation messages as readable text.

## 11. Design Consistency

The website should use consistent:

- Button shapes
- Card borders
- Input styling
- Typography
- Spacing
- Color usage
- Section headings

All styling should be maintained in `css/styles.css`.

New visual styles should follow the existing design system rather than introducing unrelated colors or patterns.

## 12. Design Direction Summary

The GPA & Grade Calculator should feel like a modern academic dashboard that is simple enough for students to use regularly.

The most important information, especially GPA results, should be easy to find and understand.

The design should prioritize clarity, usability, and consistency over unnecessary visual effects.