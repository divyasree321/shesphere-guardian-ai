import { useState } from "react";
import { Bot, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

const defaultMessages = [
  { from: "ai" as const, text: "Hi Divya 👋 I'm Guardian AI, your personal assistant. How can I help you today?" },
];

const aiResponses: Record<string, string> = {
  safety: "Your safety score is 92%. Your regular route is currently safe. Would you like me to check a different route?",
  health: "All vitals look normal! Your next cycle is predicted around March 15. Remember to stay hydrated! 💧",
  career: "I found 3 new job matches for you. The top one is a Senior Data Analyst role at TechCorp. Want details?",
  stress: "I sense you might be feeling stressed. Try the 4-7-8 breathing technique: Inhale 4s, Hold 7s, Exhale 8s. 🧘",
  opportunity: "There are 5 new opportunities matching your profile: 2 jobs, 1 scholarship, 1 grant, and 1 hackathon!",
};

const getAIResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("safe")) return aiResponses.safety;
  if (lower.includes("health") || lower.includes("cycle")) return aiResponses.health;
  if (lower.includes("career") || lower.includes("job")) return aiResponses.career;
  if (lower.includes("stress") || lower.includes("anxious") || lower.includes("tired")) return aiResponses.stress;
  if (lower.includes("opportunity") || lower.includes("scholarship")) return aiResponses.opportunity;
  return "I'm here to help with safety, health, career, and opportunities. What would you like to know about?";
};

type Msg = { from: "ai" | "user"; text: string };

const GuardianAI = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(defaultMessages);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { from: "user" as const, text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "ai" as const, text: getAIResponse(userMsg) }]);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      >
        {open ? <X className="h-6 w-6 text-primary-foreground" /> : <Bot className="h-6 w-6 text-primary-foreground" />}
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass-card-strong overflow-hidden flex flex-col"
            style={{ maxHeight: "70vh" }}
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="font-display font-semibold text-sm">Guardian AI</p>
                <p className="text-xs text-muted-foreground">Your personal AI assistant</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 200, maxHeight: 400 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                      msg.from === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <Input
                placeholder="Ask Guardian AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                className="bg-muted/50 border-border/50 text-sm"
              />
              <button
                onClick={send}
                className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shrink-0"
              >
                <Send className="h-4 w-4 text-primary-foreground" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GuardianAI;
