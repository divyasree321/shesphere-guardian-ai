import { motion } from "framer-motion";
import { Lock, MessageSquare, Mail, Database, Scale, AlertTriangle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";

const ProtectionHub = () => (
  <DashboardLayout>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
        <Lock className="h-7 w-7 text-primary" /> SheShield AI
      </h1>
      <p className="text-muted-foreground mb-6">Digital harassment prevention & scam detection</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <GlassCard>
          <MessageSquare className="h-5 w-5 text-primary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">Chat Harassment Detection</h3>
          <p className="text-xs text-muted-foreground mb-3">AI scans messages for toxic or harassing content.</p>
          <GlowButton size="sm" className="w-full">Analyze Chat</GlowButton>
        </GlassCard>
        <GlassCard>
          <Mail className="h-5 w-5 text-secondary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">Email Threat Analysis</h3>
          <p className="text-xs text-muted-foreground">Detect phishing, scams, and threatening emails.</p>
        </GlassCard>
        <GlassCard>
          <AlertTriangle className="h-5 w-5 text-destructive mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">Deepfake Detection</h3>
          <div className="bg-destructive/10 rounded-xl p-3 mt-2">
            <p className="text-xs font-semibold text-destructive">⚠️ Warning</p>
            <p className="text-xs text-muted-foreground">Deepfake Probability: 87%</p>
          </div>
        </GlassCard>
        <GlassCard>
          <Database className="h-5 w-5 text-primary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">Evidence Storage</h3>
          <p className="text-xs text-muted-foreground">Securely store screenshots and evidence for legal proceedings.</p>
        </GlassCard>
        <GlassCard>
          <Scale className="h-5 w-5 text-secondary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">Legal Help Resources</h3>
          <p className="text-xs text-muted-foreground">Connect with legal advisors specializing in digital harassment.</p>
        </GlassCard>
      </div>
    </motion.div>
  </DashboardLayout>
);

export default ProtectionHub;
