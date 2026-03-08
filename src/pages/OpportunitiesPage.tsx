import { motion } from "framer-motion";
import { Radar, Briefcase, GraduationCap, Award, Trophy, Clock } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";

const opportunities = [
  { icon: Briefcase, type: "Job", title: "Senior Data Analyst - Remote", org: "TechCorp", deadline: "March 20" },
  { icon: GraduationCap, type: "Scholarship", title: "Women in STEM Scholarship", org: "Google", deadline: "March 25" },
  { icon: Award, type: "Grant", title: "Startup Grant – ₹10 Lakhs", org: "NITI Aayog", deadline: "March 30" },
  { icon: Trophy, type: "Competition", title: "Women Hackathon 2026", org: "Microsoft", deadline: "April 5" },
  { icon: Briefcase, type: "Internship", title: "AI Research Intern", org: "DeepMind", deadline: "April 10" },
];

const OpportunitiesPage = () => (
  <DashboardLayout>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
        <Radar className="h-7 w-7 text-primary" /> Opportunity Radar
      </h1>
      <p className="text-muted-foreground mb-6">AI-curated opportunities just for you</p>

      <div className="bg-primary/10 rounded-xl p-4 mb-6 flex items-center gap-3">
        <Radar className="h-6 w-6 text-primary shrink-0" />
        <div>
          <p className="text-sm font-display font-semibold">{opportunities.length} New Opportunities Found</p>
          <p className="text-xs text-muted-foreground">Based on your profile, interests, and skills</p>
        </div>
      </div>

      <div className="space-y-3">
        {opportunities.map((opp, i) => (
          <motion.div
            key={opp.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="flex items-center gap-4 !p-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <opp.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{opp.type}</span>
                </div>
                <h3 className="font-display font-semibold text-sm">{opp.title}</h3>
                <p className="text-xs text-muted-foreground">{opp.org}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <Clock className="h-3 w-3" /> {opp.deadline}
                </div>
                <GlowButton size="sm">Apply</GlowButton>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </DashboardLayout>
);

export default OpportunitiesPage;
