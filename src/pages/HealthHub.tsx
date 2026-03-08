import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Activity, Brain, Apple, Baby, Mic, Upload, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const HealthHub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cycleOpen, setCycleOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
          <Heart className="h-7 w-7 text-secondary" /> FemCare AI
        </h1>
        <p className="text-muted-foreground mb-6">AI-powered women's health monitoring</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <GlassCard onClick={() => setCycleOpen(true)}>
            <Activity className="h-5 w-5 text-secondary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Menstrual Cycle Tracker</h3>
            <p className="text-xs text-muted-foreground mb-3">Track your cycle with AI-powered predictions.</p>
            <div className="bg-secondary/10 rounded-xl p-3">
              <p className="text-xs font-semibold text-secondary">Next period: March 15</p>
              <p className="text-xs text-muted-foreground">Cycle day: 18 of 28</p>
            </div>
            <GlowButton size="sm" className="w-full mt-3" onClick={(e) => { e.stopPropagation(); setCycleOpen(true); }}>Track Cycle</GlowButton>
          </GlassCard>

          <GlassCard onClick={() => navigate("/dashboard/wellness")}>
            <Brain className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Mental Wellness Tracker</h3>
            <p className="text-xs text-muted-foreground mb-3">Monitor stress levels, mood patterns, and get personalized wellness tips.</p>
            <GlowButton size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); navigate("/dashboard/wellness"); }}>Go to Wellness</GlowButton>
          </GlassCard>

          <GlassCard onClick={() => setUploadOpen(true)}>
            <Upload className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Upload Medical Report</h3>
            <p className="text-xs text-muted-foreground mb-3">AI analyzes your medical reports for insights.</p>
            <GlowButton size="sm" variant="outline" className="w-full" onClick={(e) => { e.stopPropagation(); setUploadOpen(true); }}>Upload Report</GlowButton>
          </GlassCard>

          <GlassCard onClick={() => setInsightsOpen(true)}>
            <BarChart3 className="h-5 w-5 text-secondary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Health Insights</h3>
            <p className="text-xs text-muted-foreground mb-3">View AI-generated health analysis and recommendations.</p>
            <GlowButton size="sm" className="w-full" variant="secondary" onClick={(e) => { e.stopPropagation(); setInsightsOpen(true); }}>View Insights</GlowButton>
          </GlassCard>

          <GlassCard>
            <Baby className="h-5 w-5 text-secondary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Pregnancy Health Tips</h3>
            <p className="text-xs text-muted-foreground">Trimester-specific guidance, nutrition, and wellness advice.</p>
          </GlassCard>

          <GlassCard>
            <Mic className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Emotional Voice Detection</h3>
            <p className="text-xs text-muted-foreground">Detect stress or fear in your voice and get breathing exercises.</p>
          </GlassCard>
        </div>

        {/* Cycle Tracker Dialog */}
        <Dialog open={cycleOpen} onOpenChange={setCycleOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">Cycle Tracker</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="bg-secondary/10 rounded-xl p-4 text-center">
                <Activity className="h-10 w-10 text-secondary mx-auto mb-2" />
                <p className="font-display font-bold text-lg">Day 18 of 28</p>
                <p className="text-sm text-muted-foreground">Luteal Phase</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Next Period</p>
                  <p className="font-semibold text-sm">March 15</p>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">Avg Cycle</p>
                  <p className="font-semibold text-sm">28 days</p>
                </div>
              </div>
              <GlowButton className="w-full" onClick={() => { setCycleOpen(false); toast({ title: "Cycle Updated ✅" }); }}>Log Today</GlowButton>
            </div>
          </DialogContent>
        </Dialog>

        {/* Upload Dialog */}
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">Upload Medical Report</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Drop your report here or click to browse</p>
                <Input type="file" className="mt-3" />
              </div>
              <GlowButton className="w-full" onClick={() => { setUploadOpen(false); toast({ title: "Report Uploaded ✅", description: "AI is analyzing your report..." }); }}>Analyze Report</GlowButton>
            </div>
          </DialogContent>
        </Dialog>

        {/* Insights Dialog */}
        <Dialog open={insightsOpen} onOpenChange={setInsightsOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">AI Health Insights</DialogTitle></DialogHeader>
            <div className="space-y-3">
              {[
                { label: "Overall Health", value: "Good", color: "text-secondary" },
                { label: "Iron Levels", value: "Normal", color: "text-secondary" },
                { label: "Vitamin D", value: "Low – Supplement recommended", color: "text-destructive" },
                { label: "Stress Level", value: "Moderate", color: "text-primary" },
                { label: "Sleep Quality", value: "7.2 hrs avg", color: "text-secondary" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center bg-muted rounded-xl p-3">
                  <span className="text-sm">{item.label}</span>
                  <span className={`text-sm font-semibold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
};

export default HealthHub;
