import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useFood } from "@/contexts/FoodContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Clock } from "lucide-react";

const RestaurantDashboard = () => {
  const { user } = useAuth();
  const { listings, addListing } = useFood();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ foodType: "", quantity: "", pickupTime: "", expiry: "" });

  const myListings = listings.filter(l => l.restaurantName === user?.name);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.foodType || !form.quantity || !form.pickupTime || !form.expiry) return;
    addListing({
      restaurantName: user?.name || "",
      foodType: form.foodType,
      quantity: form.quantity,
      pickupTime: form.pickupTime,
      expiry: form.expiry,
      lat: 13.0827,
      lng: 80.2707,
      address: "Chennai",
    });
    setForm({ foodType: "", quantity: "", pickupTime: "", expiry: "" });
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
              <div className="sm:col-span-2 flex gap-2">
                <Button type="submit">Add Listing</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
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
            <Card key={l.id}>
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
    </div>
  );
};

export default RestaurantDashboard;
