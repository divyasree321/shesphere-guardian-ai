import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Lightbulb, BarChart3, DollarSign, Presentation, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const StartupHub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ideaOpen, setIdeaOpen] = useState(false);
  const [pitchOpen, setPitchOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const validateIdea = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      toast({ title: "✅ Idea Validated!", description: "Market viability: 78%. Competition: Medium. Proceed with MVP." });
      setIdeaOpen(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
          <Rocket className="h-7 w-7 text-secondary" /> SheInvest
        </h1>
        <p className="text-muted-foreground mb-6">Support for women entrepreneurs</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <GlassCard onClick={() => setIdeaOpen(true)}>
            <Lightbulb className="h-5 w-5 text-secondary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Idea Validation</h3>
            <p className="text-xs text-muted-foreground mb-3">Validate your startup idea with AI-powered market analysis.</p>
            <GlowButton size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); setIdeaOpen(true); }}>Validate Idea</GlowButton>
          </GlassCard>

          <GlassCard>
            <BarChart3 className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Market Analysis</h3>
            <p className="text-xs text-muted-foreground">Generate comprehensive market reports for your startup.</p>
          </GlassCard>

          <GlassCard onClick={() => navigate("/dashboard/opportunities")}>
            <DollarSign className="h-5 w-5 text-secondary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Funding Finder</h3>
            <p className="text-xs text-muted-foreground mb-3">Discover grants, angel investors, and VCs for women-led startups.</p>
            <GlowButton size="sm" variant="outline" className="w-full" onClick={(e) => { e.stopPropagation(); navigate("/dashboard/opportunities"); }}>Find Funding</GlowButton>
          </GlassCard>

          <GlassCard onClick={() => setPitchOpen(true)}>
            <Presentation className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Pitch Deck Generator</h3>
            <p className="text-xs text-muted-foreground mb-3">Create investor-ready pitch decks using AI.</p>
            <GlowButton size="sm" className="w-full" variant="secondary" onClick={(e) => { e.stopPropagation(); setPitchOpen(true); }}>Generate Pitch</GlowButton>
          </GlassCard>

          <GlassCard>
            <Users className="h-5 w-5 text-secondary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Investor Matchmaking</h3>
            <p className="text-xs text-muted-foreground">AI matches you with investors aligned to your industry.</p>
          </GlassCard>

          <GlassCard>
            <Rocket className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Future Simulation</h3>
            <div className="bg-primary/10 rounded-xl p-3 mt-2">
              <p className="text-xs text-muted-foreground">Funding probability: <span className="font-bold text-foreground">73%</span></p>
              <p className="text-xs text-muted-foreground">Market competition: <span className="font-bold text-foreground">Medium</span></p>
            </div>
          </GlassCard>
        </div>

        {/* Idea Validation Dialog */}
        <Dialog open={ideaOpen} onOpenChange={setIdeaOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">Validate Your Startup Idea</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Startup Name" className="bg-muted/50" />
              <Input placeholder="Industry (e.g. EdTech, HealthTech)" className="bg-muted/50" />
              <Textarea placeholder="Describe your idea in 2-3 sentences..." className="bg-muted/50" rows={3} />
              <GlowButton className="w-full" onClick={validateIdea} disabled={analyzing}>
                {analyzing ? "Analyzing..." : "Run AI Analysis"}
              </GlowButton>
            </div>
          </DialogContent>
        </Dialog>

        {/* Pitch Deck Dialog */}
        <Dialog open={pitchOpen} onOpenChange={setPitchOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">Pitch Deck Generator</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Company Name" className="bg-muted/50" />
              <Input placeholder="Problem you're solving" className="bg-muted/50" />
              <Input placeholder="Target market" className="bg-muted/50" />
              <Input placeholder="Revenue model" className="bg-muted/50" />
              <GlowButton className="w-full" onClick={() => { setPitchOpen(false); toast({ title: "📊 Pitch Deck Generated!", description: "Your investor-ready deck is ready for download." }); }}>
                Generate Deck
              </GlowButton>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
};

export default StartupHub;
