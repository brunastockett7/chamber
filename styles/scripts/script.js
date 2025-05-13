// Footer year and last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Course data and functionality
const courses = [
  { id: 1, name: "WDD 130", subject: "General", credits: 3, completed: true },
  { id: 2, name: "WDD 131", subject: "General", credits: 3, completed: true },
  { id: 3, name: "CSE 121B", subject: "Major", credits: 4, completed: false },
  { id: 4, name: "CSE 110", subject: "Major", credits: 2, completed: false },
  { id: 5, name: "GSP 101", subject: "Elective", credits: 1, completed: true }
];

const courseContainer = document.getElementById("course-list");
const creditTotal = document.getElementById("credit-total");

function displayCourses(filteredCourses) {
  courseContainer.innerHTML = "";
  filteredCourses.forEach(course => {
    const div = document.createElement("div");
    div.className = "course" + (course.completed ? " completed" : "");
    div.innerHTML = `${course.name} (${course.credits} credits)`;
    courseContainer.appendChild(div);
  });

  const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  creditTotal.textContent = total;
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const subject = btn.getAttribute("data-subject");
    const filtered = subject === "All" ? courses : courses.filter(c => c.subject === subject);
    displayCourses(filtered);
  });
});

displayCourses(courses);
