const container = document.getElementById("memberContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

// ✅ Load and display members
async function getMembers() {
  try {
    const response = await fetch("../data/members.json");
    if (!response.ok) {
      throw new Error("Failed to fetch member data");
    }

    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    container.innerHTML = "<p>Error loading member data.</p>";
    console.error(error);
  }
}

function displayMembers(members) {
  container.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    // ✅ Add membership level class
    if (member.membershipLevel === 3) {
      card.classList.add("gold");
    } else if (member.membershipLevel === 2) {
      card.classList.add("silver");
    } else {
      card.classList.add("basic");
    }

    card.innerHTML = `
      <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy" />
      <h3>${member.name}</h3>
      <p>${member.address || ""}</p>
      <p>${member.phone || ""}</p>
      ${member.website ? `<a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>` : `<p>No website available</p>`}
      <p>Membership Level: ${member.membershipLevel}</p>
    `;

    container.appendChild(card);
  });
}

// ✅ View toggle logic
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

// ✅ Initialize
getMembers();
