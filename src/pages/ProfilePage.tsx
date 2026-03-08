import { motion } from "framer-motion";
import { User, Mail, Phone, Shield, Heart, Briefcase, Rocket, Bell } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ProfilePage = () => (
  <DashboardLayout>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
        <User className="h-7 w-7 text-primary" /> Profile
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Personal Info */}
        <GlassCard hover={false} className="lg:col-span-2">
          <h3 className="font-display font-semibold mb-4">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Name</Label>
              <Input defaultValue="Divya Sharma" className="mt-1 bg-muted/50 border-border/50" />
            </div>
            <div>
              <Label className="text-xs">Email</Label>
              <Input defaultValue="divya@example.com" className="mt-1 bg-muted/50 border-border/50" />
            </div>
            <div>
              <Label className="text-xs">Phone</Label>
              <Input defaultValue="+91 98765 43210" className="mt-1 bg-muted/50 border-border/50" />
            </div>
            <div>
              <Label className="text-xs">Profession</Label>
              <Input defaultValue="Software Engineer" className="mt-1 bg-muted/50 border-border/50" />
            </div>
            <div>
              <Label className="text-xs">Career Interests</Label>
              <Input defaultValue="AI, Data Science, ML" className="mt-1 bg-muted/50 border-border/50" />
            </div>
            <div>
              <Label className="text-xs">Startup Interests</Label>
              <Input defaultValue="EdTech, HealthTech" className="mt-1 bg-muted/50 border-border/50" />
            </div>
          </div>
          <GlowButton size="sm" className="mt-4">Save Changes</GlowButton>
        </GlassCard>

        {/* Avatar & Quick Info */}
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

        {/* Emergency Contacts */}
        <GlassCard hover={false}>
          <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
            <Phone className="h-4 w-4 text-destructive" /> Emergency Contacts
          </h3>
          <div className="space-y-2">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm font-medium">Mom - Asha Sharma</p>
              <p className="text-xs text-muted-foreground">+91 98765 43211</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm font-medium">Friend - Priya M.</p>
              <p className="text-xs text-muted-foreground">+91 98765 43212</p>
            </div>
          </div>
        </GlassCard>

        {/* Alert Preferences */}
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
    </motion.div>
  </DashboardLayout>
);

export default ProfilePage;
