import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X, Languages } from "lucide-react";
import { useState } from "react";
import feastLogo from "@/assets/feast-bridge-logo.png";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const toggleLang = () => setLang(lang === "en" ? "ta" : "en");

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 font-bold text-xl">
          <img src={feastLogo} alt="Feast Bridge" className="h-9 w-9 rounded-full shadow-md" />
          <span className="text-foreground">Feast Bridge</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.home")}</Link>
          <Link to="/map" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.map")}</Link>
          <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.contact")}</Link>
          {!loading && user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.dashboard")}</Link>
              <span className="text-sm text-muted-foreground">{t("nav.hi")}, {user.name.split(" ")[0]}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-1 h-4 w-4" /> {t("nav.logout")}
              </Button>
            </>
          ) : !loading ? (
            <Link to="/login">
              <Button size="sm">{t("nav.login")}</Button>
            </Link>
          ) : null}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary/20"
            aria-label="Switch language"
          >
            <Languages className="h-3.5 w-3.5" />
            {lang === "en" ? "தமிழ்" : "English"}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-2 py-1.5 text-xs font-semibold text-primary"
          >
            <Languages className="h-3.5 w-3.5" />
            {lang === "en" ? "த" : "EN"}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-3 border-t bg-background p-4 md:hidden">
          <Link to="/" onClick={() => setMobileOpen(false)} className="text-sm font-medium">{t("nav.home")}</Link>
          <Link to="/map" onClick={() => setMobileOpen(false)} className="text-sm font-medium">{t("nav.map")}</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)} className="text-sm font-medium">{t("nav.contact")}</Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-sm font-medium">{t("nav.dashboard")}</Link>
              <Button variant="outline" size="sm" onClick={() => { handleLogout(); setMobileOpen(false); }}>{t("nav.logout")}</Button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="w-full">{t("nav.login")}</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
