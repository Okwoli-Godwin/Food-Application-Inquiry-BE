import mongoose from "mongoose";
import { IRestaurants } from "../interface/interface";

// creating restaurants Model
//  👇👇
interface Restaurants extends IRestaurants, mongoose.Document {}

const RestaurantsModel = new mongoose.Schema<IRestaurants>(
  {
    nameOfRestaurants: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required : true
    },
    latitude: {
      type: String,
     
    },
    longitude: {
      type: String,
      
    },
    availableMeals: {
   type : []

    },
  },
  { timestamps: true }
);

export default mongoose.model<Restaurants>("FIWA(Restaurants)", RestaurantsModel);
