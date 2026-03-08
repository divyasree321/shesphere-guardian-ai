import { useState } from "react";
import { motion } from "framer-motion";
import { Radar, Briefcase, GraduationCap, Award, Trophy, Clock, Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const opportunities = [
  { icon: Briefcase, type: "Job", title: "Senior Data Analyst - Remote", org: "TechCorp", deadline: "March 20", desc: "Analyze large datasets, build dashboards, and drive data-informed decisions. 3+ years experience required." },
  { icon: GraduationCap, type: "Scholarship", title: "Women in STEM Scholarship", org: "Google", deadline: "March 25", desc: "Full scholarship for women pursuing STEM degrees. Covers tuition and living expenses." },
  { icon: Award, type: "Grant", title: "Startup Grant – ₹10 Lakhs", org: "NITI Aayog", deadline: "March 30", desc: "Government grant for women-led startups in technology and social impact sectors." },
  { icon: Trophy, type: "Competition", title: "Women Hackathon 2026", org: "Microsoft", deadline: "April 5", desc: "48-hour hackathon for women developers. Win prizes up to ₹5 Lakhs and mentorship." },
  { icon: Briefcase, type: "Internship", title: "AI Research Intern", org: "DeepMind", deadline: "April 10", desc: "6-month research internship in AI safety and alignment. Open to final-year students." },
];

const OpportunitiesPage = () => {
  const { toast } = useToast();
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [selectedOpp, setSelectedOpp] = useState<typeof opportunities[0] | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);

  const toggleSave = (title: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(title)) { next.delete(title); toast({ title: "Removed from saved" }); }
      else { next.add(title); toast({ title: "💾 Saved!", description: "Added to your saved list." }); }
      return next;
    });
  };

  return (
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
            <motion.div key={opp.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <GlassCard className="flex items-center gap-4 !p-4" onClick={() => setSelectedOpp(opp)}>
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
                <div className="text-right shrink-0 flex items-center gap-2">
                  <button
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    onClick={(e) => { e.stopPropagation(); toggleSave(opp.title); }}
                  >
                    {saved.has(opp.title)
                      ? <BookmarkCheck className="h-4 w-4 text-primary" />
                      : <Bookmark className="h-4 w-4 text-muted-foreground" />
                    }
                  </button>
                  <div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <Clock className="h-3 w-3" /> {opp.deadline}
                    </div>
                    <GlowButton size="sm" onClick={(e) => { e.stopPropagation(); setApplyOpen(true); setSelectedOpp(opp); }}>Apply</GlowButton>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Opportunity Details Dialog */}
        <Dialog open={!!selectedOpp && !applyOpen} onOpenChange={() => setSelectedOpp(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">{selectedOpp?.title}</DialogTitle></DialogHeader>
            {selectedOpp && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{selectedOpp.type}</span>
                  <span className="text-xs text-muted-foreground">{selectedOpp.org}</span>
                </div>
                <p className="text-sm text-muted-foreground">{selectedOpp.desc}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> Deadline: {selectedOpp.deadline}
                </div>
                <div className="flex gap-2">
                  <GlowButton className="flex-1" onClick={() => { setApplyOpen(true); }}>Apply Now</GlowButton>
                  <GlowButton variant="outline" className="flex-1" onClick={() => { toggleSave(selectedOpp.title); setSelectedOpp(null); }}>
                    {saved.has(selectedOpp.title) ? "Unsave" : "Save"}
                  </GlowButton>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Apply Dialog */}
        <Dialog open={applyOpen} onOpenChange={setApplyOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">Apply: {selectedOpp?.title}</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div>
                <Label className="text-sm">Full Name</Label>
                <Input placeholder="Your name" className="mt-1 bg-muted/50" />
              </div>
              <div>
                <Label className="text-sm">Email</Label>
                <Input type="email" placeholder="you@example.com" className="mt-1 bg-muted/50" />
              </div>
              <div>
                <Label className="text-sm">Why are you a good fit?</Label>
                <Textarea placeholder="Tell us about yourself..." className="mt-1 bg-muted/50" rows={3} />
              </div>
              <div>
                <Label className="text-sm">Upload Resume</Label>
                <Input type="file" className="mt-1 bg-muted/50" />
              </div>
              <GlowButton className="w-full" onClick={() => { setApplyOpen(false); setSelectedOpp(null); toast({ title: "🎉 Application Submitted!", description: "Good luck! We'll notify you of updates." }); }}>
                Submit Application
              </GlowButton>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
};

export default OpportunitiesPage;
