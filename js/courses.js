/* eslint-env browser */

// Course data
const courses = [
  { name: "WDD 130", subject: "Major", credits: 3, completed: true },
  { name: "WDD 131", subject: "Major", credits: 3, completed: false },
  { name: "MATH 100", subject: "General", credits: 2, completed: true },
  { name: "ENGL 150", subject: "General", credits: 3, completed: false },
  { name: "ART 110", subject: "Elective", credits: 2, completed: false },
  { name: "MUSIC 101", subject: "Elective", credits: 1, completed: true }
];

const courseList = document.getElementById("course-list");
const creditTotal = document.getElementById("credit-total");
const filterButtons = document.querySelectorAll(".filter-btn");

// Render courses
function renderCourses(filteredCourses) {
  if (!courseList || !creditTotal) return;

  courseList.innerHTML = "";

  filteredCourses.forEach(course => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");
    if (course.completed) courseCard.classList.add("completed");

    courseCard.setAttribute("tabindex", "0");
    courseCard.setAttribute(
      "aria-label",
      `${course.name}, ${course.subject}, ${course.credits} credits${course.completed ? ', completed' : ''}`
    );

    courseCard.innerHTML = `
      <h3>${course.name}</h3>
      <p><strong>Subject:</strong> ${course.subject}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
      ${course.completed ? `<p class="status" aria-label="Course completed">✅ Completed</p>` : ""}
    `;

    courseList.appendChild(courseCard);
  });

  const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  creditTotal.textContent = total;
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  renderCourses(courses);

  // Filter logic
  filterButtons.forEach(button => {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");

      const subject = button.getAttribute("data-subject");
      const filtered = courses.filter(course => course.subject === subject);
      renderCourses(filtered);
    });
  });
});
