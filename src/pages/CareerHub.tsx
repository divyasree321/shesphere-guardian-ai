import { motion } from "framer-motion";
import { Briefcase, FileText, MessageSquare, Search, Map, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";

const CareerHub = () => (
  <DashboardLayout>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
        <Briefcase className="h-7 w-7 text-primary" /> SkillRise AI
      </h1>
      <p className="text-muted-foreground mb-6">Career growth support powered by AI</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <GlassCard>
          <FileText className="h-5 w-5 text-primary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">AI Resume Builder</h3>
          <p className="text-xs text-muted-foreground mb-3">Create ATS-optimized resumes tailored to your target roles.</p>
          <GlowButton size="sm" className="w-full">Build Resume</GlowButton>
        </GlassCard>
        <GlassCard>
          <MessageSquare className="h-5 w-5 text-secondary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">Interview Practice</h3>
          <p className="text-xs text-muted-foreground mb-3">Practice with an AI chatbot that simulates real interviews.</p>
          <GlowButton variant="secondary" size="sm" className="w-full">Start Practice</GlowButton>
        </GlassCard>
        <GlassCard>
          <Search className="h-5 w-5 text-primary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">Remote Job Finder</h3>
          <p className="text-xs text-muted-foreground">Discover remote opportunities matching your skills and preferences.</p>
        </GlassCard>
        <GlassCard>
          <Map className="h-5 w-5 text-secondary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">Skill Learning Roadmap</h3>
          <p className="text-xs text-muted-foreground">Personalized learning paths to reach your career goals.</p>
        </GlassCard>
        <GlassCard className="md:col-span-2">
          <TrendingUp className="h-5 w-5 text-primary mb-3" />
          <h3 className="font-display font-semibold text-sm mb-2">AI Life Trajectory Predictor</h3>
          <div className="bg-primary/10 rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-2">If you learn <span className="font-semibold text-foreground">Data Science + Python</span>:</p>
            <p className="text-sm font-display font-bold">Estimated salary in 3 years: ₹18 LPA</p>
            <p className="text-xs text-primary font-semibold">Success probability: 81%</p>
          </div>
        </GlassCard>
      </div>
    </motion.div>
  </DashboardLayout>
);

export default CareerHub;
