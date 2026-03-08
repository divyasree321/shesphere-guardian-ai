import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, BookOpen, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const mentors = [
  "Dr. Aarti Patel - AI Research",
  "Sneha Reddy - Entrepreneurship",
  "Kavitha Nair - Software Architecture",
  "Wellness Expert - Mental Health",
];

const BookSessionPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [booked, setBooked] = useState(false);
  const [form, setForm] = useState({ mentor: "", topic: "", date: "", time: "" });

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    toast({ title: "Session Booked! ✅", description: `Your session with ${form.mentor || "a mentor"} is confirmed.` });
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  if (booked) {
    return (
      <DashboardLayout>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center justify-center min-h-[60vh]">
          <GlassCard hover={false} className="text-center max-w-md">
            <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold mb-2">Session Booked!</h2>
            <p className="text-muted-foreground mb-4">Your mentoring session has been confirmed. Redirecting to dashboard...</p>
          </GlassCard>
        </motion.div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
          <Calendar className="h-7 w-7 text-primary" /> Book a Session
        </h1>
        <p className="text-muted-foreground mb-6">Schedule a mentoring or wellness session</p>

        <div className="max-w-lg">
          <GlassCard hover={false}>
            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <Label className="text-sm">Mentor / Expert</Label>
                <Select onValueChange={(v) => setForm((p) => ({ ...p, mentor: v }))}>
                  <SelectTrigger className="mt-1 bg-muted/50 border-border/50">
                    <SelectValue placeholder="Select a mentor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mentors.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm">Session Topic</Label>
                <Input
                  placeholder="e.g. Career guidance, Startup advice, Wellness check"
                  className="mt-1 bg-muted/50 border-border/50"
                  value={form.topic}
                  onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm">Date</Label>
                  <Input
                    type="date"
                    className="mt-1 bg-muted/50 border-border/50"
                    value={form.date}
                    onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-sm">Time</Label>
                  <Input
                    type="time"
                    className="mt-1 bg-muted/50 border-border/50"
                    value={form.time}
                    onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                  />
                </div>
              </div>
              <GlowButton type="submit" className="w-full">
                <CheckCircle className="h-4 w-4" /> Confirm Booking
              </GlowButton>
            </form>
          </GlassCard>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default BookSessionPage;
