import { motion } from "framer-motion";
import { Users, Calendar, MessageCircle, BookOpen, Video } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";

const mentors = [
  { name: "Dr. Aarti Patel", role: "AI Research Lead, Google", specialty: "Machine Learning" },
  { name: "Sneha Reddy", role: "CEO, TechStartup Inc.", specialty: "Entrepreneurship" },
  { name: "Kavitha Nair", role: "VP Engineering, Microsoft", specialty: "Software Architecture" },
];

const MentorshipHub = () => (
  <DashboardLayout>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
        <Users className="h-7 w-7 text-primary" /> SheMentor
      </h1>
      <p className="text-muted-foreground mb-6">Connect with inspiring women mentors</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {mentors.map((m) => (
          <GlassCard key={m.name}>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-sm">{m.name}</h3>
            <p className="text-xs text-muted-foreground">{m.role}</p>
            <p className="text-xs text-primary mt-1">{m.specialty}</p>
            <GlowButton size="sm" className="w-full mt-3">Book Session</GlowButton>
          </GlassCard>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <GlassCard hover={false}>
          <Calendar className="h-5 w-5 text-secondary mb-2" />
          <h3 className="font-display font-semibold text-sm mb-1">Upcoming Sessions</h3>
          <p className="text-xs text-muted-foreground">You have 2 mentoring sessions this week.</p>
        </GlassCard>
        <GlassCard hover={false}>
          <MessageCircle className="h-5 w-5 text-primary mb-2" />
          <h3 className="font-display font-semibold text-sm mb-1">Discussion Forum</h3>
          <p className="text-xs text-muted-foreground">Join community discussions and get advice.</p>
        </GlassCard>
        <GlassCard hover={false}>
          <Video className="h-5 w-5 text-secondary mb-2" />
          <h3 className="font-display font-semibold text-sm mb-1">Live Webinars</h3>
          <p className="text-xs text-muted-foreground">Next: "Breaking into Tech" - March 12</p>
        </GlassCard>
      </div>
    </motion.div>
  </DashboardLayout>
);

export default MentorshipHub;
