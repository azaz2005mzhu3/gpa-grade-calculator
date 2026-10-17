# MP2 Proposal — GPA & Grade Calculator

## What I Am Building

I want to build a GPA & Grade Calculator that helps college students calculate their semester GPA, estimate their cumulative GPA, and figure out what grades they need to reach their academic goals.

## Who It Is For

This tool is designed for college students like myself who want a simple way to understand their academic performance and plan for future semesters.

As a student, I sometimes find it difficult to calculate how different course grades will affect my overall GPA. I want to create a tool that makes these calculations easier and helps students make more informed academic decisions.

## What It Remembers

The calculator will remember:

- Course names
- Letter grades
- Credit hours for each course
- Previous cumulative GPA
- Previously completed credit hours
- Target cumulative GPA
- Planned future credit hours

Each course will be stored as a JavaScript object, and the course objects will be organized in an array.

## Where the Data Lives

The application will use JavaScript variables, arrays, and objects to manage its data.

The information will also be saved using localStorage so users can return to the calculator without losing their previously entered courses and settings.

All data will remain in the user's browser. The project will not require a database or server.

## What Each Action Changes

**Add a Course:** When a user adds a course, a new course object will be added to the course array. The course list, semester GPA, and estimated cumulative GPA will update automatically.

**Edit a Course:** When a user changes a course's grade or credit hours, the existing course object will be updated and the GPA calculations will change accordingly.

**Delete a Course:** When a user deletes a course, it will be removed from the array and the GPA will be recalculated.

**Update Previous GPA:** When a user enters their previous cumulative GPA and completed credits, the calculator will use that information to estimate their updated cumulative GPA.

**Change Target GPA:** When a user changes their target GPA or planned future credits, the calculator will calculate the future GPA needed to reach that goal.

**Reset:** When a user resets the calculator, all saved courses and settings will be cleared, and the application will return to its original empty state.

## Features

1. Add, edit, and delete courses with their letter grades and credit hours.
2. Automatically calculate semester GPA using a credit-weighted formula.
3. Estimate cumulative GPA using previous academic records.
4. Calculate the future GPA needed to reach a target cumulative GPA.
5. Save information using localStorage and allow users to reset the calculator.

## What I Do Not Know Yet

I need to learn how to use JavaScript arrays and objects to store course information, update calculations when users interact with the page, and automatically update the displayed results without refreshing.

I also want to understand how localStorage works and how to handle invalid inputs without breaking the calculator.