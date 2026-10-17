// GPA & Grade Calculator
// Step 6: target GPA planner.

const STORAGE_KEY = "gpaCalculatorState";

const state = {
  courses: [],
  editingCourseId: null
};

let nextCourseId = 1;

const GRADE_POINTS = {
  "A": 4.00,
  "A-": 3.67,
  "B+": 3.33,
  "B": 3.00,
  "B-": 2.67,
  "C+": 2.33,
  "C": 2.00,
  "C-": 1.67,
  "D+": 1.33,
  "D": 1.00,
  "D-": 0.67,
  "F": 0.00
};

// Elements
const courseForm = document.getElementById("course-form");
const courseNameInput = document.getElementById("course-name");
const courseGradeSelect = document.getElementById("course-grade");
const courseCreditsSelect = document.getElementById("course-credits");
const courseFormSubmitButton = courseForm.querySelector("button[type='submit']");

const courseNameError = document.getElementById("course-name-error");
const courseGradeError = document.getElementById("course-grade-error");
const courseCreditsError = document.getElementById("course-credits-error");

const courseListEl = document.getElementById("course-list");
const courseListEmptyEl = document.getElementById("course-list-empty");
const semesterGpaEl = document.getElementById("semester-gpa");
const cumulativeGpaEl = document.getElementById("cumulative-gpa");

const previousGpaInput = document.getElementById("previous-gpa");
const previousCreditsInput = document.getElementById("previous-credits");
const previousGpaError = document.getElementById("previous-gpa-error");
const previousCreditsError = document.getElementById("previous-credits-error");

const targetGpaInput = document.getElementById("target-gpa");
const futureCreditsInput = document.getElementById("future-credits");
const targetGpaError = document.getElementById("target-gpa-error");
const futureCreditsError = document.getElementById("future-credits-error");
const targetResultEl = document.getElementById("target-result");

const resetButton = document.getElementById("reset-button");

// Clears all field-level error messages and error styling.
function clearCourseFormErrors() {
  courseNameError.textContent = "";
  courseGradeError.textContent = "";
  courseCreditsError.textContent = "";
  courseNameInput.closest(".form-field").classList.remove("has-error");
  courseGradeSelect.closest(".form-field").classList.remove("has-error");
  courseCreditsSelect.closest(".form-field").classList.remove("has-error");
}

function showFieldError(input, errorEl, message) {
  errorEl.textContent = message;
  input.closest(".form-field").classList.add("has-error");
}

// Validates the add/edit course form. Returns the cleaned values if valid, otherwise null.
function validateCourseForm() {
  clearCourseFormErrors();
  let isValid = true;

  const name = courseNameInput.value.trim();
  if (name === "") {
    showFieldError(courseNameInput, courseNameError, "Please enter a course name.");
    isValid = false;
  }

  const grade = courseGradeSelect.value;
  if (grade === "" || !(grade in GRADE_POINTS)) {
    showFieldError(courseGradeSelect, courseGradeError, "Please select a letter grade.");
    isValid = false;
  }

  const credits = Number(courseCreditsSelect.value);
  if (!Number.isFinite(credits) || credits <= 0) {
    showFieldError(courseCreditsSelect, courseCreditsError, "Please enter a valid number of credit hours.");
    isValid = false;
  }

  if (!isValid) {
    return null;
  }

  return { name, grade, credits };
}

function resetCourseForm() {
  courseForm.reset();
  clearCourseFormErrors();
  state.editingCourseId = null;
  courseFormSubmitButton.textContent = "Add Course";
}

function handleCourseFormSubmit(event) {
  event.preventDefault();

  const values = validateCourseForm();
  if (!values) {
    return;
  }

  if (state.editingCourseId === null) {
    state.courses.push({
      id: nextCourseId++,
      name: values.name,
      grade: values.grade,
      credits: values.credits
    });
  } else {
    const course = state.courses.find((c) => c.id === state.editingCourseId);
    if (course) {
      course.name = values.name;
      course.grade = values.grade;
      course.credits = values.credits;
    }
  }

  resetCourseForm();
  renderCourseList();
  updateResults();
  saveState();
}

function startEditCourse(id) {
  const course = state.courses.find((c) => c.id === id);
  if (!course) {
    return;
  }

  state.editingCourseId = id;
  courseNameInput.value = course.name;
  courseGradeSelect.value = course.grade;
  courseCreditsSelect.value = String(course.credits);
  clearCourseFormErrors();
  courseFormSubmitButton.textContent = "Save Changes";
  courseNameInput.focus();
}

function deleteCourse(id) {
  state.courses = state.courses.filter((c) => c.id !== id);

  if (state.editingCourseId === id) {
    resetCourseForm();
  }

  renderCourseList();
  updateResults();
  saveState();
}

