import mongoose from "mongoose";

interface IMerch extends mongoose.Document {
  name: string;
  description: string;
  price: string;
  quantity: string;
  image: string;
}

export default IMerch;
