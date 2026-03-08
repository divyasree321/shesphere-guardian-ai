import { motion } from "framer-motion";
import { Shield, MapPin, AlertTriangle, Phone, Radio, Eye } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";

const SafetyHub = () => (
  <DashboardLayout>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
        <Shield className="h-7 w-7 text-primary" /> SafeRoute AI
      </h1>
      <p className="text-muted-foreground mb-6">Women safety & emergency protection</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <GlassCard>
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-display font-semibold text-sm">Safe Route Navigation</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Find the safest path to your destination using AI-analyzed crime data.</p>
          <GlowButton size="sm" className="w-full">Find Safe Route</GlowButton>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span className="font-display font-semibold text-sm">Danger Prediction</span>
          </div>
          <div className="bg-destructive/10 rounded-xl p-3 mb-3">
            <p className="text-xs font-semibold text-destructive">High Risk Area Detected</p>
            <p className="text-xs text-muted-foreground mt-1">Risk Probability: 72%</p>
            <p className="text-xs text-muted-foreground">Reason: Poor lighting & previous incidents</p>
          </div>
        </GlassCard>
        <GlassCard glow>
          <div className="flex items-center gap-3 mb-3">
            <Phone className="h-5 w-5 text-destructive" />
            <span className="font-display font-semibold text-sm">SOS Emergency</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Send live location, audio recording & emergency alerts to contacts.</p>
          <GlowButton variant="secondary" size="sm" className="w-full">🚨 Activate SOS</GlowButton>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center gap-3 mb-3">
            <Radio className="h-5 w-5 text-primary" />
            <span className="font-display font-semibold text-sm">Whisper SOS Mode</span>
          </div>
          <p className="text-xs text-muted-foreground">Activate emergency mode by saying "Help me". Works silently.</p>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center gap-3 mb-3">
            <Eye className="h-5 w-5 text-primary" />
            <span className="font-display font-semibold text-sm">Live Location Sharing</span>
          </div>
          <p className="text-xs text-muted-foreground">Share your real-time location with trusted family contacts.</p>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-secondary" />
            <span className="font-display font-semibold text-sm">Global Sisterhood</span>
          </div>
          <p className="text-xs text-muted-foreground">Nearby users receive emergency alerts when you need help.</p>
        </GlassCard>
      </div>
    </motion.div>
  </DashboardLayout>
);

export default SafetyHub;
