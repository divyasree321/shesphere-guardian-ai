import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, FileText, MessageSquare, Search, Map, TrendingUp, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import jsPDF from "jspdf";

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  title: string;
  summary: string;
  education: string;
  skills: string;
  experience: string;
  projects: string;
  certifications: string;
}

const emptyResume: ResumeData = { name: "", email: "", phone: "", title: "", summary: "", education: "", skills: "", experience: "", projects: "", certifications: "" };

const CareerHub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resumeOpen, setResumeOpen] = useState(false);
  const [interviewOpen, setInterviewOpen] = useState(false);
  const [resume, setResume] = useState<ResumeData>(emptyResume);
  const [resumeGenerated, setResumeGenerated] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ from: "ai" | "user"; text: string }[]>([
    { from: "ai", text: "Hi! I'm your AI interview coach. What role are you preparing for?" }
  ]);
  const [chatInput, setChatInput] = useState("");

  const interviewQuestions: Record<string, string[]> = {
    default: [
      "Tell me about a time you solved a complex problem. Walk me through your approach.",
      "What's your biggest professional achievement and why does it matter to you?",
      "How do you handle disagreements with team members?",
      "Where do you see yourself in 3 years?",
      "Describe a situation where you had to learn something quickly under pressure.",
    ],
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setChatMessages(p => [...p, { from: "user", text: userText }]);
    setChatInput("");
    setTimeout(() => {
      const questions = interviewQuestions.default;
      const qIndex = Math.floor(Math.random() * questions.length);
      const feedback = userText.length > 30
        ? `Good answer! Here's a tip: try to use the STAR method (Situation, Task, Action, Result) for even more impact.\n\nNext question: ${questions[qIndex]}`
        : `Could you elaborate more? Detailed answers show deeper thinking.\n\nLet me ask: ${questions[qIndex]}`;
      setChatMessages(p => [...p, { from: "ai", text: feedback }]);
    }, 1200);
  };

  const generateResumePDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    let y = margin;
    const lineHeight = 6;

    // Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(resume.name || "Your Name", margin, y);
    y += 8;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(resume.title || "Professional Title", margin, y);
    y += 6;
    doc.setFontSize(9);
    doc.text([resume.email, resume.phone].filter(Boolean).join(" | "), margin, y);
    y += 10;
    doc.setTextColor(0, 0, 0);

    // Divider
    doc.setDrawColor(140, 80, 200);
    doc.setLineWidth(0.5);
    doc.line(margin, y, 190, y);
    y += 8;

    const addSection = (title: string, content: string) => {
      if (!content.trim()) return;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(100, 50, 150);
      doc.text(title.toUpperCase(), margin, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(content, 170);
      lines.forEach((line: string) => {
        if (y > 270) { doc.addPage(); y = margin; }
        doc.text(line, margin, y);
        y += lineHeight;
      });
      y += 4;
    };

    if (resume.summary) addSection("Professional Summary", resume.summary);
    if (resume.experience) addSection("Experience", resume.experience);
    if (resume.education) addSection("Education", resume.education);
    if (resume.skills) addSection("Skills", resume.skills);
    if (resume.projects) addSection("Projects", resume.projects);
    if (resume.certifications) addSection("Certifications", resume.certifications);

    doc.save(`${resume.name || "resume"}_resume.pdf`);
    toast({ title: "📄 Resume Downloaded!", description: "Your PDF resume has been saved." });
  };

  const updateResume = (field: keyof ResumeData, value: string) => {
    setResume(prev => ({ ...prev, [field]: value }));
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
            <p className="text-xs text-muted-foreground mb-3">Create ATS-optimized resumes with PDF download.</p>
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
        <Dialog open={resumeOpen} onOpenChange={(o) => { setResumeOpen(o); if (!o) setResumeGenerated(false); }}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader><DialogTitle className="font-display">📄 AI Resume Builder</DialogTitle></DialogHeader>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Form */}
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">Full Name</Label>
                  <Input placeholder="Divya Sharma" className="mt-1 bg-muted/50" value={resume.name} onChange={e => updateResume("name", e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Email</Label>
                    <Input placeholder="divya@email.com" className="mt-1 bg-muted/50" value={resume.email} onChange={e => updateResume("email", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-xs">Phone</Label>
                    <Input placeholder="+91 98765 43210" className="mt-1 bg-muted/50" value={resume.phone} onChange={e => updateResume("phone", e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Target Job Title</Label>
                  <Input placeholder="Software Engineer" className="mt-1 bg-muted/50" value={resume.title} onChange={e => updateResume("title", e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs">Professional Summary</Label>
                  <Textarea placeholder="2-3 sentences about your expertise..." className="mt-1 bg-muted/50" rows={2} value={resume.summary} onChange={e => updateResume("summary", e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs">Education</Label>
                  <Textarea placeholder="B.Tech in Computer Science, IIT Delhi, 2024" className="mt-1 bg-muted/50" rows={2} value={resume.education} onChange={e => updateResume("education", e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs">Skills (comma separated)</Label>
                  <Input placeholder="Python, React, Machine Learning" className="mt-1 bg-muted/50" value={resume.skills} onChange={e => updateResume("skills", e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs">Experience</Label>
                  <Textarea placeholder="Company, Role, Duration, Key achievements..." className="mt-1 bg-muted/50" rows={3} value={resume.experience} onChange={e => updateResume("experience", e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs">Projects</Label>
                  <Textarea placeholder="Project name - description and tech used" className="mt-1 bg-muted/50" rows={2} value={resume.projects} onChange={e => updateResume("projects", e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs">Certifications</Label>
                  <Input placeholder="AWS Certified, Google Data Analytics" className="mt-1 bg-muted/50" value={resume.certifications} onChange={e => updateResume("certifications", e.target.value)} />
                </div>
                <GlowButton className="w-full" onClick={() => setResumeGenerated(true)}>
                  Preview Resume
                </GlowButton>
              </div>

              {/* Preview */}
              <div className="bg-background border border-border rounded-xl p-6 text-sm">
                {resumeGenerated ? (
                  <div className="space-y-3">
                    <div className="border-b-2 border-primary pb-3">
                      <h2 className="text-xl font-display font-bold">{resume.name || "Your Name"}</h2>
                      <p className="text-primary text-sm">{resume.title || "Professional Title"}</p>
                      <p className="text-xs text-muted-foreground">{[resume.email, resume.phone].filter(Boolean).join(" | ")}</p>
                    </div>
                    {resume.summary && <div><h4 className="font-display font-semibold text-primary text-xs uppercase tracking-wide mb-1">Summary</h4><p className="text-xs text-muted-foreground">{resume.summary}</p></div>}
                    {resume.experience && <div><h4 className="font-display font-semibold text-primary text-xs uppercase tracking-wide mb-1">Experience</h4><p className="text-xs text-muted-foreground whitespace-pre-line">{resume.experience}</p></div>}
                    {resume.education && <div><h4 className="font-display font-semibold text-primary text-xs uppercase tracking-wide mb-1">Education</h4><p className="text-xs text-muted-foreground">{resume.education}</p></div>}
                    {resume.skills && <div><h4 className="font-display font-semibold text-primary text-xs uppercase tracking-wide mb-1">Skills</h4><div className="flex flex-wrap gap-1">{resume.skills.split(",").map(s => <span key={s} className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full">{s.trim()}</span>)}</div></div>}
                    {resume.projects && <div><h4 className="font-display font-semibold text-primary text-xs uppercase tracking-wide mb-1">Projects</h4><p className="text-xs text-muted-foreground whitespace-pre-line">{resume.projects}</p></div>}
                    {resume.certifications && <div><h4 className="font-display font-semibold text-primary text-xs uppercase tracking-wide mb-1">Certifications</h4><p className="text-xs text-muted-foreground">{resume.certifications}</p></div>}
                    <GlowButton size="sm" className="w-full" onClick={generateResumePDF}>
                      <Download className="h-4 w-4" /> Download PDF
                    </GlowButton>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">Fill in the form and click Preview to see your resume</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Interview Practice Dialog */}
        <Dialog open={interviewOpen} onOpenChange={setInterviewOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle className="font-display">🎤 AI Interview Practice</DialogTitle></DialogHeader>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm whitespace-pre-line ${msg.from === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
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
