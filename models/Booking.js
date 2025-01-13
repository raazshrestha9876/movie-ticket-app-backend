import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  show: { type: mongoose.Schema.Types.ObjectId, ref: "Show", required: true },
  seats: { type: Number, required: true },
  seatsNumbers: { type: [String], required: true },
  paymentStatus: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
  showTime: { type: String, required: true },
  transactionId: { type: String, default: null },
  totalAmount: { type: Number, required: true }, 
  bookingDate: {
    type: Date,
    default: () => {
      const today = new Date();
      return new Date(today.toISOString().split("T")[0]); 
    },
  },
  bookingTime: {
    type: String,
    default: () => {
      const now = new Date();
      return now.toTimeString().split(" ")[0];  
    },
  },
  status: {
    type: String,
    enum: ["booked", "canceled"],
    default: "booked",
  },
}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);
