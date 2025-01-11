import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    showDate: { type: Date, required: true },
    showTimes: { type: [String], required: true },
    availableSeats: { type: [String], required: true },
    ticketPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Show = mongoose.model("Show", showSchema);
