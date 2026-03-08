import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Radar, Briefcase, GraduationCap, Award, Trophy, Clock, Bookmark, BookmarkCheck, Code, Users, Lightbulb, Filter } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const categories = [
  { id: "all", label: "All", icon: Radar },
  { id: "job", label: "Jobs", icon: Briefcase },
  { id: "internship", label: "Internships", icon: Briefcase },
  { id: "scholarship", label: "Scholarships", icon: GraduationCap },
  { id: "hackathon", label: "Hackathons", icon: Code },
  { id: "grant", label: "Grants", icon: Award },
  { id: "competition", label: "Competitions", icon: Trophy },
  { id: "fellowship", label: "Fellowships", icon: Users },
  { id: "workshop", label: "Workshops", icon: Lightbulb },
];

const opportunities = [
  { icon: Briefcase, type: "job", title: "Senior Data Analyst - Remote", org: "TechCorp", deadline: "March 20", desc: "Analyze large datasets, build dashboards, and drive data-informed decisions. 3+ years experience required.", eligibility: "B.Tech/M.Tech in CS/IT, 3+ years experience" },
  { icon: GraduationCap, type: "scholarship", title: "Women in STEM Scholarship", org: "Google", deadline: "March 25", desc: "Full scholarship for women pursuing STEM degrees. Covers tuition and living expenses.", eligibility: "Female students enrolled in STEM programs" },
  { icon: Award, type: "grant", title: "Startup Grant – ₹10 Lakhs", org: "NITI Aayog", deadline: "March 30", desc: "Government grant for women-led startups in technology and social impact sectors.", eligibility: "Women-led startups, registered in India" },
  { icon: Trophy, type: "competition", title: "Women Hackathon 2026", org: "Microsoft", deadline: "April 5", desc: "48-hour hackathon for women developers. Win prizes up to ₹5 Lakhs and mentorship.", eligibility: "Women developers, any experience level" },
  { icon: Briefcase, type: "internship", title: "AI Research Intern", org: "DeepMind", deadline: "April 10", desc: "6-month research internship in AI safety and alignment. Open to final-year students.", eligibility: "Final year B.Tech/M.Tech students" },
  { icon: Code, type: "hackathon", title: "SheHacks India 2026", org: "MLH", deadline: "April 15", desc: "India's largest women-only hackathon. Build innovative solutions in 36 hours.", eligibility: "Women & non-binary developers" },
  { icon: GraduationCap, type: "fellowship", title: "Tech Policy Fellowship", org: "NASSCOM", deadline: "April 20", desc: "12-month fellowship working on tech policy and digital governance.", eligibility: "Graduates with interest in tech policy" },
  { icon: Lightbulb, type: "workshop", title: "AI/ML Bootcamp", org: "IIIT Hyderabad", deadline: "March 28", desc: "Intensive 2-week bootcamp on machine learning and deep learning fundamentals.", eligibility: "Open to all with basic Python knowledge" },
  { icon: Award, type: "grant", title: "Social Impact Innovation Grant", org: "Infosys Foundation", deadline: "April 25", desc: "₹5 Lakhs grant for innovative solutions addressing women's safety and health.", eligibility: "Women entrepreneurs and innovators" },
  { icon: Briefcase, type: "job", title: "Frontend Developer", org: "Flipkart", deadline: "April 2", desc: "Build responsive web applications with React and TypeScript.", eligibility: "2+ years React experience" },
];

const OpportunitiesPage = () => {
  const { toast } = useToast();
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [selectedOpp, setSelectedOpp] = useState<typeof opportunities[0] | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return opportunities.filter(opp => {
      const matchCat = activeCategory === "all" || opp.type === activeCategory;
      const matchSearch = !searchQuery || opp.title.toLowerCase().includes(searchQuery.toLowerCase()) || opp.org.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleSave = (title: string) => {
    setSaved(prev => {
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
        <p className="text-muted-foreground mb-6">AI-curated opportunities — jobs, hackathons, scholarships & more</p>

        {/* Search & Stats */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Input placeholder="Search opportunities..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="bg-muted/50 flex-1" />
          <div className="bg-primary/10 rounded-xl px-4 py-2 flex items-center gap-2 shrink-0">
            <Radar className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">{filtered.length} Opportunities</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              <cat.icon className="h-3 w-3" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Opportunities List */}
        <div className="space-y-3">
          {filtered.map((opp, i) => (
            <motion.div key={opp.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="flex items-center gap-4 !p-4" onClick={() => setSelectedOpp(opp)}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <opp.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full capitalize">{opp.type}</span>
                  </div>
                  <h3 className="font-display font-semibold text-sm">{opp.title}</h3>
                  <p className="text-xs text-muted-foreground">{opp.org}</p>
                </div>
                <div className="text-right shrink-0 flex items-center gap-2">
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors" onClick={(e) => { e.stopPropagation(); toggleSave(opp.title); }}>
                    {saved.has(opp.title) ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4 text-muted-foreground" />}
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
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Radar className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No opportunities found for this filter.</p>
            </div>
          )}
        </div>

        {/* Opportunity Details Dialog */}
        <Dialog open={!!selectedOpp && !applyOpen} onOpenChange={() => setSelectedOpp(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">{selectedOpp?.title}</DialogTitle></DialogHeader>
            {selectedOpp && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full capitalize">{selectedOpp.type}</span>
                  <span className="text-xs text-muted-foreground">{selectedOpp.org}</span>
                </div>
                <p className="text-sm text-muted-foreground">{selectedOpp.desc}</p>
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-xs font-semibold mb-1">Eligibility</p>
                  <p className="text-xs text-muted-foreground">{selectedOpp.eligibility}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> Deadline: {selectedOpp.deadline}
                </div>
                <div className="flex gap-2">
                  <GlowButton className="flex-1" onClick={() => setApplyOpen(true)}>Apply Now</GlowButton>
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
              <div><Label className="text-sm">Full Name</Label><Input placeholder="Your name" className="mt-1 bg-muted/50" /></div>
              <div><Label className="text-sm">Email</Label><Input type="email" placeholder="you@example.com" className="mt-1 bg-muted/50" /></div>
              <div><Label className="text-sm">Why are you a good fit?</Label><Textarea placeholder="Tell us about yourself..." className="mt-1 bg-muted/50" rows={3} /></div>
              <div><Label className="text-sm">Upload Resume</Label><Input type="file" className="mt-1 bg-muted/50" /></div>
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
