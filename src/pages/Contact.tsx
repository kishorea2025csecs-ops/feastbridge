import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Mail, MapPin, Send } from "lucide-react";
import feastLogo from "@/assets/feast-bridge-logo.png";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    toast({ title: "Message Sent!", description: "Thank you for reaching out. We'll get back to you soon." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <img src={feastLogo} alt="" className="w-[600px] h-[600px] object-contain" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground text-center mb-2">Contact Us</h1>
        <p className="text-center text-muted-foreground mb-10">Have questions? We'd love to hear from you.</p>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="rounded-2xl shadow-lg border-primary/10">
            <CardHeader><CardTitle>Send a Message</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea placeholder="How can we help?" rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="rounded-xl" />
                </div>
                <Button type="submit" className="w-full gap-2">
                  <Send className="h-4 w-4" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {[
              { icon: Mail, title: "Email", info: "bugbustersteam2@gmail.com" },
              { icon: MapPin, title: "Address", info: "Rajalakshmi Habitat, Chennai" },
            ].map((item, i) => (
              <Card key={i} className="rounded-2xl shadow-md border-primary/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.info}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
