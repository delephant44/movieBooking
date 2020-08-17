const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

//when you log typeof ticketPrice, it comes out as a string, we can add a + to make it a number

//save to selected movie index and the price for local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//update the count at the bottom of the page of selected seats
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  //clicking seats puts them into a node list (like array)

  const seatsIndex = [...selectedSeats].map(seat => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  //   console.log("seatsIndex", seatsIndex);

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//get data from local storage and populate UI
function populateUI() {
  //pull out selected seats from local storage
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  //have to parse it back into JSON since we stringified it earlier


  console.log(selectedSeats);

  if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
          if(selectedSeats.indexOf(index) > -1) {
              seat.classList.add("selected");
              //^^^ changing class to selected
          }
      })
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// movie select event
movieSelect.addEventListener("change", event => {
  ticketPrice = +event.target.value;
  setMovieData(event.target.selectedIndex, event.target.value);
  console.log(event.target.selectedIndex, event.target.value);
  updateSelectedCount();
});

//seat click event
//if we click a seat that is not occupied, we can make something happen as an event
container.addEventListener("click", event => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    // console.log(event.target);
    event.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

//initial count and total set
updateSelectedCount();