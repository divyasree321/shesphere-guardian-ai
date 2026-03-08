import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, MapPin, AlertTriangle, Phone, Radio, Eye, Camera, Navigation } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const SafetyHub = () => {
  const { toast } = useToast();
  const [mapOpen, setMapOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [destination, setDestination] = useState("");

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

        {/* Inline Map */}
        <GlassCard hover={false} className="mb-6 !p-0 overflow-hidden">
          <div className="p-4 flex flex-col sm:flex-row gap-3 items-center">
            <Input placeholder="Search destination..." value={destination} onChange={e => setDestination(e.target.value)} className="bg-muted/50 flex-1" />
            <GlowButton size="sm" onClick={() => toast({ title: "🗺️ Route Found", description: `Safest route to "${destination || "your destination"}" calculated.` })}>
              <Navigation className="h-4 w-4" /> Find Safe Route
            </GlowButton>
          </div>
          <div className="h-64 md:h-80">
            <MapContainer center={[28.6139, 77.2090]} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker />
              {nearbyPlaces.map((place) => (
                <Marker key={place.name} position={[place.lat, place.lng]} icon={safetyIcon}>
                  <Popup>
                    <strong>{place.name}</strong><br />
                    <span className="text-xs">{place.type}</span>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </GlassCard>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
            <p className="text-xs text-muted-foreground mb-3">Send live location, audio recording & alerts.</p>
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
            <p className="text-xs text-muted-foreground">Activate emergency by saying "Help me". Works silently.</p>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-3">
              <Eye className="h-5 w-5 text-primary" />
              <span className="font-display font-semibold text-sm">Live Location Sharing</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Share real-time location with trusted contacts.</p>
            <GlowButton size="sm" variant="outline" className="w-full" onClick={() => toast({ title: "📍 Location Sharing Enabled" })}>Share Location</GlowButton>
          </GlassCard>
        </div>

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
              <GlowButton className="w-full" onClick={() => { setReportOpen(false); toast({ title: "✅ Report Submitted" }); }}>Submit Report</GlowButton>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
};

export default SafetyHub;
