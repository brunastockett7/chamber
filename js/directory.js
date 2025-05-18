const container = document.getElementById("memberContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

// ✅ Load members from correct path
async function getMembers() {
  try {
    const response = await fetch("../data/members.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    container.innerHTML = "<p>Unable to load members at this time.</p>";
    console.error("Failed to fetch members:", error);
  }
}

function displayMembers(members) {
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="../images/${member.image}" alt="${member.name}" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p>Membership Level: ${member.membershipLevel}</p>
    `;

    container.appendChild(card);
  });
}

// ✅ View toggle buttons
if (gridBtn && listBtn) {
  gridBtn.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
  });

  listBtn.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
  });
}

// ✅ Load members on page load
getMembers();
