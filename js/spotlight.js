// spotlight.js
document.addEventListener("DOMContentLoaded", () => {
  const spotlightContainer = document.getElementById("spotlight");

  fetch("data/members.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch spotlight members.");
      }
      return response.json();
    })
    .then(data => {
      const featuredMembers = data.filter(member =>
        member.membershipLevel === 3 || member.membershipLevel === 2
      );

      const selected = featuredMembers
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      selected.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        card.innerHTML = `
          <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy">
          <div class="spotlight-info">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            ${
              member.website
                ? `<a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>`
                : "<p>No website available</p>"
            }
          </div>
        `;

        spotlightContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Spotlight Error:", error);
      spotlightContainer.innerHTML = "<p>Error loading spotlight members.</p>";
    });
});
