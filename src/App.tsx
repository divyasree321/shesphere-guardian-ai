import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SafetyHub from "./pages/SafetyHub";
import HealthHub from "./pages/HealthHub";
import CareerHub from "./pages/CareerHub";
import StartupHub from "./pages/StartupHub";
import MentorshipHub from "./pages/MentorshipHub";
import ProtectionHub from "./pages/ProtectionHub";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import CommunityPage from "./pages/CommunityPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/safety" element={<SafetyHub />} />
          <Route path="/dashboard/health" element={<HealthHub />} />
          <Route path="/dashboard/career" element={<CareerHub />} />
          <Route path="/dashboard/startup" element={<StartupHub />} />
          <Route path="/dashboard/mentorship" element={<MentorshipHub />} />
          <Route path="/dashboard/protection" element={<ProtectionHub />} />
          <Route path="/dashboard/opportunities" element={<OpportunitiesPage />} />
          <Route path="/dashboard/community" element={<CommunityPage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
