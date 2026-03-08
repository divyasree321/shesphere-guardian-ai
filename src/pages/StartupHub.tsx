import { motion } from "framer-motion";
import { Rocket, Lightbulb, BarChart3, DollarSign, Presentation, Users } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";

const StartupHub = () => (
  <DashboardLayout>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
        <Rocket className="h-7 w-7 text-secondary" /> SheInvest
      </h1>
      <p className="text-muted-foreground mb-6">Support for women entrepreneurs</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <GlassCard>
          <Lightbulb className="h-5 w-5 text-secondary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">Idea Validation</h3>
          <p className="text-xs text-muted-foreground mb-3">Validate your startup idea with AI-powered market analysis.</p>
          <GlowButton size="sm" className="w-full">Validate Idea</GlowButton>
        </GlassCard>
        <GlassCard>
          <BarChart3 className="h-5 w-5 text-primary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">Market Analysis</h3>
          <p className="text-xs text-muted-foreground">Generate comprehensive market reports for your startup.</p>
        </GlassCard>
        <GlassCard>
          <DollarSign className="h-5 w-5 text-secondary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">Funding Finder</h3>
          <p className="text-xs text-muted-foreground">Discover grants, angel investors, and VCs for women-led startups.</p>
        </GlassCard>
        <GlassCard>
          <Presentation className="h-5 w-5 text-primary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">Pitch Deck Generator</h3>
          <p className="text-xs text-muted-foreground">Create investor-ready pitch decks using AI.</p>
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
    </motion.div>
  </DashboardLayout>
);

export default StartupHub;
