export function generateSeatsNumbers(seats, show) {
    const allSeats = generateAllSeats();
    // Filter out the available seat numbers
    const availableSeatNumbers = allSeats.filter((seat) =>
      show.availableSeats.includes(seat)
    );
    if (availableSeatNumbers.length < seats) {
      throw new Error("Not enough available seats");
    }
    // Select the requested number of seats
    return availableSeatNumbers.slice(0, seats);
  }
  
  function generateAllSeats() {
    const seats = [];
    for (let row = 1; row <= 10; row++) {
      for (let seat = 1; seat <= 10; seat++) {
        seats.push(`${String.fromCharCode(64 + row)}${seat}`);
      }
    }
    return seats;
  }