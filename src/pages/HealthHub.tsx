import { motion } from "framer-motion";
import { Heart, Activity, Brain, Apple, Baby, Mic } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";

const HealthHub = () => (
  <DashboardLayout>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
        <Heart className="h-7 w-7 text-secondary" /> FemCare AI
      </h1>
      <p className="text-muted-foreground mb-6">AI-powered women's health monitoring</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <GlassCard>
          <Activity className="h-5 w-5 text-secondary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">Menstrual Cycle Tracker</h3>
          <p className="text-xs text-muted-foreground mb-3">Track your cycle with AI-powered predictions and personalized insights.</p>
          <div className="bg-secondary/10 rounded-xl p-3">
            <p className="text-xs font-semibold text-secondary">Next period: March 15</p>
            <p className="text-xs text-muted-foreground">Cycle day: 18 of 28</p>
          </div>
        </GlassCard>
        <GlassCard>
          <Brain className="h-5 w-5 text-primary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">Mental Wellness Tracker</h3>
          <p className="text-xs text-muted-foreground mb-3">Monitor stress levels, mood patterns, and get personalized wellness tips.</p>
          <GlowButton size="sm" className="w-full">Check Wellness</GlowButton>
        </GlassCard>
        <GlassCard>
          <Apple className="h-5 w-5 text-primary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">Diet & Wellness</h3>
          <p className="text-xs text-muted-foreground">Personalized nutrition plans and diet suggestions based on your health data.</p>
        </GlassCard>
        <GlassCard>
          <Heart className="h-5 w-5 text-secondary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">Health Risk Prediction</h3>
          <p className="text-xs text-muted-foreground">AI analyzes your data to predict potential health risks early.</p>
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
    </motion.div>
  </DashboardLayout>
);

export default HealthHub;
