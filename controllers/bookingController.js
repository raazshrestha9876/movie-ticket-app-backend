import * as bookingService from "../services/bookingService.js";

export const createBooking = async (req, res) => {
  const { seats, seatsNumbers, showTime, totalAmount, showId } = req.body;
  const userId = req.user.id;
  try {
    const { booking, ticket } = await bookingService.createBooking({
      userId,
      seats,
      seatsNumbers,
      showId,
      showTime,
      totalAmount,
    });
    res.status(201).json({ message: "Booking successfully", booking, ticket });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await bookingService.getUserBookings(userId);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getShowBookings = async (req, res) => {
  try {
    const showId = req.params.showId;
    const bookings = await bookingService.getShowBookings(showId);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const userId = req.user.id;
    await bookingService.cancelBooking(bookingId, userId);
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Error canceling the booking" });
  }
};
