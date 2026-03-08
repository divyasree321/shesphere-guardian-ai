import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, Activity, Brain, Baby, Mic, Upload, BarChart3, Droplets, Moon, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

// Cycle tracking state
const CYCLE_LENGTH = 28;
const PERIOD_LENGTH = 5;

const phaseInfo: Record<string, { color: string; label: string; tip: string }> = {
  period: { color: "bg-destructive/20 text-destructive", label: "Menstrual Phase", tip: "Rest well and stay hydrated. Iron-rich foods like spinach and lentils help replenish." },
  follicular: { color: "bg-primary/20 text-primary", label: "Follicular Phase", tip: "Energy is rising! Great time for new projects and challenging workouts." },
  ovulation: { color: "bg-secondary/20 text-secondary", label: "Ovulation", tip: "Peak fertility window. You may feel more social and energetic." },
  luteal: { color: "bg-accent text-accent-foreground", label: "Luteal Phase", tip: "You may feel PMS symptoms. Magnesium-rich foods and gentle exercise help." },
};

function getPhase(day: number) {
  if (day <= PERIOD_LENGTH) return "period";
  if (day <= 13) return "follicular";
  if (day <= 16) return "ovulation";
  return "luteal";
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

const moods = ["😊 Happy", "😐 Neutral", "😔 Sad", "😰 Anxious", "😡 Frustrated", "😴 Tired", "🥰 Loving", "💪 Energetic"];
const symptoms = ["Cramps", "Headache", "Bloating", "Acne", "Fatigue", "Breast Tenderness", "Mood Swings", "Back Pain"];

const HealthHub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cycleOpen, setCycleOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [moodOpen, setMoodOpen] = useState(false);

  // Cycle tracker state
  const [lastPeriodStart] = useState(new Date(2026, 1, 25)); // Feb 25
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [selectedMoods, setSelectedMoods] = useState<Set<string>>(new Set());
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [waterIntake, setWaterIntake] = useState([4]);
  const [sleepHours, setSleepHours] = useState([7]);

  const cycleDay = useMemo(() => {
    const today = new Date();
    const diff = Math.floor((today.getTime() - lastPeriodStart.getTime()) / (1000 * 60 * 60 * 24));
    return ((diff % CYCLE_LENGTH) + CYCLE_LENGTH) % CYCLE_LENGTH + 1;
  }, [lastPeriodStart]);

  const currentPhase = getPhase(cycleDay);
  const nextPeriodDate = useMemo(() => {
    const d = new Date(lastPeriodStart);
    d.setDate(d.getDate() + CYCLE_LENGTH);
    while (d < new Date()) d.setDate(d.getDate() + CYCLE_LENGTH);
    return d;
  }, [lastPeriodStart]);

  // Calendar rendering
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const days: { day: number; phase: string | null }[] = [];

    for (let i = 0; i < firstDay; i++) days.push({ day: 0, phase: null });

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(viewYear, viewMonth, d);
      const diff = Math.floor((date.getTime() - lastPeriodStart.getTime()) / (1000 * 60 * 60 * 24));
      const cd = ((diff % CYCLE_LENGTH) + CYCLE_LENGTH) % CYCLE_LENGTH + 1;
      days.push({ day: d, phase: getPhase(cd) });
    }
    return days;
  }, [viewYear, viewMonth, lastPeriodStart]);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
          <Heart className="h-7 w-7 text-secondary" /> FemCare AI
        </h1>
        <p className="text-muted-foreground mb-6">AI-powered women's health monitoring</p>

        {/* Cycle Overview Banner */}
        <div className="bg-secondary/10 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-20 h-20 rounded-full border-4 border-secondary flex items-center justify-center">
            <div className="text-center">
              <p className="text-xl font-display font-bold">Day {cycleDay}</p>
              <p className="text-[10px] text-muted-foreground">of {CYCLE_LENGTH}</p>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${phaseInfo[currentPhase].color} mb-1`}>
              {phaseInfo[currentPhase].label}
            </span>
            <p className="text-sm text-muted-foreground">{phaseInfo[currentPhase].tip}</p>
            <p className="text-xs text-muted-foreground mt-1">Next period: <span className="font-semibold text-foreground">{nextPeriodDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span></p>
          </div>
          <GlowButton size="sm" onClick={() => setCycleOpen(true)}>Full Tracker</GlowButton>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <GlassCard onClick={() => setCycleOpen(true)}>
            <Activity className="h-5 w-5 text-secondary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Menstrual Cycle Tracker</h3>
            <p className="text-xs text-muted-foreground mb-3">Calendar view with cycle phases, predictions & fertility window.</p>
            <GlowButton size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); setCycleOpen(true); }}>Track Cycle</GlowButton>
          </GlassCard>

          <GlassCard onClick={() => setMoodOpen(true)}>
            <Brain className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Mood & Symptom Tracker</h3>
            <p className="text-xs text-muted-foreground mb-3">Log moods, symptoms, water intake, and sleep quality.</p>
            <GlowButton size="sm" className="w-full" variant="secondary" onClick={(e) => { e.stopPropagation(); setMoodOpen(true); }}>Log Today</GlowButton>
          </GlassCard>

          <GlassCard onClick={() => navigate("/dashboard/wellness")}>
            <Brain className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Mental Wellness Tracker</h3>
            <p className="text-xs text-muted-foreground mb-3">Monitor stress levels, mood patterns, and get personalized wellness tips.</p>
            <GlowButton size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); navigate("/dashboard/wellness"); }}>Go to Wellness</GlowButton>
          </GlassCard>

          <GlassCard onClick={() => setUploadOpen(true)}>
            <Upload className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Upload Medical Report</h3>
            <p className="text-xs text-muted-foreground mb-3">AI analyzes your medical reports for insights.</p>
            <GlowButton size="sm" variant="outline" className="w-full" onClick={(e) => { e.stopPropagation(); setUploadOpen(true); }}>Upload Report</GlowButton>
          </GlassCard>

          <GlassCard onClick={() => setInsightsOpen(true)}>
            <BarChart3 className="h-5 w-5 text-secondary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Health Insights</h3>
            <p className="text-xs text-muted-foreground mb-3">View AI-generated health analysis and recommendations.</p>
            <GlowButton size="sm" className="w-full" variant="secondary" onClick={(e) => { e.stopPropagation(); setInsightsOpen(true); }}>View Insights</GlowButton>
          </GlassCard>

          <GlassCard>
            <Baby className="h-5 w-5 text-secondary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Pregnancy Health Tips</h3>
            <p className="text-xs text-muted-foreground">Trimester-specific guidance, nutrition, and wellness advice.</p>
          </GlassCard>
        </div>

        {/* Full Cycle Tracker Dialog */}
        <Dialog open={cycleOpen} onOpenChange={setCycleOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle className="font-display">🌸 Cycle Tracker</DialogTitle></DialogHeader>
            <div className="space-y-4">
              {/* Month Navigation */}
              <div className="flex items-center justify-between">
                <button onClick={() => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); }} className="p-1 hover:bg-muted rounded-lg"><ChevronLeft className="h-5 w-5" /></button>
                <p className="font-display font-semibold">{monthNames[viewMonth]} {viewYear}</p>
                <button onClick={() => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); }} className="p-1 hover:bg-muted rounded-lg"><ChevronRight className="h-5 w-5" /></button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                  <div key={d} className="font-semibold text-muted-foreground py-1">{d}</div>
                ))}
                {calendarDays.map((item, i) => (
                  <div key={i} className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                    item.day === 0 ? "" :
                    item.phase === "period" ? "bg-destructive/20 text-destructive" :
                    item.phase === "ovulation" ? "bg-secondary/20 text-secondary" :
                    item.phase === "follicular" ? "bg-primary/10 text-primary" :
                    "bg-accent/50 text-accent-foreground"
                  } ${item.day === new Date().getDate() && viewMonth === new Date().getMonth() && viewYear === new Date().getFullYear() ? "ring-2 ring-primary" : ""}`}>
                    {item.day || ""}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-destructive/30" /> Period</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-primary/20" /> Follicular</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-secondary/30" /> Ovulation</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-accent" /> Luteal</span>
              </div>

              {/* Phase Details */}
              <div className={`rounded-xl p-3 ${phaseInfo[currentPhase].color}`}>
                <p className="font-semibold text-sm">{phaseInfo[currentPhase].label} — Day {cycleDay}</p>
                <p className="text-xs mt-1 opacity-80">{phaseInfo[currentPhase].tip}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-muted rounded-xl p-2">
                  <p className="text-xs text-muted-foreground">Next Period</p>
                  <p className="font-semibold text-sm">{nextPeriodDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                </div>
                <div className="bg-muted rounded-xl p-2">
                  <p className="text-xs text-muted-foreground">Cycle Length</p>
                  <p className="font-semibold text-sm">{CYCLE_LENGTH} days</p>
                </div>
                <div className="bg-muted rounded-xl p-2">
                  <p className="text-xs text-muted-foreground">Period Length</p>
                  <p className="font-semibold text-sm">{PERIOD_LENGTH} days</p>
                </div>
              </div>

              <GlowButton className="w-full" onClick={() => { setCycleOpen(false); toast({ title: "Cycle Updated ✅" }); }}>Log Period Start</GlowButton>
            </div>
          </DialogContent>
        </Dialog>

        {/* Mood & Symptom Tracker Dialog */}
        <Dialog open={moodOpen} onOpenChange={setMoodOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle className="font-display">Daily Health Log</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2">How are you feeling?</p>
                <div className="grid grid-cols-4 gap-2">
                  {moods.map(m => (
                    <button key={m} onClick={() => setSelectedMoods(prev => { const n = new Set(prev); n.has(m) ? n.delete(m) : n.add(m); return n; })}
                      className={`p-2 rounded-xl text-xs transition-colors ${selectedMoods.has(m) ? "bg-primary/20 ring-1 ring-primary" : "bg-muted hover:bg-muted/80"}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Symptoms</p>
                <div className="flex flex-wrap gap-2">
                  {symptoms.map(s => (
                    <button key={s} onClick={() => setSelectedSymptoms(prev => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n; })}
                      className={`px-3 py-1 rounded-full text-xs transition-colors ${selectedSymptoms.has(s) ? "bg-secondary/20 ring-1 ring-secondary" : "bg-muted hover:bg-muted/80"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold">Water Intake: {waterIntake[0]} glasses</p>
                </div>
                <Slider value={waterIntake} onValueChange={setWaterIntake} max={12} min={0} step={1} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Moon className="h-4 w-4 text-secondary" />
                  <p className="text-sm font-semibold">Sleep: {sleepHours[0]} hours</p>
                </div>
                <Slider value={sleepHours} onValueChange={setSleepHours} max={12} min={0} step={0.5} />
              </div>

              <GlowButton className="w-full" onClick={() => { setMoodOpen(false); toast({ title: "✅ Daily Log Saved", description: "Your health data has been recorded." }); }}>
                Save Log
              </GlowButton>
            </div>
          </DialogContent>
        </Dialog>

        {/* Upload Dialog */}
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">Upload Medical Report</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Drop your report here or click to browse</p>
                <Input type="file" className="mt-3" />
              </div>
              <GlowButton className="w-full" onClick={() => { setUploadOpen(false); toast({ title: "Report Uploaded ✅", description: "AI is analyzing your report..." }); }}>Analyze Report</GlowButton>
            </div>
          </DialogContent>
        </Dialog>

        {/* Insights Dialog */}
        <Dialog open={insightsOpen} onOpenChange={setInsightsOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">AI Health Insights</DialogTitle></DialogHeader>
            <div className="space-y-3">
              {[
                { label: "Overall Health", value: "Good", color: "text-secondary" },
                { label: "Iron Levels", value: "Normal", color: "text-secondary" },
                { label: "Vitamin D", value: "Low – Supplement recommended", color: "text-destructive" },
                { label: "Stress Level", value: "Moderate", color: "text-primary" },
                { label: "Sleep Quality", value: "7.2 hrs avg", color: "text-secondary" },
                { label: "Cycle Regularity", value: "Regular (28 days)", color: "text-secondary" },
                { label: "Hydration", value: "Needs improvement", color: "text-destructive" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center bg-muted rounded-xl p-3">
                  <span className="text-sm">{item.label}</span>
                  <span className={`text-sm font-semibold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
};

export default HealthHub;