function renderCourseList() {
  courseListEl.innerHTML = "";

  if (state.courses.length === 0) {
    courseListEmptyEl.style.display = "";
    return;
  }

  courseListEmptyEl.style.display = "none";

  state.courses.forEach((course) => {
    const item = document.createElement("li");
    item.className = "course-item";

    const info = document.createElement("div");
    info.className = "course-info";
    info.innerHTML = `
      <span class="course-name">${escapeHtml(course.name)}</span>
      <span class="course-grade">${escapeHtml(course.grade)}</span>
      <span class="course-credits">${course.credits} credits</span>
    `;

    const actions = document.createElement("div");
    actions.className = "course-actions";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "btn btn-secondary";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => startEditCourse(course.id));

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn btn-danger";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteCourse(course.id));

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    item.appendChild(info);
    item.appendChild(actions);
    courseListEl.appendChild(item);
  });
}

// Prevents course names from being interpreted as HTML when rendered.
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Returns { qualityPoints, credits } for the current list of courses.
function calculateSemesterTotals() {
  return state.courses.reduce(
    (totals, course) => {
      const points = GRADE_POINTS[course.grade];
      totals.qualityPoints += points * course.credits;
      totals.credits += course.credits;
      return totals;
    },
    { qualityPoints: 0, credits: 0 }
  );
}

function calculateSemesterGpa() {
  const { qualityPoints, credits } = calculateSemesterTotals();
  if (credits === 0) {
    return null;
  }
  return qualityPoints / credits;
}

function renderSemesterGpa() {
  const gpa = calculateSemesterGpa();
  semesterGpaEl.textContent = gpa === null ? "--" : gpa.toFixed(2);
}

// Reads and validates the previous GPA/credits fields. Both are optional,
// but if entered they must be within range. Returns null when invalid.
function readPreviousAcademicInfo() {
  previousGpaError.textContent = "";
  previousCreditsError.textContent = "";
  previousGpaInput.closest(".form-field").classList.remove("has-error");
  previousCreditsInput.closest(".form-field").classList.remove("has-error");

  const gpaText = previousGpaInput.value.trim();
  const creditsText = previousCreditsInput.value.trim();

  if (gpaText === "" && creditsText === "") {
    return { gpa: null, credits: null };
  }

  let isValid = true;
  let gpa = null;
  let credits = null;

  if (gpaText === "") {
    showFieldError(previousGpaInput, previousGpaError, "Please enter your previous GPA.");
    isValid = false;
  } else {
    gpa = Number(gpaText);
    if (!Number.isFinite(gpa) || gpa < 0 || gpa > 4) {
      showFieldError(previousGpaInput, previousGpaError, "Please enter a GPA between 0.00 and 4.00.");
      isValid = false;
    }
  }

  if (creditsText === "") {
    showFieldError(previousCreditsInput, previousCreditsError, "Please enter your previous credit hours.");
    isValid = false;
  } else {
    credits = Number(creditsText);
    if (!Number.isFinite(credits) || credits < 0) {
      showFieldError(previousCreditsInput, previousCreditsError, "Please enter a non-negative number of credits.");
      isValid = false;
    }
  }

  return isValid ? { gpa, credits } : null;
}

function calculateCumulativeGpa() {
  const previous = readPreviousAcademicInfo();
  if (!previous || previous.gpa === null || previous.credits === null) {
    return null;
  }

  const semester = calculateSemesterTotals();
  const totalCredits = previous.credits + semester.credits;
  if (totalCredits === 0) {
    return null;
  }

  const previousQualityPoints = previous.gpa * previous.credits;
  return (previousQualityPoints + semester.qualityPoints) / totalCredits;
}

function renderCumulativeGpa() {
  const gpa = calculateCumulativeGpa();
  cumulativeGpaEl.textContent = gpa === null ? "--" : gpa.toFixed(2);
}

// Combines current semester courses with previous academic info (if entered)
// into one quality points / credits total, used by the target GPA planner.
function getCurrentAcademicTotals() {
  const semester = calculateSemesterTotals();
  const previous = readPreviousAcademicInfo();

  if (!previous || previous.gpa === null || previous.credits === null) {
    return semester;
  }

  return {
    qualityPoints: semester.qualityPoints + previous.gpa * previous.credits,
    credits: semester.credits + previous.credits
  };
}

