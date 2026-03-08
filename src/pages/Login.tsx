import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Globe, Chrome, Linkedin as LinkedinIcon } from "lucide-react";
import { motion } from "framer-motion";
import RotatingBackground from "@/components/RotatingBackground";
import GlowButton from "@/components/GlowButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Welcome back! 👋", description: "Redirecting to your dashboard..." });
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <RotatingBackground overlay="auth" className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card-strong w-full max-w-md p-8"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Globe className="h-8 w-8 text-primary" />
            <span className="font-display text-2xl font-bold gradient-text">SheSphere AI</span>
          </Link>
          <p className="text-muted-foreground text-sm">Welcome back! Sign in to continue.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email" type="email" placeholder="you@example.com"
                className="pl-10 bg-muted/50 border-border/50"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password" type="password" placeholder="••••••••"
                className="pl-10 bg-muted/50 border-border/50"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="text-right">
            <a href="#" className="text-xs text-primary hover:underline">Forgot Password?</a>
          </div>
          <GlowButton type="submit" className="w-full">Login</GlowButton>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or continue with</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="glass-card flex items-center justify-center gap-2 py-2.5 text-sm font-medium hover:bg-muted/80 transition-colors !p-3 !rounded-xl">
            <Chrome className="h-4 w-4" /> Google
          </button>
          <button className="glass-card flex items-center justify-center gap-2 py-2.5 text-sm font-medium hover:bg-muted/80 transition-colors !p-3 !rounded-xl">
            <LinkedinIcon className="h-4 w-4" /> LinkedIn
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary font-medium hover:underline">Create Account</Link>
        </p>
      </motion.div>
    </RotatingBackground>
  );
};

export default Login;
