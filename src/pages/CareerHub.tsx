import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, FileText, MessageSquare, Search, Map, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CareerHub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resumeOpen, setResumeOpen] = useState(false);
  const [interviewOpen, setInterviewOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: "ai" as const, text: "Hi! I'm your AI interview coach. What role are you preparing for?" }
  ]);
  const [chatInput, setChatInput] = useState("");

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages((p) => [...p, { from: "user" as const, text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((p) => [...p, {
        from: "ai" as const,
        text: "Great! Let me ask you a common interview question: Tell me about a time you solved a complex problem. How did you approach it?"
      }]);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
          <Briefcase className="h-7 w-7 text-primary" /> SkillRise AI
        </h1>
        <p className="text-muted-foreground mb-6">Career growth support powered by AI</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <GlassCard onClick={() => setResumeOpen(true)}>
            <FileText className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">AI Resume Builder</h3>
            <p className="text-xs text-muted-foreground mb-3">Create ATS-optimized resumes tailored to your target roles.</p>
            <GlowButton size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); setResumeOpen(true); }}>Generate Resume</GlowButton>
          </GlassCard>

          <GlassCard onClick={() => setInterviewOpen(true)}>
            <MessageSquare className="h-5 w-5 text-secondary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Interview Practice</h3>
            <p className="text-xs text-muted-foreground mb-3">Practice with an AI chatbot that simulates real interviews.</p>
            <GlowButton variant="secondary" size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); setInterviewOpen(true); }}>Practice Interview</GlowButton>
          </GlassCard>

          <GlassCard onClick={() => navigate("/dashboard/opportunities")}>
            <Search className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-2">Remote Job Finder</h3>
            <p className="text-xs text-muted-foreground mb-3">Discover remote opportunities matching your skills.</p>
            <GlowButton size="sm" variant="outline" className="w-full" onClick={(e) => { e.stopPropagation(); navigate("/dashboard/opportunities"); }}>View Jobs</GlowButton>
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

        {/* Resume Builder Dialog */}
        <Dialog open={resumeOpen} onOpenChange={setResumeOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle className="font-display">AI Resume Builder</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Target Job Title" className="bg-muted/50" />
              <Input placeholder="Key Skills (comma separated)" className="bg-muted/50" />
              <Textarea placeholder="Brief about your experience..." className="bg-muted/50" rows={3} />
              <GlowButton className="w-full" onClick={() => { setResumeOpen(false); toast({ title: "📄 Resume Generated!", description: "Your AI-optimized resume is ready." }); }}>
                Generate Resume
              </GlowButton>
            </div>
          </DialogContent>
        </Dialog>

        {/* Interview Practice Dialog */}
        <Dialog open={interviewOpen} onOpenChange={setInterviewOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle className="font-display">AI Interview Practice</DialogTitle></DialogHeader>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${msg.from === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input placeholder="Your answer..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} className="bg-muted/50" />
              <GlowButton size="sm" onClick={sendChat}>Send</GlowButton>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
};

export default CareerHub;
