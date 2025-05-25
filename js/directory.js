/* eslint-env browser */

// Get DOM elements
const container = document.getElementById('memberContainer');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

// Helper function to convert level to name
function getMembershipName(level) {
  return level === 3 ? 'Gold' : level === 2 ? 'Silver' : 'Bronze';
}

// Display members on the page
function displayMembers(members) {
  if (!container) return;

  container.innerHTML = '';

  members.forEach((member) => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    // Add membership level class for styling
    switch (member.membershipLevel) {
      case 3:
        card.classList.add('gold');
        break;
      case 2:
        card.classList.add('silver');
        break;
      default:
        card.classList.add('bronze');
    }

    const membershipName = getMembershipName(member.membershipLevel);
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${member.name}, ${membershipName} Member`);

    // Create image element
    const img = document.createElement('img');
    img.src = member.image;
    img.alt = `Logo of ${member.name}`;
    img.loading = 'lazy';

    // Create info block and wrap text content
    const info = document.createElement('div');
    info.innerHTML = `
      <h3>${member.name}</h3>
      <p>${member.address || ''}</p>
      <p>${member.phone || ''}</p>
      ${
        member.website
          ? `<a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>`
          : '<p>No website available</p>'
      }
      <p class="membership">Membership Level: ${membershipName}</p>
    `;

    // Append both image and info to card
    card.appendChild(img);
    card.appendChild(info);
    container.appendChild(card);
  });
}

// Fetch member data from JSON
async function getMembers() {
  if (!container) return;

  try {
    const response = await fetch('../data/members.json');
    if (!response.ok) {
      throw new Error('Failed to fetch member data');
    }

    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    container.innerHTML = '<p>Error loading member data.</p>';
    console.error('Fetch error:', error);
  }
}

// View toggle buttons
if (gridBtn && listBtn && container) {
  gridBtn.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
  });

  listBtn.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
  });
}

// Run fetch on load
document.addEventListener('DOMContentLoaded', getMembers);
