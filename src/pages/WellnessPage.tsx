import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Smile, Wind, Calendar, Headphones, Heart, BarChart3, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const weeklyStressData = [
  { day: "Mon", stress: 35, sleep: 7 },
  { day: "Tue", stress: 45, sleep: 6.5 },
  { day: "Wed", stress: 60, sleep: 5 },
  { day: "Thu", stress: 50, sleep: 6 },
  { day: "Fri", stress: 40, sleep: 7.5 },
  { day: "Sat", stress: 25, sleep: 8 },
  { day: "Sun", stress: 30, sleep: 8 },
];

function getStressLevel(score: number) {
  if (score <= 25) return { label: "Low", color: "text-secondary", bg: "bg-secondary/10", emoji: "😌", suggestion: "You're doing great! Keep up your healthy habits." };
  if (score <= 50) return { label: "Moderate", color: "text-primary", bg: "bg-primary/10", emoji: "😐", suggestion: "Try a 5-minute breathing exercise and a short walk." };
  if (score <= 75) return { label: "High", color: "text-destructive", bg: "bg-destructive/10", emoji: "😰", suggestion: "Take a break. Try the 4-7-8 breathing technique. Consider speaking to someone." };
  return { label: "Critical", color: "text-destructive", bg: "bg-destructive/20", emoji: "🆘", suggestion: "Please prioritize your wellbeing. Talk to a trusted person or call a helpline." };
}

const WellnessPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [meditating, setMeditating] = useState(false);
  const [breathingStep, setBreathingStep] = useState(0);
  const [stressOpen, setStressOpen] = useState(false);
  const [stressResult, setStressResult] = useState<null | number>(null);

  // Stress check inputs
  const [moodScore, setMoodScore] = useState([5]);
  const [sleepScore, setSleepScore] = useState([7]);
  const [workloadScore, setWorkloadScore] = useState([5]);
  const [anxietyScore, setAnxietyScore] = useState([3]);

  const startMeditation = () => {
    setMeditating(true);
    toast({ title: "🧘 Meditation Started", description: "Take deep breaths. Focus on the present moment." });
    setTimeout(() => setMeditating(false), 10000);
  };

  const startBreathing = () => {
    setBreathingStep(1);
    // 4-7-8 cycle
    setTimeout(() => setBreathingStep(2), 4000);
    setTimeout(() => setBreathingStep(3), 11000);
    setTimeout(() => { setBreathingStep(0); toast({ title: "✅ Breathing exercise complete!" }); }, 19000);
  };

  const calculateStress = () => {
    // Weighted average: low mood = high stress, low sleep = high stress, high workload/anxiety = high stress
    const score = Math.round(
      ((10 - moodScore[0]) * 20 + (8 - sleepScore[0]) * 15 + workloadScore[0] * 15 + anxietyScore[0] * 15) / 4
    );
    setStressResult(Math.min(100, Math.max(0, score)));
  };

  const stressInfo = stressResult !== null ? getStressLevel(stressResult) : null;

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
          <Brain className="h-7 w-7 text-secondary" /> Wellness Center
        </h1>
        <p className="text-muted-foreground mb-6">Mental health, stress analysis, and emotional well-being</p>

        {/* Weekly Stress Graph */}
        <GlassCard hover={false} className="mb-6">
          <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" /> Weekly Stress & Sleep Overview
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyStressData}>
                <defs>
                  <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(270, 70%, 55%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(270, 70%, 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(270, 20%, 90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="stress" stroke="hsl(270, 70%, 55%)" fill="url(#stressGrad)" name="Stress %" />
                <Line type="monotone" dataKey="sleep" stroke="hsl(320, 60%, 60%)" strokeWidth={2} dot={{ r: 3 }} name="Sleep (hrs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Stress Check Card */}
          <GlassCard glow onClick={() => setStressOpen(true)}>
            <AlertCircle className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Check My Stress Level</h3>
            <p className="text-xs text-muted-foreground mb-3">AI-powered stress analysis based on your mood, sleep, and workload.</p>
            <GlowButton size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); setStressOpen(true); }}>
              Check Now
            </GlowButton>
          </GlassCard>

          <GlassCard onClick={startMeditation}>
            <Headphones className="h-5 w-5 text-secondary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Guided Meditation</h3>
            <p className="text-xs text-muted-foreground mb-3">Mindfulness and relaxation sessions.</p>
            {meditating ? (
              <div className="bg-secondary/10 rounded-xl p-3 text-center">
                <Wind className="h-8 w-8 text-secondary mx-auto animate-pulse mb-2" />
                <p className="text-xs font-semibold text-secondary">Breathe in... Breathe out...</p>
              </div>
            ) : (
              <GlowButton size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); startMeditation(); }}>Begin Session</GlowButton>
            )}
          </GlassCard>

          <GlassCard>
            <Wind className="h-5 w-5 text-secondary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Breathing Exercise</h3>
            <p className="text-xs text-muted-foreground mb-3">4-7-8 technique for instant calm.</p>
            {breathingStep > 0 ? (
              <div className="bg-primary/10 rounded-xl p-3 text-center">
                <p className="text-lg font-display font-bold text-primary">
                  {breathingStep === 1 ? "Inhale... (4s)" : breathingStep === 2 ? "Hold... (7s)" : "Exhale... (8s)"}
                </p>
              </div>
            ) : (
              <GlowButton size="sm" variant="outline" className="w-full" onClick={startBreathing}>Start Breathing</GlowButton>
            )}
          </GlassCard>

          <GlassCard onClick={() => navigate("/dashboard/book-session")}>
            <Calendar className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Book Wellness Session</h3>
            <p className="text-xs text-muted-foreground mb-3">Schedule a session with a wellness expert.</p>
            <GlowButton size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); navigate("/dashboard/book-session"); }}>Book Now</GlowButton>
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

        {/* Stress Check Dialog */}
        <Dialog open={stressOpen} onOpenChange={(o) => { setStressOpen(o); if (!o) setStressResult(null); }}>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle className="font-display">🧠 Stress Level Check</DialogTitle></DialogHeader>
            <div className="space-y-5">
              {stressResult === null ? (
                <>
                  <div>
                    <p className="text-sm font-semibold mb-2">Mood (1 = Very Bad, 10 = Great): <span className="text-primary">{moodScore[0]}</span></p>
                    <Slider value={moodScore} onValueChange={setMoodScore} max={10} min={1} step={1} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">Sleep Hours: <span className="text-primary">{sleepScore[0]}</span></p>
                    <Slider value={sleepScore} onValueChange={setSleepScore} max={12} min={0} step={0.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">Workload (1 = Light, 10 = Overwhelming): <span className="text-primary">{workloadScore[0]}</span></p>
                    <Slider value={workloadScore} onValueChange={setWorkloadScore} max={10} min={1} step={1} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">Anxiety Level (1 = Calm, 10 = Very Anxious): <span className="text-primary">{anxietyScore[0]}</span></p>
                    <Slider value={anxietyScore} onValueChange={setAnxietyScore} max={10} min={1} step={1} />
                  </div>
                  <GlowButton className="w-full" onClick={calculateStress}>Check My Stress Level</GlowButton>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-5xl">{stressInfo!.emoji}</div>
                  <div>
                    <p className="text-sm text-muted-foreground">Your Stress Score</p>
                    <p className={`text-4xl font-display font-bold ${stressInfo!.color}`}>{stressResult}%</p>
                    <span className={`inline-block mt-1 text-xs font-semibold px-3 py-1 rounded-full ${stressInfo!.bg} ${stressInfo!.color}`}>
                      {stressInfo!.label}
                    </span>
                  </div>
                  <div className={`rounded-xl p-3 ${stressInfo!.bg}`}>
                    <p className="text-sm">{stressInfo!.suggestion}</p>
                  </div>
                  <div className="flex gap-2">
                    <GlowButton variant="outline" className="flex-1" onClick={() => setStressResult(null)}>Retake</GlowButton>
                    <GlowButton className="flex-1" onClick={() => { setStressOpen(false); setStressResult(null); }}>Done</GlowButton>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
};

export default WellnessPage;
