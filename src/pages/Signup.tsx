import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Globe, Briefcase, Camera } from "lucide-react";
import { motion } from "framer-motion";
import RotatingBackground from "@/components/RotatingBackground";
import GlowButton from "@/components/GlowButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", age: "", profession: "", careerInterests: "", startupInterests: "" });
  const [safetyAlerts, setSafetyAlerts] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Account Created! 🎉", description: "Welcome to SheSphere AI!" });
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <RotatingBackground overlay="auth" className="min-h-screen flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card-strong w-full max-w-lg p-8"
      >
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <Globe className="h-8 w-8 text-primary" />
            <span className="font-display text-2xl font-bold gradient-text">SheSphere AI</span>
          </Link>
          <p className="text-muted-foreground text-sm">Create your account and start your journey.</p>
        </div>

        {/* Avatar Upload */}
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-primary/30 cursor-pointer hover:border-primary transition-colors">
            <Camera className="h-6 w-6 text-muted-foreground" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">+</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Name</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input placeholder="Your name" className="pl-9 bg-muted/50 border-border/50 h-9 text-sm" value={form.name} onChange={(e) => update("name", e.target.value)} />
              </div>
            </div>
            <div>
              <Label className="text-xs">Age</Label>
              <Input type="number" placeholder="Age" className="mt-1 bg-muted/50 border-border/50 h-9 text-sm" value={form.age} onChange={(e) => update("age", e.target.value)} />
            </div>
          </div>
          <div>
            <Label className="text-xs">Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input type="email" placeholder="you@example.com" className="pl-9 bg-muted/50 border-border/50 h-9 text-sm" value={form.email} onChange={(e) => update("email", e.target.value)} />
            </div>
          </div>
          <div>
            <Label className="text-xs">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input type="password" placeholder="••••••••" className="pl-9 bg-muted/50 border-border/50 h-9 text-sm" value={form.password} onChange={(e) => update("password", e.target.value)} />
            </div>
          </div>
          <div>
            <Label className="text-xs">Profession</Label>
            <div className="relative mt-1">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="e.g. Software Engineer" className="pl-9 bg-muted/50 border-border/50 h-9 text-sm" value={form.profession} onChange={(e) => update("profession", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Career Interests</Label>
              <Input placeholder="e.g. AI, Data Science" className="mt-1 bg-muted/50 border-border/50 h-9 text-sm" value={form.careerInterests} onChange={(e) => update("careerInterests", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs">Startup Interests</Label>
              <Input placeholder="e.g. EdTech, HealthTech" className="mt-1 bg-muted/50 border-border/50 h-9 text-sm" value={form.startupInterests} onChange={(e) => update("startupInterests", e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Checkbox checked={safetyAlerts} onCheckedChange={(v) => setSafetyAlerts(!!v)} id="safety" />
            <Label htmlFor="safety" className="text-xs text-muted-foreground cursor-pointer">Enable Safety Alerts</Label>
          </div>
          <GlowButton type="submit" className="w-full">Create Account</GlowButton>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
        </p>
      </motion.div>
    </RotatingBackground>
  );
};

export default Signup;
