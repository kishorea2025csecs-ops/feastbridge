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
  { id: "n1", name: "Marpu Foundation", type: "ngo", lat: 13.02944, lng: 80.17107, address: "Chennai", description: "Community development and welfare" },
  { id: "n2", name: "Paavai Foundation", type: "ngo", lat: 12.92742, lng: 80.23072, address: "Chennai", description: "Education and social welfare" },
  { id: "n3", name: "Hope Public Charitable Trust", type: "ngo", lat: 13.06707, lng: 80.22289, address: "Chennai", description: "Public charitable initiatives" },
  { id: "n4", name: "Thaaikarangal", type: "ngo", lat: 13.06050, lng: 80.23129, address: "Chennai", description: "Child welfare and care" },
  { id: "n5", name: "Karunai Ullangal Trust", type: "ngo", lat: 13.06946, lng: 80.26687, address: "Chennai", description: "Compassionate community service" },
  { id: "n6", name: "AID India", type: "ngo", lat: 13.05902, lng: 80.26732, address: "Chennai", description: "Association for India's Development" },
  { id: "n7", name: "Mother Teresa Charitable Trust", type: "ngo", lat: 13.06618, lng: 80.22984, address: "Chennai", description: "Charitable services for the needy" },
  { id: "n8", name: "Missionaries of Charity", type: "ngo", lat: 13.11036, lng: 80.29447, address: "Chennai", description: "Service to the poorest of the poor" },
  { id: "n9", name: "Blue NGO", type: "ngo", lat: 13.06866, lng: 80.20978, address: "Chennai", description: "Community welfare organization" },
  { id: "n10", name: "Lawrence Charitable Trust", type: "ngo", lat: 13.04217, lng: 80.21340, address: "Chennai", description: "Charitable trust for underprivileged" },
  { id: "n11", name: "Chennai Volunteers", type: "ngo", lat: 13.04240, lng: 80.25060, address: "Chennai", description: "Volunteer-driven community service" },
  { id: "n12", name: "Aarvam NGO", type: "ngo", lat: 13.11760, lng: 80.26310, address: "Chennai", description: "Social empowerment initiatives" },
  { id: "n13", name: "Oasis India", type: "ngo", lat: 13.09450, lng: 80.25720, address: "Chennai", description: "Fighting human trafficking and exploitation" },
  { id: "n14", name: "Sahodaran", type: "ngo", lat: 13.06720, lng: 80.22490, address: "Chennai", description: "Community health and rights" },
  { id: "n15", name: "Help A Child of India", type: "ngo", lat: 13.08780, lng: 80.21660, address: "Chennai", description: "Child education and welfare" },
  { id: "n16", name: "Aathma Foundation", type: "ngo", lat: 13.08500, lng: 80.20950, address: "Chennai", description: "Mental health and rehabilitation" },
  { id: "n17", name: "Rainbow Foundation India", type: "ngo", lat: 13.08700, lng: 80.25900, address: "Chennai", description: "Street children welfare" },
  { id: "n18", name: "Shasha Foundation", type: "ngo", lat: 13.08900, lng: 80.19000, address: "Chennai", description: "Women and child empowerment" },
  { id: "n19", name: "Candles NGO", type: "ngo", lat: 13.09800, lng: 80.20100, address: "Chennai", description: "Lighting lives through service" },
  { id: "n20", name: "Integrated Development Initiatives Foundation", type: "ngo", lat: 13.08270, lng: 80.18500, address: "Chennai", description: "Holistic community development" },
];
