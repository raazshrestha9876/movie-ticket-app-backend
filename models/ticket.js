import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
  },
  { timestamps: true }
);

export const Ticket = mongoose.model("Ticket", TicketSchema);
