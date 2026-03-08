import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, MessageSquare, Mail, Database, Scale, AlertTriangle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const ProtectionHub = () => {
  const { toast } = useToast();
  const [scanType, setScanType] = useState<"chat" | "email" | "deepfake" | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const runScan = () => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setScanning(false);
      const results: Record<string, string> = {
        chat: "Toxicity Score: 23% — Low risk. No harassment detected.",
        email: "Threat Level: Safe ✅ — No phishing or scam indicators found.",
        deepfake: "⚠️ Deepfake Probability: 87% — This content appears to be manipulated.",
      };
      setResult(results[scanType!]);
      toast({ title: "Scan Complete", description: "Analysis results are ready." });
    }, 2000);
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
          <Lock className="h-7 w-7 text-primary" /> SheShield AI
        </h1>
        <p className="text-muted-foreground mb-6">Digital harassment prevention & scam detection</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <GlassCard onClick={() => { setScanType("chat"); setResult(null); }}>
            <MessageSquare className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Chat Harassment Detection</h3>
            <p className="text-xs text-muted-foreground mb-3">AI scans messages for toxic or harassing content.</p>
            <GlowButton size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); setScanType("chat"); setResult(null); }}>Scan Message</GlowButton>
          </GlassCard>

          <GlassCard onClick={() => { setScanType("email"); setResult(null); }}>
            <Mail className="h-5 w-5 text-secondary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Email Threat Analysis</h3>
            <p className="text-xs text-muted-foreground mb-3">Detect phishing, scams, and threatening emails.</p>
            <GlowButton size="sm" variant="secondary" className="w-full" onClick={(e) => { e.stopPropagation(); setScanType("email"); setResult(null); }}>Scan Email</GlowButton>
          </GlassCard>

          <GlassCard onClick={() => { setScanType("deepfake"); setResult(null); }}>
            <AlertTriangle className="h-5 w-5 text-destructive mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Deepfake Detection</h3>
            <p className="text-xs text-muted-foreground mb-3">Detect fake voice calls, videos, and profiles.</p>
            <GlowButton size="sm" variant="outline" className="w-full" onClick={(e) => { e.stopPropagation(); setScanType("deepfake"); setResult(null); }}>Check Deepfake</GlowButton>
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

        {/* Scan Dialog */}
        <Dialog open={!!scanType} onOpenChange={() => setScanType(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">
                {scanType === "chat" && "Scan Message for Harassment"}
                {scanType === "email" && "Analyze Email for Threats"}
                {scanType === "deepfake" && "Deepfake Detection"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder={
                  scanType === "chat" ? "Paste the message here..." :
                  scanType === "email" ? "Paste the email content here..." :
                  "Paste the URL or content to check..."
                }
                className="bg-muted/50"
                rows={4}
              />
              {result ? (
                <div className={`rounded-xl p-4 ${result.includes("⚠️") ? "bg-destructive/10" : "bg-secondary/10"}`}>
                  <p className="text-sm font-medium">{result}</p>
                </div>
              ) : (
                <GlowButton className="w-full" onClick={runScan} disabled={scanning}>
                  {scanning ? "Analyzing..." : "Run AI Scan"}
                </GlowButton>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
};

export default ProtectionHub;
