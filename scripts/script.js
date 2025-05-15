// js/script.js

// Get references
const courseList = document.getElementById("course-list");
const creditDisplay = document.getElementById("total-credits");
const buttons = document.querySelectorAll("nav button");

// Render courses
function renderCourses(courseArray) {
  courseList.innerHTML = "";
  courseArray.forEach(course => {
    const div = document.createElement("div");
    div.className = "course";
    if (course.completed) div.classList.add("completed");

    div.innerHTML = `
      <h3>${course.name}</h3>
      <p>Subject: ${course.subject}</p>
      <p>Credits: ${course.credits}</p>
      ${course.completed ? "<p class='status'>✅ Completed</p>" : ""}
    `;

    courseList.appendChild(div);
  });

  const total = courseArray.reduce((sum, c) => sum + c.credits, 0);
  creditDisplay.textContent = total;
}

// Initial render
renderCourses(courses);

// Filter buttons
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const subject = btn.dataset.subject;
    const filtered = subject === "all" ? courses : courses.filter(c =>
c.subject === subject);
    renderCourses(filtered);
  });
});

// Footer year and last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;