// Reads and validates the target GPA planner fields. Both are optional,
// but if entered they must be within range. Returns null when invalid.
function readTargetPlannerInputs() {
  targetGpaError.textContent = "";
  futureCreditsError.textContent = "";
  targetGpaInput.closest(".form-field").classList.remove("has-error");
  futureCreditsInput.closest(".form-field").classList.remove("has-error");

  const targetText = targetGpaInput.value.trim();
  const futureText = futureCreditsInput.value.trim();

  if (targetText === "" && futureText === "") {
    return { targetGpa: null, futureCredits: null };
  }

  let isValid = true;
  let targetGpa = null;
  let futureCredits = null;

  if (targetText === "") {
    showFieldError(targetGpaInput, targetGpaError, "Please enter a target GPA.");
    isValid = false;
  } else {
    targetGpa = Number(targetText);
    if (!Number.isFinite(targetGpa) || targetGpa < 0 || targetGpa > 4) {
      showFieldError(targetGpaInput, targetGpaError, "Please enter a target GPA between 0.00 and 4.00.");
      isValid = false;
    }
  }

  if (futureText === "") {
    showFieldError(futureCreditsInput, futureCreditsError, "Please enter your planned future credits.");
    isValid = false;
  } else {
    futureCredits = Number(futureText);
    if (!Number.isFinite(futureCredits) || futureCredits <= 0) {
      showFieldError(futureCreditsInput, futureCreditsError, "Please enter a positive number of planned future credits.");
      isValid = false;
    }
  }

  return isValid ? { targetGpa, futureCredits } : null;
}

// Calculates the planner result. Returns a status plus the required GPA when relevant.
function calculateTargetPlanner() {
  const inputs = readTargetPlannerInputs();
  if (!inputs) {
    return { status: "invalid" };
  }
  if (inputs.targetGpa === null || inputs.futureCredits === null) {
    return { status: "empty" };
  }

  const current = getCurrentAcademicTotals();
  const totalCreditsAfter = current.credits + inputs.futureCredits;
  const requiredGpa =
    (inputs.targetGpa * totalCreditsAfter - current.qualityPoints) / inputs.futureCredits;

  if (requiredGpa > 4) {
    return { status: "impossible", requiredGpa };
  }
  if (requiredGpa <= 0) {
    return { status: "secured" };
  }
  return { status: "ok", requiredGpa };
}

function renderTargetResult() {
  const result = calculateTargetPlanner();

  // Resets status styling before applying the class for the current result.
  targetResultEl.classList.remove("is-success", "is-error");

  switch (result.status) {
    case "invalid":
      targetResultEl.textContent = "";
      break;
    case "empty":
      targetResultEl.textContent =
        "Enter your target GPA and planned future credits to see the GPA you'll need.";
      break;
    case "impossible":
      targetResultEl.textContent =
        `This target isn't mathematically achievable. You would need a ${result.requiredGpa.toFixed(2)} GPA, which is above the 4.00 maximum.`;
      targetResultEl.classList.add("is-error");
      break;
    case "secured":
      targetResultEl.textContent =
        "You have already secured this target GPA, even with a 0.00 GPA in your future courses.";
      targetResultEl.classList.add("is-success");
      break;
    case "ok":
      targetResultEl.textContent =
        `You will need an average GPA of ${result.requiredGpa.toFixed(2)} in your planned future credits to reach your target.`;
      targetResultEl.classList.add("is-success");
      break;
  }
}

function updateResults() {
  renderSemesterGpa();
  renderCumulativeGpa();
  renderTargetResult();
}

// Saves courses and all form field values so the user can return later.
function saveState() {
  const data = {
    courses: state.courses,
    nextCourseId,
    previousGpa: previousGpaInput.value,
    previousCredits: previousCreditsInput.value,
    targetGpa: targetGpaInput.value,
    futureCredits: futureCreditsInput.value
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Loads any previously saved data back into state and the form fields.
function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return;
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    return;
  }

  if (Array.isArray(data.courses)) {
    state.courses = data.courses;
  }
  if (typeof data.nextCourseId === "number") {
    nextCourseId = data.nextCourseId;
  }
  if (typeof data.previousGpa === "string") {
    previousGpaInput.value = data.previousGpa;
  }
  if (typeof data.previousCredits === "string") {
    previousCreditsInput.value = data.previousCredits;
  }
  if (typeof data.targetGpa === "string") {
    targetGpaInput.value = data.targetGpa;
  }
  if (typeof data.futureCredits === "string") {
    futureCreditsInput.value = data.futureCredits;
  }
}

// Clears all courses, settings, and saved data, returning to the empty state.
function resetAll() {
  state.courses = [];
  nextCourseId = 1;
  resetCourseForm();
  previousGpaInput.value = "";
  previousCreditsInput.value = "";
  targetGpaInput.value = "";
  futureCreditsInput.value = "";
  previousGpaError.textContent = "";
  previousCreditsError.textContent = "";

  localStorage.removeItem(STORAGE_KEY);
  renderCourseList();
  updateResults();
}

courseForm.addEventListener("submit", handleCourseFormSubmit);
previousGpaInput.addEventListener("input", () => {
  updateResults();
  saveState();
});
previousCreditsInput.addEventListener("input", () => {
  updateResults();
  saveState();
});
targetGpaInput.addEventListener("input", () => {
  updateResults();
  saveState();
});
futureCreditsInput.addEventListener("input", () => {
  updateResults();
  saveState();
});
resetButton.addEventListener("click", resetAll);

loadState();
renderCourseList();
updateResults();
