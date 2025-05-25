/* eslint-env browser */
/* global document, fetch, console */

document.addEventListener("DOMContentLoaded", () => {
  const spotlightContainer = document.getElementById("spotlight");

  if (!spotlightContainer) {
    console.warn("Spotlight container not found.");
    return;
  }

  fetch("data/members.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch spotlight members.");
      }
      return response.json();
    })
    .then((data) => {
      const featuredMembers = data.filter(
        (member) => member.membershipLevel === 3 || member.membershipLevel === 2
      );

      const selected = featuredMembers
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      selected.forEach((member) => {
        const card = document.createElement("div");
        card.className = "spotlight-card";

        const image = document.createElement("img");
        image.src = member.image;
        image.alt = `Logo of ${member.name}`;
        image.loading = "lazy";

        const info = document.createElement("div");
        info.className = "spotlight-info";

        const name = document.createElement("h3");
        name.textContent = member.name;

        const address = document.createElement("p");
        address.textContent = member.address || "";

        const phone = document.createElement("p");
        phone.textContent = member.phone || "";

        const website = member.website
          ? document.createElement("a")
          : document.createElement("p");

        if (member.website) {
          website.href = member.website;
          website.target = "_blank";
          website.rel = "noopener";
          website.textContent = "Visit Website";
        } else {
          website.textContent = "No website available";
        }

        info.appendChild(name);
        info.appendChild(address);
        info.appendChild(phone);
        info.appendChild(website);

        card.appendChild(image);
        card.appendChild(info);

        spotlightContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Spotlight Error:", error);
      spotlightContainer.innerHTML = "<p>Error loading spotlight members.</p>";
    });
});
