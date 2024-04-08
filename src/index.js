// Your code here

// Function to fetch movie data
async function fetchMovies() {
  try {
    const response = await fetch("db.json");
    if (!response.ok) {
      throw new Error("Failed to fetch movies.");
    }
    const data = await response.json();
    return data.films;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const filmsData = await fetchMovies();
  const filmsList = document.getElementById("films");
  const posterImage = document.getElementById("poster");
  const titleElement = document.getElementById("title");
  const runtimeElement = document.getElementById("runtime");
  const filmInfoElement = document.getElementById("film-info");
  const showtimeElement = document.getElementById("showtime");
  const ticketNumElement = document.getElementById("ticket-num");
  const buyTicketBtn = document.getElementById("buy-ticket");

  let selectedFilm = null;

  // Function to render movie list
  function renderMovieList() {
    filmsList.innerHTML = "";
    filmsData.forEach((film) => {
      const li = document.createElement("li");
      li.classList.add("film", "item");
      li.textContent = film.title;
      li.addEventListener("click", () => {
        selectedFilm = film;
        renderFilmDetails();
      });
      filmsList.appendChild(li);
    });
  }

  // Function to render selected film details
  function renderFilmDetails() {
    if (!selectedFilm) return;
    posterImage.src = selectedFilm.poster;
    titleElement.textContent = selectedFilm.title;
    runtimeElement.textContent = `${selectedFilm.runtime} minutes`;
    filmInfoElement.textContent = selectedFilm.description;
    showtimeElement.textContent = selectedFilm.showtime;
    const availableTickets = selectedFilm.capacity - selectedFilm.tickets_sold;
    ticketNumElement.textContent = `${availableTickets} remaining tickets`;
  }

  // Function to handle ticket purchase
  function buyTicket() {
    if (!selectedFilm) return;
    const availableTickets = selectedFilm.capacity - selectedFilm.tickets_sold;
    if (availableTickets > 0) {
      selectedFilm.tickets_sold++;
      renderFilmDetails();
      alert("Ticket purchased successfully!");
    } else {
      alert("Sorry, all tickets are sold out for this movie.");
    }
  }

  // Event listener for buy ticket button
  buyTicketBtn.addEventListener("click", buyTicket);

  // Initialize the movie list
  renderMovieList();
});


