export interface FoodListing {
  id: string;
  restaurantName: string;
  foodType: string;
  quantity: string;
  pickupTime: string;
  expiry: string;
  status: "available" | "claimed" | "picked_up";
  claimedBy?: string;
  lat: number;
  lng: number;
  address: string;
}

export interface MapLocation {
  id: string;
  name: string;
  type: "restaurant" | "ngo";
  lat: number;
  lng: number;
  address: string;
  description: string;
}

export const initialListings: FoodListing[] = [
  { id: "1", restaurantName: "Saravana Bhavan", foodType: "South Indian Meals", quantity: "50 plates", pickupTime: "2:00 PM - 4:00 PM", expiry: "Today 6:00 PM", status: "available", lat: 13.0827, lng: 80.2707, address: "T. Nagar, Chennai" },
  { id: "2", restaurantName: "Murugan Idli Shop", foodType: "Idli & Dosa", quantity: "30 plates", pickupTime: "11:00 AM - 1:00 PM", expiry: "Today 3:00 PM", status: "available", lat: 13.0604, lng: 80.2496, address: "Adyar, Chennai" },
  { id: "3", restaurantName: "Anjappar", foodType: "Biryani & Curries", quantity: "25 portions", pickupTime: "3:00 PM - 5:00 PM", expiry: "Today 7:00 PM", status: "claimed", claimedBy: "Feed Chennai Foundation", lat: 13.0674, lng: 80.2376, address: "Velachery, Chennai" },
  { id: "4", restaurantName: "Dindigul Thalappakatti", foodType: "Biryani", quantity: "40 portions", pickupTime: "1:00 PM - 3:00 PM", expiry: "Today 5:00 PM", status: "available", lat: 13.0878, lng: 80.2785, address: "Egmore, Chennai" },
  { id: "5", restaurantName: "A2B (Adyar Ananda Bhavan)", foodType: "Sweets & Snacks", quantity: "20 kg", pickupTime: "4:00 PM - 6:00 PM", expiry: "Today 8:00 PM", status: "picked_up", claimedBy: "Akshaya Patra Chennai", lat: 13.0500, lng: 80.2121, address: "Guindy, Chennai" },
];

export const mapLocations: MapLocation[] = [
  { id: "r1", name: "Saravana Bhavan", type: "restaurant", lat: 13.0827, lng: 80.2707, address: "T. Nagar, Chennai", description: "Famous South Indian restaurant chain" },
  { id: "r2", name: "Murugan Idli Shop", type: "restaurant", lat: 13.0604, lng: 80.2496, address: "Adyar, Chennai", description: "Popular for idli and dosa varieties" },
  { id: "r3", name: "Anjappar", type: "restaurant", lat: 13.0674, lng: 80.2376, address: "Velachery, Chennai", description: "Chettinad cuisine specialist" },
  { id: "r4", name: "Dindigul Thalappakatti", type: "restaurant", lat: 13.0878, lng: 80.2785, address: "Egmore, Chennai", description: "Famous biryani restaurant" },
  { id: "r5", name: "A2B", type: "restaurant", lat: 13.0500, lng: 80.2121, address: "Guindy, Chennai", description: "Sweets and vegetarian restaurant" },
  { id: "n1", name: "Feed Chennai Foundation", type: "ngo", lat: 13.0732, lng: 80.2609, address: "Mylapore, Chennai", description: "Distributes food to homeless and underprivileged" },
  { id: "n2", name: "Akshaya Patra Chennai", type: "ngo", lat: 13.0480, lng: 80.2170, address: "Guindy, Chennai", description: "Mid-day meal program for school children" },
  { id: "n3", name: "Robin Hood Army Chennai", type: "ngo", lat: 13.0900, lng: 80.2920, address: "Anna Nagar, Chennai", description: "Volunteer organization fighting hunger" },
];
