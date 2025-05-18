const container = document.getElementById("memberContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Failed to fetch members:", error);
    container.innerHTML = "<p>Unable to load members at this time.</p>";
  }
}

function displayMembers(members) {
  container.innerHTML = "";

  if (!members.length) {
    container.innerHTML = "<p>No members found.</p>";
    return;
  }

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    let level = "";
    switch (member.membershipLevel) {
      case 3: level = "Gold"; break;
      case 2: level = "Silver"; break;
      case 1: level = "Basic"; break;
    }

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p>Membership Level: <strong>${level}</strong></p>
    `;

    card.classList.add(
      member.membershipLevel === 3 ? "gold" :
      member.membershipLevel === 2 ? "silver" : "basic"
    );

    container.appendChild(card);
  });
}

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

getMembers();
