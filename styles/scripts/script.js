// === Course Data ===
const courses = [
  { code: "CSE110", name: "Intro to Programming", credits: 3, subject: "Major", taken: true },
  { code: "WDD130", name: "Web Fundamentals", credits: 3, subject: "Major", taken: false },
  { code: "ENG101", name: "English Composition", credits: 3, subject: "General", taken: true },
  { code: "HIS120", name: "US History", credits: 3, subject: "General", taken: false },
  { code: "ART105", name: "Intro to Art", credits: 2, subject: "Elective", taken: false }
];

// === Display Courses Function ===
function displayCourses(courseArray) {
  const list = document.getElementById("course-list");
  if (!list) return;
  list.innerHTML = "";

  courseArray.forEach(course => {
    const courseItem = document.createElement("div");
    courseItem.classList.add("course");
    if (course.taken) courseItem.classList.add("completed");

    courseItem.innerHTML = `
      <strong>${course.code}</strong> - ${course.name} (${course.credits} credits) ${course.taken ? "✔️" : ""}
    `;
    list.appendChild(courseItem);
  });

  const totalCredits = courseArray.reduce((sum, course) => sum + course.credits, 0);
  const creditDisplay = document.getElementById("credit-total");
  if (creditDisplay) creditDisplay.textContent = totalCredits;
}

// === Filter Button Logic ===
const buttons = document.querySelectorAll(".filter-btn");
if (buttons.length) {
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const subject = button.getAttribute("data-subject");
      const filtered = subject === "All" ? courses : courses.filter(c => c.subject === subject);
      displayCourses(filtered);
    });
  });
}

// === Footer Year and Last Modified ===
const yearSpan = document.getElementById("year");
const modSpan = document.getElementById("lastModified");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (modSpan) modSpan.textContent = document.lastModified;

// === Scroll-to-top Button Logic ===
window.addEventListener("scroll", () => {
  const btn = document.querySelector(".top-btn");
  if (btn) {
    btn.classList.toggle("show", window.scrollY > 200);
  }
});

// === Initial Display ===
displayCourses(courses);
