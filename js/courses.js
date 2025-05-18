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

function renderCourses(filteredCourses) {
  courseList.innerHTML = "";
  filteredCourses.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course");
    if (course.completed) div.classList.add("completed");

    div.innerHTML = `
      <h3>${course.name}</h3>
      <p>Subject: ${course.subject}</p>
      <p>Credits: ${course.credits}</p>
      ${course.completed ? "<p class='status'>✅ Completed</p>" : ""}
    `;

    courseList.appendChild(div);
  });

  const total = filteredCourses.reduce((sum, c) => sum + c.credits, 0);
  creditTotal.textContent = total;
}

// Initial render
renderCourses(courses);

// Filter logic
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const subject = button.getAttribute("data-subject");
    const filtered = subject === "All" ? courses : courses.filter(course => course.subject === subject);
    renderCourses(filtered);
  });
});
