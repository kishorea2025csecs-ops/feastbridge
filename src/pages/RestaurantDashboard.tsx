import { useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useFood } from "@/contexts/FoodContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Plus, Package, Clock, Truck, CheckCircle, XCircle, Eye, X, Upload, Camera } from "lucide-react";

const RestaurantDashboard = () => {
  const { user } = useAuth();
  const { listings, addListing, verifications, updateVerificationStatus } = useFood();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ foodType: "", quantity: "", pickupTime: "", expiry: "" });
  const [foodImage, setFoodImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const foodImageInputRef = useRef<HTMLInputElement>(null);

  const myListings = listings.filter(l => l.restaurantName === user?.name);
  const myVerifications = verifications.filter(v => v.restaurant_name === user?.name);

  const handleFoodImageSelect = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image too large", description: "Please upload an image under 5MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setFoodImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.foodType || !form.quantity || !form.pickupTime || !form.expiry) return;
    if (!foodImage) {
      toast({ title: "Food photo required", description: "Please upload a photo of the food.", variant: "destructive" });
      return;
    }
    addListing({
      restaurantName: user?.name || "",
      foodType: form.foodType,
      quantity: form.quantity,
      pickupTime: form.pickupTime,
      expiry: form.expiry,
      lat: 13.0827,
      lng: 80.2707,
      address: "Chennai",
      imageUrl: foodImage,
    });
    setForm({ foodType: "", quantity: "", pickupTime: "", expiry: "" });
    setFoodImage(null);
    setShowForm(false);
  };

  const statusColor = (s: string) => {
    if (s === "available") return "bg-primary/10 text-primary border-primary/20";
    if (s === "claimed") return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-muted text-muted-foreground border-border";
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Restaurant Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {user?.name}</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" /> List Surplus Food
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader><CardTitle className="text-lg">Add Surplus Food</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Food Type</Label>
                <Input placeholder="e.g. Biryani, Meals" value={form.foodType} onChange={e => setForm(f => ({ ...f, foodType: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input placeholder="e.g. 30 plates" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Pickup Time</Label>
                <Input placeholder="e.g. 2:00 PM - 4:00 PM" value={form.pickupTime} onChange={e => setForm(f => ({ ...f, pickupTime: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Expiry</Label>
                <Input placeholder="e.g. Today 6:00 PM" value={form.expiry} onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))} />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5" /> Food Photo</Label>
                <input type="file" accept="image/*" className="hidden" ref={foodImageInputRef} onChange={e => e.target.files?.[0] && handleFoodImageSelect(e.target.files[0])} />
                {foodImage ? (
                  <div className="relative group/img w-full max-w-sm">
                    <img src={foodImage} alt="Food preview" className="w-full h-40 object-cover rounded-lg border border-border" />
                    <button type="button" onClick={() => setFoodImage(null)} className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover/img:opacity-100 transition-opacity">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => foodImageInputRef.current?.click()} className="w-full max-w-sm h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center gap-1.5 hover:border-primary/50 hover:bg-primary/5 transition-all">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Upload Food Photo</span>
                  </button>
                )}
              </div>
              <div className="sm:col-span-2 flex gap-2">
                <Button type="submit">Add Listing</Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setFoodImage(null); }}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Pickup Verification Requests */}
      {myVerifications.filter(v => v.needs_truck).length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            Pickup Verification Requests
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {myVerifications.filter(v => v.needs_truck).map(v => (
              <Card key={v.id} className="border-2 border-primary/20">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{v.ngo_name}</h3>
                      <p className="text-xs text-muted-foreground">Listing: {v.listing_id}</p>
                    </div>
                    <Badge variant="outline" className={
                      v.status === "verified" ? "bg-green-100 text-green-800 border-green-200" :
                      v.status === "rejected" ? "bg-red-100 text-red-800 border-red-200" :
                      "bg-yellow-100 text-yellow-800 border-yellow-200"
                    }>
                      {v.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {v.truck_number_plate_url && (
                      <div className="space-y-1.5">
                        <p className="text-xs font-medium text-muted-foreground">Truck Number Plate</p>
                        <div className="relative group cursor-pointer" onClick={() => setPreviewImage(v.truck_number_plate_url)}>
                          <img src={v.truck_number_plate_url} alt="Truck number plate" className="w-full h-28 object-cover rounded-lg border border-border" />
                          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                    {v.driver_photo_url && (
                      <div className="space-y-1.5">
                        <p className="text-xs font-medium text-muted-foreground">Driver Photo</p>
                        <div className="relative group cursor-pointer" onClick={() => setPreviewImage(v.driver_photo_url)}>
                          <img src={v.driver_photo_url} alt="Driver" className="w-full h-28 object-cover rounded-lg border border-border" />
                          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {v.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 gap-1.5 bg-green-600 hover:bg-green-700" onClick={() => updateVerificationStatus(v.id, "verified")}>
                        <CheckCircle className="h-3.5 w-3.5" /> Verify
                      </Button>
                      <Button size="sm" variant="destructive" className="flex-1 gap-1.5" onClick={() => updateVerificationStatus(v.id, "rejected")}>
                        <XCircle className="h-3.5 w-3.5" /> Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-lg font-semibold mb-4">Your Listings</h2>
      {myListings.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          <Package className="mx-auto h-10 w-10 mb-2 text-muted-foreground/50" />
          <p>No listings yet. Click "List Surplus Food" to get started.</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {myListings.map(l => (
            <Card key={l.id} className="overflow-hidden">
              {l.imageUrl && (
                <img src={l.imageUrl} alt={l.foodType} className="w-full h-40 object-cover cursor-pointer" onClick={() => setPreviewImage(l.imageUrl!)} />
              )}
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{l.foodType}</h3>
                  <Badge variant="outline" className={statusColor(l.status)}>{l.status.replace("_", " ")}</Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Quantity: {l.quantity}</p>
                  <p className="flex items-center gap-1"><Clock className="h-3 w-3" /> Pickup: {l.pickupTime}</p>
                  <p>Expiry: {l.expiry}</p>
                  {l.claimedBy && <p className="text-primary font-medium">Claimed by: {l.claimedBy}</p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setPreviewImage(null)}>
          <div className="relative max-w-2xl max-h-[80vh]">
            <button className="absolute -top-10 right-0 text-white hover:text-white/80" onClick={() => setPreviewImage(null)}>
              <X className="h-6 w-6" />
            </button>
            <img src={previewImage} alt="Preview" className="max-w-full max-h-[80vh] object-contain rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDashboard;
