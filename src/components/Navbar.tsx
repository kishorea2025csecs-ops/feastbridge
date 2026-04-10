import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Leaf, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-foreground">Bug Busters</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/map" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Map</Link>
          <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
              <span className="text-sm text-muted-foreground">Hi, {user.name.split(" ")[0]}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-1 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="flex flex-col gap-3 border-t bg-background p-4 md:hidden">
          <Link to="/" onClick={() => setMobileOpen(false)} className="text-sm font-medium">Home</Link>
          <Link to="/map" onClick={() => setMobileOpen(false)} className="text-sm font-medium">Map</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)} className="text-sm font-medium">Contact</Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-sm font-medium">Dashboard</Link>
              <Button variant="outline" size="sm" onClick={() => { handleLogout(); setMobileOpen(false); }}>Logout</Button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="w-full">Login</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
