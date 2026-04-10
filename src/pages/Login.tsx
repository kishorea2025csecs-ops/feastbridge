import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Utensils, Heart } from "lucide-react";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("restaurant");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    const success = login(email, password);
    if (success) {
      navigate("/dashboard");
    } else {
      toast({ title: "Invalid Credentials", description: "Please check your email and password.", variant: "destructive" });
    }
  };

  const fillDemo = () => {
    if (selectedRole === "restaurant") {
      setEmail("restaurant@demo.com");
      setPassword("demo123");
    } else {
      setEmail("ngo@demo.com");
      setPassword("demo123");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Select your role and log in to continue</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Role Toggle */}
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg border p-1">
            <button
              className={`flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all ${selectedRole === "restaurant" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => { setSelectedRole("restaurant"); setEmail(""); setPassword(""); }}
            >
              <Utensils className="h-4 w-4" /> Restaurant
            </button>
            <button
              className={`flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all ${selectedRole === "ngo" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => { setSelectedRole("ngo"); setEmail(""); setPassword(""); }}
            >
              <Heart className="h-4 w-4" /> NGO Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>

          <div className="mt-4 text-center">
            <button onClick={fillDemo} className="text-sm text-primary hover:underline">
              Fill demo credentials ({selectedRole === "restaurant" ? "Restaurant" : "NGO"})
            </button>
          </div>

          <div className="mt-6 rounded-lg bg-muted p-4 text-xs text-muted-foreground">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>Restaurant: restaurant@demo.com / demo123</p>
            <p>NGO: ngo@demo.com / demo123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
