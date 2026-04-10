import { useAuth } from "@/contexts/AuthContext";
import { useFood } from "@/contexts/FoodContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Check } from "lucide-react";

const NgoDashboard = () => {
  const { user } = useAuth();
  const { listings, claimListing, markPickedUp } = useFood();

  const available = listings.filter(l => l.status === "available");
  const myClaimed = listings.filter(l => l.claimedBy === user?.name);

  const statusColor = (s: string) => {
    if (s === "available") return "bg-primary/10 text-primary border-primary/20";
    if (s === "claimed") return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-muted text-muted-foreground border-border";
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
            <Card key={l.id}>
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
                <Button className="mt-4 w-full" onClick={() => claimListing(l.id, user?.name || "")}>
                  Claim for Pickup
                </Button>
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
          {myClaimed.map(l => (
            <Card key={l.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{l.restaurantName}</h3>
                  <Badge variant="outline" className={statusColor(l.status)}>{l.status.replace("_", " ")}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{l.foodType} — {l.quantity}</p>
                {l.status === "claimed" && (
                  <Button size="sm" className="mt-3 gap-1" onClick={() => markPickedUp(l.id)}>
                    <Check className="h-3 w-3" /> Mark Picked Up
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NgoDashboard;
