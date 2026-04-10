import React, { createContext, useContext, useState, ReactNode } from "react";
import { FoodListing, initialListings } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

interface FoodContextType {
  listings: FoodListing[];
  addListing: (listing: Omit<FoodListing, "id" | "status">) => void;
  claimListing: (id: string, ngoName: string) => void;
  markPickedUp: (id: string) => void;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [listings, setListings] = useState<FoodListing[]>(initialListings);

  const addListing = (listing: Omit<FoodListing, "id" | "status">) => {
    const newListing: FoodListing = { ...listing, id: Date.now().toString(), status: "available" };
    setListings(prev => [newListing, ...prev]);
    toast({ title: "Food Listed!", description: "Your surplus food has been listed for NGOs to claim." });
  };

  const claimListing = (id: string, ngoName: string) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, status: "claimed" as const, claimedBy: ngoName } : l));
    toast({ title: "Food Claimed!", description: "You have claimed this food. Please pick it up on time." });
  };

  const markPickedUp = (id: string) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, status: "picked_up" as const } : l));
    toast({ title: "Picked Up!", description: "Food has been successfully picked up." });
  };

  return <FoodContext.Provider value={{ listings, addListing, claimListing, markPickedUp }}>{children}</FoodContext.Provider>;
};

export const useFood = () => {
  const ctx = useContext(FoodContext);
  if (!ctx) throw new Error("useFood must be used within FoodProvider");
  return ctx;
};
