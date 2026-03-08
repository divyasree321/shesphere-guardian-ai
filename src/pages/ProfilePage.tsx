import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Bell, Plus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ProfilePage = () => {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contacts, setContacts] = useState([
    { name: "Mom - Asha Sharma", phone: "+91 98765 43211" },
    { name: "Friend - Priya M.", phone: "+91 98765 43212" },
  ]);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });

  const addContact = () => {
    if (!newContact.name || !newContact.phone) return;
    setContacts([...contacts, newContact]);
    setNewContact({ name: "", phone: "" });
    setContactOpen(false);
    toast({ title: "✅ Contact Added", description: `${newContact.name} added as emergency contact.` });
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
          <User className="h-7 w-7 text-primary" /> Profile
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <GlassCard hover={false} className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold">Personal Information</h3>
              <GlowButton size="sm" variant={editing ? "primary" : "outline"} onClick={() => {
                if (editing) { toast({ title: "✅ Changes Saved!" }); }
                setEditing(!editing);
              }}>
                {editing ? "Save Changes" : "Edit Profile"}
              </GlowButton>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Name", value: "Divya Sharma" },
                { label: "Email", value: "divya@example.com" },
                { label: "Phone", value: "+91 98765 43210" },
                { label: "Profession", value: "Software Engineer" },
                { label: "Career Interests", value: "AI, Data Science, ML" },
                { label: "Startup Interests", value: "EdTech, HealthTech" },
              ].map((field) => (
                <div key={field.label}>
                  <Label className="text-xs">{field.label}</Label>
                  <Input defaultValue={field.value} readOnly={!editing} className={`mt-1 bg-muted/50 border-border/50 ${!editing && "opacity-70"}`} />
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard hover={false}>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-display font-semibold">Divya Sharma</h3>
              <p className="text-xs text-muted-foreground">Software Engineer</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Safety Score</span>
                <span className="font-semibold">92%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Health Status</span>
                <span className="font-semibold text-secondary">Good</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Career Progress</span>
                <span className="font-semibold">78%</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold flex items-center gap-2">
                <Phone className="h-4 w-4 text-destructive" /> Emergency Contacts
              </h3>
              <button className="p-1 hover:bg-muted rounded-lg transition-colors" onClick={() => setContactOpen(true)}>
                <Plus className="h-4 w-4 text-primary" />
              </button>
            </div>
            <div className="space-y-2">
              {contacts.map((c) => (
                <div key={c.phone} className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.phone}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard hover={false} className="lg:col-span-2">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" /> Alert Preferences
            </h3>
            <div className="space-y-3">
              {[
                { label: "Safety Alerts", desc: "Get notified about safety risks near you", default: true },
                { label: "Health Reminders", desc: "Cycle tracking and wellness reminders", default: true },
                { label: "Career Opportunities", desc: "New job and scholarship notifications", default: true },
                { label: "Community Updates", desc: "Posts and discussions from your network", default: false },
              ].map((pref) => (
                <div key={pref.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{pref.label}</p>
                    <p className="text-xs text-muted-foreground">{pref.desc}</p>
                  </div>
                  <Switch defaultChecked={pref.default} />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Add Contact Dialog */}
        <Dialog open={contactOpen} onOpenChange={setContactOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">Add Emergency Contact</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div>
                <Label className="text-sm">Contact Name</Label>
                <Input placeholder="e.g. Mom - Name" className="mt-1 bg-muted/50" value={newContact.name} onChange={(e) => setNewContact((p) => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <Label className="text-sm">Phone Number</Label>
                <Input placeholder="+91 XXXXX XXXXX" className="mt-1 bg-muted/50" value={newContact.phone} onChange={(e) => setNewContact((p) => ({ ...p, phone: e.target.value }))} />
              </div>
              <GlowButton className="w-full" onClick={addContact}>Add Contact</GlowButton>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
};

export default ProfilePage;
