import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Utensils, Heart, Mail, Lock, User, ArrowRight } from "lucide-react";
import loginBg from "@/assets/login-bg.png";

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
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginBg})` }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Floating Glass Card */}
      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm">
              {mode === "login" ? (
                <Lock className="h-8 w-8 text-primary" />
              ) : (
                <User className="h-8 w-8 text-primary" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-white">
              {mode === "login" ? "Welcome Back" : "Join Feast Bridge"}
            </h1>
            <p className="mt-2 text-sm text-white/70">
              {mode === "login"
                ? "Sign in to continue your mission"
                : "Register to start reducing food waste"}
            </p>
          </div>

          {/* Role Toggle */}
          {mode === "register" && (
            <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-white/15 bg-white/5 p-1.5">
              <button
                type="button"
                className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300 ${
                  selectedRole === "restaurant"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => setSelectedRole("restaurant")}
              >
                <Utensils className="h-4 w-4" /> Restaurant
              </button>
              <button
                type="button"
                className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300 ${
                  selectedRole === "ngo"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => setSelectedRole("ngo")}
              >
                <Heart className="h-4 w-4" /> NGO Admin
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-white/80">
                  {selectedRole === "restaurant" ? "Restaurant Name" : "Organization Name"}
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <Input
                    id="name"
                    placeholder={selectedRole === "restaurant" ? "e.g. Chennai Grand Kitchen" : "e.g. Feed Chennai Foundation"}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="h-12 rounded-xl border-white/15 bg-white/10 pl-11 text-white placeholder:text-white/30 focus:border-primary focus:ring-primary/30"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-white/80">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-white/15 bg-white/10 pl-11 text-white placeholder:text-white/30 focus:border-primary focus:ring-primary/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-white/80">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="h-12 rounded-xl border-white/15 bg-white/10 pl-11 text-white placeholder:text-white/30 focus:border-primary focus:ring-primary/30"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="group h-13 w-full rounded-xl bg-primary text-lg font-semibold shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Please wait...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>

          {/* Toggle mode */}
          <div className="mt-8 text-center">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />
            <p className="text-sm text-white/60">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary/10 hover:shadow-lg"
            >
              {mode === "login" ? "Register here" : "Login here"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
