import { motion } from "framer-motion";
import {
  Shield, Heart, Briefcase, Rocket, Users, AlertTriangle,
  TrendingUp, Bot, Bell, Radar, ChevronRight
} from "lucide-react";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import DashboardLayout from "@/components/DashboardLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }),
};

const dashCards = [
  { icon: Shield, label: "Safety Score", value: "92%", color: "text-primary", desc: "Your area is safe" },
  { icon: Heart, label: "Health Status", value: "Good", color: "text-secondary", desc: "All vitals normal" },
  { icon: Rocket, label: "Funding Opportunities", value: "3 New", color: "text-primary", desc: "₹10L+ available" },
  { icon: Users, label: "Mentors Available", value: "5", color: "text-secondary", desc: "Matched for you" },
  { icon: Briefcase, label: "Career Recommendations", value: "2", color: "text-primary", desc: "New this week" },
  { icon: AlertTriangle, label: "Safety Alerts", value: "1", color: "text-destructive", desc: "Nearby alert active" },
];

const recentActivity = [
  { icon: Bell, text: "New scholarship opportunity: Google Women in Tech", time: "2h ago" },
  { icon: Radar, text: "3 new job matches found based on your profile", time: "5h ago" },
  { icon: Heart, text: "Health tip: Time for your monthly wellness check", time: "1d ago" },
  { icon: Shield, text: "Safety score updated for your regular route", time: "2d ago" },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <motion.div initial="hidden" animate="visible">
        {/* Greeting */}
        <motion.div variants={fadeUp} custom={0} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold">
            Hello Divya 👋
          </h1>
          <p className="text-muted-foreground mt-1">Here's your personalized overview for today.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {dashCards.map((card, i) => (
            <motion.div key={card.label} variants={fadeUp} custom={i + 1}>
              <GlassCard className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                  <p className="text-xl font-display font-bold">{card.value}</p>
                  <p className="text-xs text-muted-foreground">{card.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div variants={fadeUp} custom={8} className="lg:col-span-2">
            <GlassCard hover={false} className="h-full">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                    <item.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{item.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={fadeUp} custom={9}>
            <GlassCard hover={false} className="h-full">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <Bot className="h-5 w-5 text-secondary" />
                Guardian AI
              </h3>
              <div className="bg-muted/50 rounded-xl p-4 mb-4">
                <p className="text-sm">Hi Divya 👋</p>
                <p className="text-sm text-muted-foreground mt-2">
                  You seem stressed today. Try a 5 minute breathing exercise. I also found 3 new opportunities matching your interests!
                </p>
              </div>
              <GlowButton size="sm" className="w-full">
                <Bot className="h-4 w-4" /> Chat with Guardian AI
              </GlowButton>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
