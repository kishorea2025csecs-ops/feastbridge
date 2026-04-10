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
  const [mode, setMode] = useState<"login" | "register">("login");
  const [selectedRole, setSelectedRole] = useState<UserRole>("restaurant");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    if (mode === "register" && !name.trim()) {
      toast({ title: "Error", description: "Please enter your name.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "login") {
        const { error } = await login(email, password);
        if (error) {
          toast({ title: "Login Failed", description: error, variant: "destructive" });
        } else {
          navigate("/dashboard");
        }
      } else {
        const { error } = await register(email, password, name, selectedRole);
        if (error) {
          toast({ title: "Registration Failed", description: error, variant: "destructive" });
        } else {
          toast({ title: "Welcome!", description: "Account created successfully." });
          navigate("/dashboard");
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{mode === "login" ? "Welcome Back" : "Create Account"}</CardTitle>
          <CardDescription>
            {mode === "login" ? "Log in to your account" : "Register as a Restaurant or NGO"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Role Toggle (always visible for register, shown for context on login) */}
          {mode === "register" && (
            <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg border p-1">
              <button
                type="button"
                className={`flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all ${selectedRole === "restaurant" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setSelectedRole("restaurant")}
              >
                <Utensils className="h-4 w-4" /> Restaurant
              </button>
              <button
                type="button"
                className={`flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all ${selectedRole === "ngo" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setSelectedRole("ngo")}
              >
                <Heart className="h-4 w-4" /> NGO Admin
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="name">{selectedRole === "restaurant" ? "Restaurant Name" : "Organization Name"}</Label>
                <Input id="name" placeholder={selectedRole === "restaurant" ? "e.g. Chennai Grand Kitchen" : "e.g. Feed Chennai Foundation"} value={name} onChange={e => setName(e.target.value)} />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <button onClick={() => setMode("register")} className="text-primary hover:underline font-medium">
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="text-primary hover:underline font-medium">
                  Login here
                </button>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
