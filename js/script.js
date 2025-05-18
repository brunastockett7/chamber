
const year = document.getElementById("year");
const lastModified = document.getElementById("lastModified");

if (year && lastModified) {
  year.textContent = new Date().getFullYear();
  lastModified.textContent = document.lastModified;
}
