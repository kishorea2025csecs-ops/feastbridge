import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Utensils, Users, TrendingDown, ArrowRight } from "lucide-react";
import ChatBot from "@/components/ChatBot";
import feastLogo from "@/assets/feast-bridge-logo.png";

const Landing = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 md:py-32">
        {/* Subtle floating logo watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.07] pointer-events-none hidden lg:block">
          <img src={feastLogo} alt="" className="w-[500px] h-[500px] object-contain" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <img
            src={feastLogo}
            alt="Feast Bridge Logo"
            className="mx-auto mb-8 h-32 w-32 rounded-full shadow-xl shadow-primary/20 border-4 border-primary/20 animate-fade-in"
          />
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm text-muted-foreground mb-6">
            <Leaf className="h-4 w-4 text-primary" />
            Reducing Food Waste in Chennai
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Connect Surplus Food with Those Who{" "}
            <span className="text-primary">Need It Most</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Feast Bridge connects restaurants with excess food to NGOs serving underprivileged communities in Chennai. Together, we fight hunger and reduce waste.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="gap-2 text-base px-8">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/map">
              <Button variant="outline" size="lg" className="text-base px-8">
                View Map
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 text-center md:grid-cols-3">
          {[
            { icon: TrendingDown, value: "2,500+", label: "Kg Food Saved" },
            { icon: Users, value: "15+", label: "NGOs Connected" },
            { icon: Utensils, value: "40+", label: "Restaurants Joined" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <stat.icon className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold text-foreground">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-3xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">A simple three-step process to turn surplus food into meals for those in need.</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "List Surplus Food", desc: "Restaurant owners register and post details about excess food — type, quantity, and pickup window." },
              { step: "2", title: "NGOs Get Notified", desc: "Registered NGOs see available food on the map and receive instant alerts for nearby listings." },
              { step: "3", title: "Claim & Pick Up", desc: "NGOs claim the food and pick it up within the given time. Waste reduced, lives fed!" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border bg-card p-8 text-center transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-xl font-bold shadow-lg shadow-primary/25">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-primary py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <img src={feastLogo} alt="" className="w-96 h-96 object-contain" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Join the Movement</h2>
          <p className="text-primary-foreground/80 mb-8">Whether you're a restaurant owner or an NGO, your contribution makes a difference. Register today and help us build a hunger-free Chennai.</p>
          <Link to="/login">
            <Button variant="secondary" size="lg" className="text-base px-8">
              Register Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center gap-4 text-sm text-muted-foreground md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <img src={feastLogo} alt="Feast Bridge" className="h-6 w-6 rounded-full" />
            <span>Feast Bridge — Food Waste Management Platform</span>
          </div>
          <span>© 2026 Feast Bridge. Developed by <strong className="text-foreground">Team Bug Busters</strong></span>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
};

export default Landing;
