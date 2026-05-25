// Get URL parameters
const params = new URLSearchParams(window.location.search);

// Get animal ID
const id = params.get("id");

// Find animal
const animal = animals[id];

if (animal) {

  document.getElementById("animal-name").textContent =
    animal.name;

  document.getElementById("animal-scientific").textContent =
    animal.scientific;

  document.getElementById("animal-description").textContent =
    animal.description;

  document.getElementById("habitat").textContent =
    animal.habitat;

  document.getElementById("diet").textContent =
    animal.diet;

  document.getElementById("status").textContent =
    animal.status;

  document.getElementById("animal-image").src =
    animal.image;

} else {

  document.body.innerHTML = `
    <h1>Animal Not Found</h1>
  `;
}