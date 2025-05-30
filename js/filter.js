/* eslint-env browser */

/* global document, fetch, console */
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('jobSearch');
  const filterSelect = document.getElementById('jobFilter');
  const jobCards = document.querySelectorAll('.opportunity-card');

  function filterJobs() {
    const searchText = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;

    jobCards.forEach(card => {
      const text = card.innerText.toLowerCase();
      const type = card.getAttribute('data-type');

      const matchesSearch = text.includes(searchText);
      const matchesFilter = (filterValue === 'all' || type === filterValue);

      card.style.display = (matchesSearch && matchesFilter) ? 'block' : 'none';
    });
  }

  searchInput.addEventListener('input', filterJobs);
  filterSelect.addEventListener('change', filterJobs);
});
