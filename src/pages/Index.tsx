import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Heart, Briefcase, Rocket, Users, Lock,
  Radar, Bot, Star, ArrowRight, ChevronRight,
  UserPlus, Lightbulb, TrendingUp, Globe,
  Twitter, Instagram, Linkedin, Facebook
} from "lucide-react";
import RotatingBackground from "@/components/RotatingBackground";
import GlowButton from "@/components/GlowButton";
import GlassCard from "@/components/GlassCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }),
};

const stats = [
  { value: "1M+", label: "Women Empowered" },
  { value: "2000+", label: "Mentors" },
  { value: "500+", label: "Opportunities Daily" },
  { value: "50+", label: "Countries" },
];

const features = [
  { icon: Shield, title: "Women Safety Intelligence", desc: "AI-powered safety scoring, safe routes, and emergency SOS with real-time alerts.", color: "text-primary" },
  { icon: Heart, title: "AI Health Companion", desc: "Menstrual tracking, health predictions, mental wellness monitoring, and personalized tips.", color: "text-secondary" },
  { icon: Briefcase, title: "Career Growth AI", desc: "Resume builder, interview practice, job finder, and career trajectory predictions.", color: "text-primary" },
  { icon: Rocket, title: "Startup Support", desc: "Idea validation, pitch deck generator, funding finder, and investor matchmaking.", color: "text-secondary" },
  { icon: Users, title: "Mentorship Network", desc: "AI-powered mentor matching, live sessions, community forums, and skill workshops.", color: "text-primary" },
  { icon: Lock, title: "Digital Protection", desc: "Harassment detection, deepfake alerts, scam prevention, and legal resources.", color: "text-secondary" },
];

const steps = [
  { icon: UserPlus, title: "Create Your Profile", desc: "Set up your personalized profile with career interests and safety preferences." },
  { icon: Lightbulb, title: "Get Personalized Insights", desc: "Our AI analyzes your data to provide tailored recommendations." },
  { icon: Radar, title: "Discover Opportunities", desc: "Jobs, scholarships, grants, and competitions curated just for you." },
  { icon: TrendingUp, title: "Grow with the Community", desc: "Connect with mentors, share achievements, and support each other." },
];

const testimonials = [
  { name: "Priya Sharma", role: "Software Engineer", text: "SheSphere AI helped me navigate career growth with personalized recommendations. The safety features give me peace of mind daily." },
  { name: "Ananya Gupta", role: "Startup Founder", text: "The pitch deck generator and investor matchmaking changed my fundraising journey. I secured ₹50L in seed funding!" },
  { name: "Maya Johnson", role: "Data Scientist", text: "The mentorship network connected me with incredible women leaders who guided my career transition." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-card-strong rounded-none border-x-0 border-t-0">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="h-7 w-7 text-primary" />
            <span className="font-display text-xl font-bold gradient-text">SheSphere AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Features</a>
            <a href="#how" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">How It Works</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <GlowButton variant="outline" size="sm">Login</GlowButton>
            </Link>
            <Link to="/signup">
              <GlowButton size="sm">Sign Up</GlowButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <RotatingBackground overlay="hero" className="min-h-screen flex items-center pt-16">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6 text-sm text-primary-foreground/80">
              <Bot className="h-4 w-4" />
              <span>AI-Powered Women Empowerment Platform</span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6">
              Empowering Every Woman{" "}
              <span className="gradient-text">
                with AI
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Safety. Health. Career. Opportunity. All in one intelligent platform designed to empower women across every dimension of life.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <GlowButton size="lg">
                  Get Started <ArrowRight className="h-5 w-5" />
                </GlowButton>
              </Link>
              <Link to="/login">
                <GlowButton variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Explore Features
                </GlowButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </RotatingBackground>

      {/* Stats */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl md:text-5xl font-display font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              One Platform, <span className="gradient-text">Infinite Possibilities</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Six powerful AI modules designed to support every aspect of a woman's life.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="h-full">
                  <f.icon className={`h-10 w-10 ${f.color} mb-4`} />
                  <h3 className="text-lg font-display font-semibold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              How <span className="gradient-text">SheSphere AI</span> Works
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <s.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-xs font-bold text-primary mb-2">STEP {i + 1}</div>
                <h3 className="font-display font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Voices of <span className="gradient-text">Empowerment</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">"{t.text}"</p>
                  <div>
                    <div className="font-display font-semibold text-sm">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.role}</div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <RotatingBackground overlay="hero" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to Transform Your Journey?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Join over a million women who are already using SheSphere AI to build safer, healthier, and more successful lives.
            </p>
            <Link to="/signup">
              <GlowButton size="lg">
                Join SheSphere AI <ChevronRight className="h-5 w-5" />
              </GlowButton>
            </Link>
          </motion.div>
        </div>
      </RotatingBackground>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-6 w-6 text-primary" />
                <span className="font-display text-lg font-bold gradient-text">SheSphere AI</span>
              </div>
              <p className="text-muted-foreground text-sm">
                AI-powered ecosystem empowering women through safety, health, career, and community.
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#how" className="hover:text-foreground transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-3">Connect</h4>
              <div className="flex gap-3">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
            © 2026 SheSphere AI. All rights reserved. Built with ❤️ for women everywhere.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
