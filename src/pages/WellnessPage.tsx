import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Smile, Wind, Calendar, Headphones, Heart } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";

const WellnessPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [meditating, setMeditating] = useState(false);
  const [moodOpen, setMoodOpen] = useState(false);

  const startMeditation = () => {
    setMeditating(true);
    toast({ title: "🧘 Meditation Started", description: "Take deep breaths. Focus on the present moment." });
    setTimeout(() => setMeditating(false), 5000);
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
          <Brain className="h-7 w-7 text-secondary" /> Wellness Center
        </h1>
        <p className="text-muted-foreground mb-6">Mental health, meditation, and emotional well-being</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <GlassCard onClick={startMeditation}>
            <Headphones className="h-5 w-5 text-secondary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Start Meditation</h3>
            <p className="text-xs text-muted-foreground mb-3">Guided breathing and mindfulness exercises.</p>
            {meditating ? (
              <div className="bg-secondary/10 rounded-xl p-3 text-center">
                <Wind className="h-8 w-8 text-secondary mx-auto animate-pulse mb-2" />
                <p className="text-xs font-semibold text-secondary">Breathe in... Breathe out...</p>
              </div>
            ) : (
              <GlowButton size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); startMeditation(); }}>
                Begin Session
              </GlowButton>
            )}
          </GlassCard>

          <Dialog open={moodOpen} onOpenChange={setMoodOpen}>
            <DialogTrigger asChild>
              <GlassCard>
                <Smile className="h-5 w-5 text-primary mb-3" />
                <h3 className="font-display font-semibold text-sm mb-2">Stress Check</h3>
                <p className="text-xs text-muted-foreground mb-3">Analyze your current mood and stress levels.</p>
                <GlowButton size="sm" className="w-full" variant="secondary" onClick={(e) => { e.stopPropagation(); setMoodOpen(true); }}>
                  Check Now
                </GlowButton>
              </GlassCard>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">How are you feeling today?</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-3 py-4">
                {["😊 Happy", "😐 Neutral", "😔 Sad", "😰 Anxious", "😡 Frustrated", "😴 Tired"].map((mood) => (
                  <button
                    key={mood}
                    className="p-3 rounded-xl bg-muted hover:bg-primary/10 transition-colors text-sm font-medium"
                    onClick={() => {
                      setMoodOpen(false);
                      toast({ title: "Mood Logged ✅", description: "We'll tailor your wellness suggestions accordingly." });
                    }}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <GlassCard onClick={() => navigate("/dashboard/book-session")}>
            <Calendar className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Book Wellness Session</h3>
            <p className="text-xs text-muted-foreground mb-3">Schedule a session with a wellness expert.</p>
            <GlowButton size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); navigate("/dashboard/book-session"); }}>
              Book Now
            </GlowButton>
          </GlassCard>

          <GlassCard>
            <Wind className="h-5 w-5 text-secondary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Breathing Exercises</h3>
            <p className="text-xs text-muted-foreground">4-7-8 breathing technique for instant calm.</p>
            <div className="bg-secondary/10 rounded-xl p-3 mt-3">
              <p className="text-xs text-muted-foreground">Inhale 4s → Hold 7s → Exhale 8s</p>
            </div>
          </GlassCard>

          <GlassCard>
            <Heart className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Self-Care Journal</h3>
            <p className="text-xs text-muted-foreground">Track your daily gratitude and self-care activities.</p>
          </GlassCard>

          <GlassCard>
            <Brain className="h-5 w-5 text-secondary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">AI Wellness Insights</h3>
            <div className="bg-primary/10 rounded-xl p-3 mt-2">
              <p className="text-xs text-muted-foreground">Stress level: <span className="font-bold text-foreground">Low</span></p>
              <p className="text-xs text-muted-foreground">Sleep quality: <span className="font-bold text-foreground">Good</span></p>
              <p className="text-xs text-muted-foreground">Mood trend: <span className="font-bold text-secondary">Improving ↑</span></p>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default WellnessPage;
