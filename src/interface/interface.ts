export interface Iuser {
  email?: string;
  password?: string;
   fullname?: string
} // setting the Object Type for User

export interface IAdmin {
  email?: string;
  password?: string;
  fullname?: string
}
export interface IRestaurants {
  nameOfRestaurants: string;

 availableMeals : []
 location : string;
 latitude : string;
 longitude : string;


} // setting the Object Type for restaurants
