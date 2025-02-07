import mongoose from "mongoose";
import IMerch from "./merch.interface";

const MerchSchema = new mongoose.Schema<IMerch>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IMerch>("Merch", MerchSchema);
