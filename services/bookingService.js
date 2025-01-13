import { Booking } from "../models/Booking.js";
import { User } from "../models/User.js";
import { Show } from "../models/Show.js";
import { Ticket } from "../models/ticket.js";
import { sendEmail } from "../utils/email.js";
import { generateSeatsNumbers } from "../utils/generateSeats.js";

export const createBooking = async (data) => {
  try {
    // Step 1: Validate User
    const user = await User.findById(data.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Step 2: Validate Show
    const show = await Show.findById(data.showId).populate("movie");
    if (!show) {
      throw new Error("Show not found");
    }

    // Step 3: Check Available Seats
    const seatsNumbers = generateSeatsNumbers(data.seats, show);

    const totalAmount = show.ticketPrice * seatsNumbers.length;

    // Step 4: Create Booking
    const booking = await Booking.create({
      user: data.userId,
      show: data.showId,
      seats: data.seats,
      showTime: data.showTime,
      seatsNumbers, // Use the selected seat numbers directly
      totalAmount: totalAmount,
      paymentStatus: "paid",
      transactionId: null,
    });

    // Step 5: Update Available Seats in Show
    show.availableSeats = show.availableSeats.filter(
      (seat) => !seatsNumbers.includes(seat)
    );
    await show.save();

    // Step 6: Generate Ticket if Payment is Paid
    let ticket = null;
    if (booking.paymentStatus === "paid") {
      ticket = await Ticket.create({
        booking: booking._id,
      });
    }

    // Step 7: Send Booking Confirmation Email
    const subject = `Booking Confirmation: ${show.movie.title}`;
    const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #0056b3;">Hello ${user.name},</h2>
    <p>Thank you for booking with us! Your booking details are as follows:</p>
    <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr>
        <th style="text-align: left; border-bottom: 1px solid #ddd; padding: 8px;">Movie</th>
        <td style="padding: 8px;">${show.movie.title}</td>
      </tr>
      <tr>
        <th style="text-align: left; border-bottom: 1px solid #ddd; padding: 8px;">Show Time</th>
        <td style="padding: 8px;">${show.showDate} at ${data.showTime}</td>
      </tr>
      <tr>
        <th style="text-align: left; border-bottom: 1px solid #ddd; padding: 8px;">Seats</th>
        <td style="padding: 8px;">${seatsNumbers}</td>
      </tr>
      <tr>
        <th style="text-align: left; border-bottom: 1px solid #ddd; padding: 8px;">Total Amount</th>
        <td style="padding: 8px;">₹${data.totalAmount}</td>
      </tr>
    </table>
    <p>We hope you enjoy the movie!</p>
    <p style="margin-top: 20px; color: #666;">For any queries, feel free to contact our support team.</p>
    <p style="color: #0056b3;">- Movie Booking Team</p>
  </div>
`;

    await sendEmail(user.email, subject, null, html);

    return { booking, ticket };
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const getDailyBookingOverview = async () => {
  try {
    const analytics = await Booking.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$bookingDate" },
            month: { $month: "$bookingDate" },
            day: { $dayOfMonth: "$bookingDate" },
          },
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" },
          avgBookingAmount: { $avg: "$totalAmount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
      },
    ]);
    return analytics;
  } catch (error) {
    throw error;
  }
};

export const totalRevenueByMovie = async () => {
  try{
    const analytics = await Booking.aggregate([
      {
        $lookup: {
          from: "shows",
          localField: "show",
          foreignField: "_id",
          as: "showDetails",
        },
      },
      { $unwind: "$showDetails" },
      {
        $lookup: {
          from: "movies",
          localField: "showDetails.movie",
          foreignField: "_id",
          as: "movieDetails",
        },
      },
      { $unwind: "$movieDetails" },
      {
        $group: {
          _id: "$movieDetails.title",
          totalRevenue: { $sum: "$totalAmount" },
          totalBookings: { $sum: 1 },
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);
    return analytics;
  }catch(error){
    throw error;
  }
}

export const getUserBookings = async (userId) => {
  try {
    const bookings = await Booking.find({ user: userId }).populate("show");
    if (bookings.length === 0) {
      throw new Error("No bookings found");
    }
    return bookings;
  } catch (error) {
    throw error;
  }
};

export const getShowBookings = async (showId) => {
  try {
    const bookings = await Booking.find({ show: showId }).populate("user");
    if (bookings.length === 0) {
      throw new Error("No bookings found");
    }
    return bookings;
  } catch (error) {
    throw error;
  }
};

export const cancelBooking = async (bookingId, userId) => {
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }
    if (booking.user.toString() !== userId) {
      throw new Error("You are not authorized to cancel this booking");
    }
    if (booking.paymentStatus === "paid") {
      throw new Error("Cannot cancel a paid booking");
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const show = await Show.findById(booking.show);
    if (!show) {
      throw new Error("Show not found");
    }
    // Step 5: Return the canceled seats to the available seats in the show
    show.availableSeats.push(...booking.seatsNumbers); // Add seats back to available seats

    await show.save();
    await booking.deleteOne();

    const subject = `Booking Cancellation: ${show.movie.title}`;
    const html = `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
<h2 style="color: #ff0000;">Hello ${user.name},</h2>
<p>We regret to inform you that your booking has been successfully canceled. Below are the details of your canceled booking:</p>
<table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
  <tr>
    <th style="text-align: left; border-bottom: 1px solid #ddd; padding: 8px;">Movie</th>
    <td style="padding: 8px;">${show.movie.title}</td>
  </tr>
  <tr>
    <th style="text-align: left; border-bottom: 1px solid #ddd; padding: 8px;">Show Time</th>
    <td style="padding: 8px;">${show.showDate} at ${booking.showTime}</td>
  </tr>
  <tr>
    <th style="text-align: left; border-bottom: 1px solid #ddd; padding: 8px;">Seats</th>
    <td style="padding: 8px;">${booking.seatsNumbers}</td>
  </tr>
  <tr>
    <th style="text-align: left; border-bottom: 1px solid #ddd; padding: 8px;">Total Refunded Amount</th>
    <td style="padding: 8px;">₹${booking.totalAmount}</td>
  </tr>
</table>
<p>If this cancellation was made in error, or if you have any further questions, please don't hesitate to contact our support team.</p>
<p style="margin-top: 20px; color: #666;">We hope to serve you again soon.</p>
<p style="color: #0056b3;">- Movie Booking Team</p>
</div>
`;
    await sendEmail(user.email, subject, null, html);

    return { message: "Booking canceled successfully", booking };
  } catch (error) {
    throw new Error(`Failed to cancel booking: ${error.message}`);
  }
};
