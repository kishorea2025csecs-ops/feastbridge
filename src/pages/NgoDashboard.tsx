import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useFood } from "@/contexts/FoodContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Check, Truck, Camera, Upload, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const NgoDashboard = () => {
  const { user } = useAuth();
  const { listings, claimListing, markPickedUp, submitVerification, verifications } = useFood();
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [needsTruck, setNeedsTruck] = useState(false);
  const [truckPhoto, setTruckPhoto] = useState<File | null>(null);
  const [driverPhoto, setDriverPhoto] = useState<File | null>(null);
  const [truckPreview, setTruckPreview] = useState<string | null>(null);
  const [driverPreview, setDriverPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const truckInputRef = useRef<HTMLInputElement>(null);
  const driverInputRef = useRef<HTMLInputElement>(null);

  const available = listings.filter(l => l.status === "available");
  const myClaimed = listings.filter(l => l.claimedBy === user?.name);

  const statusColor = (s: string) => {
    if (s === "available") return "bg-primary/10 text-primary border-primary/20";
    if (s === "claimed") return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-muted text-muted-foreground border-border";
  };

  const handleFileSelect = (file: File, type: "truck" | "driver") => {
    const url = URL.createObjectURL(file);
    if (type === "truck") { setTruckPhoto(file); setTruckPreview(url); }
    else { setDriverPhoto(file); setDriverPreview(url); }
  };

  const uploadPhoto = async (file: File, folder: string): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("verification-photos").upload(path, file);
    if (error) { toast({ title: "Upload Error", description: error.message, variant: "destructive" }); return null; }
    const { data } = supabase.storage.from("verification-photos").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleClaimWithVerification = async (listing: typeof available[0]) => {
    if (!user) return;

    if (needsTruck && (!truckPhoto || !driverPhoto)) {
      toast({ title: "Photos Required", description: "Please upload both truck number plate and driver photos.", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      let truckUrl: string | null = null;
      let driverUrl: string | null = null;

      if (needsTruck && truckPhoto && driverPhoto) {
        [truckUrl, driverUrl] = await Promise.all([
          uploadPhoto(truckPhoto, "truck-plates"),
          uploadPhoto(driverPhoto, "driver-photos"),
        ]);
        if (!truckUrl || !driverUrl) { setUploading(false); return; }
      }

      claimListing(listing.id, user.name);

      await submitVerification({
        listing_id: listing.id,
        ngo_user_id: user.id,
        ngo_name: user.name,
        truck_number_plate_url: truckUrl,
        driver_photo_url: driverUrl,
        needs_truck: needsTruck,
        restaurant_name: listing.restaurantName,
      });

      // Reset
      setClaimingId(null);
      setNeedsTruck(false);
      setTruckPhoto(null);
      setDriverPhoto(null);
      setTruckPreview(null);
      setDriverPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const getVerificationStatus = (listingId: string) => {
    return verifications.find(v => v.listing_id === listingId && v.ngo_user_id === user?.id);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">NGO Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {user?.name}</p>
      </div>

      {/* Available Food */}
      <h2 className="text-lg font-semibold mb-4">Available Food Nearby</h2>
      {available.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground mb-8">No food available right now. Check back soon!</Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          {available.map(l => (
            <Card key={l.id} className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{l.restaurantName}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{l.address}</p>
                  </div>
                  <Badge variant="outline" className={statusColor(l.status)}>Available</Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground mt-3">
                  <p><strong>Food:</strong> {l.foodType}</p>
                  <p><strong>Quantity:</strong> {l.quantity}</p>
                  <p className="flex items-center gap-1"><Clock className="h-3 w-3" /> {l.pickupTime}</p>
                  <p>Expires: {l.expiry}</p>
                </div>

                {claimingId === l.id ? (
                  <div className="mt-4 space-y-4 p-4 rounded-xl bg-muted/50 border border-border">
                    {/* Truck Checkbox */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${needsTruck ? "bg-primary border-primary" : "border-muted-foreground/40 group-hover:border-primary/60"}`}>
                        {needsTruck && <Check className="h-3 w-3 text-primary-foreground" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={needsTruck} onChange={e => setNeedsTruck(e.target.checked)} />
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Need Pickup Truck</span>
                      </div>
                    </label>

                    {needsTruck && (
                      <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                        <p className="text-xs text-muted-foreground">Upload photos for restaurant verification</p>

                        {/* Truck Number Plate Photo */}
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                            <Camera className="h-3.5 w-3.5" /> Truck Number Plate
                          </p>
                          <input type="file" accept="image/*" className="hidden" ref={truckInputRef} onChange={e => e.target.files?.[0] && handleFileSelect(e.target.files[0], "truck")} />
                          {truckPreview ? (
                            <div className="relative group/img">
                              <img src={truckPreview} alt="Truck plate" className="w-full h-32 object-cover rounded-lg border border-border" />
                              <button onClick={() => { setTruckPhoto(null); setTruckPreview(null); }} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => truckInputRef.current?.click()} className="w-full h-24 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center gap-1 hover:border-primary/50 hover:bg-primary/5 transition-all">
                              <Upload className="h-5 w-5 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Upload Photo</span>
                            </button>
                          )}
                        </div>

                        {/* Driver Photo */}
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                            <Camera className="h-3.5 w-3.5" /> Driver Photo
                          </p>
                          <input type="file" accept="image/*" className="hidden" ref={driverInputRef} onChange={e => e.target.files?.[0] && handleFileSelect(e.target.files[0], "driver")} />
                          {driverPreview ? (
                            <div className="relative group/img">
                              <img src={driverPreview} alt="Driver" className="w-full h-32 object-cover rounded-lg border border-border" />
                              <button onClick={() => { setDriverPhoto(null); setDriverPreview(null); }} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => driverInputRef.current?.click()} className="w-full h-24 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center gap-1 hover:border-primary/50 hover:bg-primary/5 transition-all">
                              <Upload className="h-5 w-5 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Upload Photo</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={() => handleClaimWithVerification(l)} disabled={uploading}>
                        {uploading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Uploading...</> : "Confirm Claim"}
                      </Button>
                      <Button variant="outline" onClick={() => { setClaimingId(null); setNeedsTruck(false); setTruckPhoto(null); setDriverPhoto(null); setTruckPreview(null); setDriverPreview(null); }}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button className="mt-4 w-full" onClick={() => setClaimingId(l.id)}>
                    Claim for Pickup
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* My Claims */}
      <h2 className="text-lg font-semibold mb-4">Your Claims</h2>
      {myClaimed.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">You haven't claimed any food yet.</Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {myClaimed.map(l => {
            const verification = getVerificationStatus(l.id);
            return (
              <Card key={l.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{l.restaurantName}</h3>
                    <Badge variant="outline" className={statusColor(l.status)}>{l.status.replace("_", " ")}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{l.foodType} — {l.quantity}</p>

                  {verification && verification.needs_truck && (
                    <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Pickup Verification</span>
                        <Badge variant="outline" className={
                          verification.status === "verified" ? "bg-green-100 text-green-800 border-green-200" :
                          verification.status === "rejected" ? "bg-red-100 text-red-800 border-red-200" :
                          "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }>
                          {verification.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {verification.truck_number_plate_url && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Truck Plate</p>
                            <img src={verification.truck_number_plate_url} alt="Truck plate" className="w-full h-20 object-cover rounded-md border" />
                          </div>
                        )}
                        {verification.driver_photo_url && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Driver</p>
                            <img src={verification.driver_photo_url} alt="Driver" className="w-full h-20 object-cover rounded-md border" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {l.status === "claimed" && (
                    <Button size="sm" className="mt-3 gap-1" onClick={() => markPickedUp(l.id)}>
                      <Check className="h-3 w-3" /> Mark Picked Up
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NgoDashboard;
