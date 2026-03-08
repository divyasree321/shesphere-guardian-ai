import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Calendar, MessageCircle, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const mentors = [
  { name: "Dr. Aarti Patel", role: "AI Research Lead, Google", specialty: "Machine Learning", bio: "15+ years in AI research. Published 40+ papers. Passionate about mentoring women in tech." },
  { name: "Sneha Reddy", role: "CEO, TechStartup Inc.", specialty: "Entrepreneurship", bio: "Serial entrepreneur. Raised ₹50Cr+ in funding. Mentored 200+ women founders." },
  { name: "Kavitha Nair", role: "VP Engineering, Microsoft", specialty: "Software Architecture", bio: "20 years building scalable systems. Led teams of 100+. Advocate for women in engineering." },
];

const MentorshipHub = () => {
  const navigate = useNavigate();
  const [selectedMentor, setSelectedMentor] = useState<typeof mentors[0] | null>(null);

  return (
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
              <div className="flex gap-2 mt-3">
                <GlowButton size="sm" variant="outline" className="flex-1" onClick={() => setSelectedMentor(m)}>View Profile</GlowButton>
                <GlowButton size="sm" className="flex-1" onClick={() => navigate("/dashboard/book-session")}>Book Session</GlowButton>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <GlassCard hover={false}>
            <Calendar className="h-5 w-5 text-secondary mb-2" />
            <h3 className="font-display font-semibold text-sm mb-1">Upcoming Sessions</h3>
            <p className="text-xs text-muted-foreground">You have 2 mentoring sessions this week.</p>
          </GlassCard>
          <GlassCard onClick={() => navigate("/dashboard/community")}>
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

        {/* Mentor Profile Dialog */}
        <Dialog open={!!selectedMentor} onOpenChange={() => setSelectedMentor(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">{selectedMentor?.name}</DialogTitle></DialogHeader>
            {selectedMentor && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{selectedMentor.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedMentor.role}</p>
                    <p className="text-sm text-primary">{selectedMentor.specialty}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{selectedMentor.bio}</p>
                <GlowButton className="w-full" onClick={() => { setSelectedMentor(null); navigate("/dashboard/book-session"); }}>
                  Book a Session
                </GlowButton>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
};

export default MentorshipHub;
