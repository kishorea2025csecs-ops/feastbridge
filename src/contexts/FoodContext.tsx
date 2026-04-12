import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { FoodListing, initialListings } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface PickupVerification {
  id: string;
  listing_id: string;
  ngo_user_id: string;
  ngo_name: string;
  truck_number_plate_url: string | null;
  driver_photo_url: string | null;
  needs_truck: boolean;
  status: string;
  restaurant_name: string;
  created_at: string;
}

interface FoodContextType {
  listings: FoodListing[];
  addListing: (listing: Omit<FoodListing, "id" | "status">) => void;
  claimListing: (id: string, ngoName: string) => void;
  markPickedUp: (id: string) => void;
  verifications: PickupVerification[];
  submitVerification: (v: Omit<PickupVerification, "id" | "created_at" | "status">) => Promise<void>;
  updateVerificationStatus: (id: string, status: "verified" | "rejected") => Promise<void>;
  refreshVerifications: () => Promise<void>;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [listings, setListings] = useState<FoodListing[]>(initialListings);
  const [verifications, setVerifications] = useState<PickupVerification[]>([]);

  const fetchVerifications = async () => {
    const { data } = await supabase.from("pickup_verifications").select("*").order("created_at", { ascending: false });
    if (data) setVerifications(data as PickupVerification[]);
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

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

  const submitVerification = async (v: Omit<PickupVerification, "id" | "created_at" | "status">) => {
    const { error } = await supabase.from("pickup_verifications").insert({
      listing_id: v.listing_id,
      ngo_user_id: v.ngo_user_id,
      ngo_name: v.ngo_name,
      truck_number_plate_url: v.truck_number_plate_url,
      driver_photo_url: v.driver_photo_url,
      needs_truck: v.needs_truck,
      restaurant_name: v.restaurant_name,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Verification Submitted!", description: "Photos sent to restaurant for verification." });
      await fetchVerifications();
    }
  };

  const updateVerificationStatus = async (id: string, status: "verified" | "rejected") => {
    const { error } = await supabase.from("pickup_verifications").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: status === "verified" ? "Verified!" : "Rejected", description: status === "verified" ? "Pickup has been verified." : "Pickup has been rejected." });
      await fetchVerifications();
    }
  };

  return (
    <FoodContext.Provider value={{ listings, addListing, claimListing, markPickedUp, verifications, submitVerification, updateVerificationStatus, refreshVerifications: fetchVerifications }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const ctx = useContext(FoodContext);
  if (!ctx) throw new Error("useFood must be used within FoodProvider");
  return ctx;
};
