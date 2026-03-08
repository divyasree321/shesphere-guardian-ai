import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, MapPin, AlertTriangle, Phone, Radio, Eye, Camera } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const SafetyHub = () => {
  const { toast } = useToast();
  const [mapOpen, setMapOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const activateSOS = () => {
    toast({
      title: "🚨 SOS Activated!",
      description: "Live location shared. Emergency contacts alerted. Audio recording started.",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" /> SafeRoute AI
        </h1>
        <p className="text-muted-foreground mb-6">Women safety & emergency protection</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <GlassCard onClick={() => setMapOpen(true)}>
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-display font-semibold text-sm">Safe Route Navigation</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Find the safest path to your destination using AI-analyzed crime data.</p>
            <GlowButton size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); setMapOpen(true); }}>View Safe Routes</GlowButton>
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

          <GlassCard glow onClick={activateSOS}>
            <div className="flex items-center gap-3 mb-3">
              <Phone className="h-5 w-5 text-destructive" />
              <span className="font-display font-semibold text-sm">SOS Emergency</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Send live location, audio recording & emergency alerts to contacts.</p>
            <GlowButton variant="secondary" size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); activateSOS(); }}>🚨 Activate SOS</GlowButton>
          </GlassCard>

          <GlassCard onClick={() => setReportOpen(true)}>
            <div className="flex items-center gap-3 mb-3">
              <Camera className="h-5 w-5 text-primary" />
              <span className="font-display font-semibold text-sm">Report Incident</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Upload photos or evidence to report an incident.</p>
            <GlowButton size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); setReportOpen(true); }}>Report Now</GlowButton>
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
            <p className="text-xs text-muted-foreground mb-3">Share your real-time location with trusted family contacts.</p>
            <GlowButton size="sm" variant="outline" className="w-full" onClick={() => toast({ title: "📍 Location Sharing Enabled", description: "Your trusted contacts can now see your live location." })}>
              Share Location
            </GlowButton>
          </GlassCard>
        </div>

        {/* Map Dialog */}
        <Dialog open={mapOpen} onOpenChange={setMapOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle className="font-display">Safe Route Map</DialogTitle></DialogHeader>
            <div className="bg-muted rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Interactive map interface</p>
                <p className="text-xs text-muted-foreground mt-1">Showing safest routes with AI-analyzed safety scores</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Input placeholder="Enter destination..." className="bg-muted/50" />
              <GlowButton size="sm" onClick={() => { setMapOpen(false); toast({ title: "🗺️ Route Found", description: "Safest route has been calculated." }); }}>Find Route</GlowButton>
            </div>
          </DialogContent>
        </Dialog>

        {/* Report Dialog */}
        <Dialog open={reportOpen} onOpenChange={setReportOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">Report Incident</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-sm">Incident Type</Label>
                <Input placeholder="e.g. Harassment, Suspicious activity" className="mt-1 bg-muted/50" />
              </div>
              <div>
                <Label className="text-sm">Description</Label>
                <Textarea placeholder="Describe what happened..." className="mt-1 bg-muted/50" rows={3} />
              </div>
              <div>
                <Label className="text-sm">Upload Evidence</Label>
                <Input type="file" className="mt-1 bg-muted/50" />
              </div>
              <GlowButton className="w-full" onClick={() => { setReportOpen(false); toast({ title: "✅ Report Submitted", description: "Your incident report has been filed." }); }}>
                Submit Report
              </GlowButton>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
};

export default SafetyHub;
