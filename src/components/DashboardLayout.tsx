import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, Shield, Heart, Brain, Briefcase, Rocket, Users,
  Lock, Radar, MessageCircle, User, Globe, Menu
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import GuardianAI from "@/components/GuardianAI";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Safety Hub", url: "/dashboard/safety", icon: Shield },
  { title: "Health Hub", url: "/dashboard/health", icon: Heart },
  { title: "Wellness", url: "/dashboard/wellness", icon: Brain },
  { title: "Career Hub", url: "/dashboard/career", icon: Briefcase },
  { title: "Startup Hub", url: "/dashboard/startup", icon: Rocket },
  { title: "Mentorship", url: "/dashboard/mentorship", icon: Users },
  { title: "Protection", url: "/dashboard/protection", icon: Lock },
  { title: "Opportunities", url: "/dashboard/opportunities", icon: Radar },
  { title: "Community", url: "/dashboard/community", icon: MessageCircle },
  { title: "Profile", url: "/dashboard/profile", icon: User },
];

function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <div className="h-16 flex items-center px-4 gap-2 border-b border-sidebar-border">
        <Globe className="h-7 w-7 text-sidebar-primary shrink-0" />
        {!collapsed && <span className="font-display text-lg font-bold text-sidebar-foreground">SheSphere AI</span>}
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4 mr-2 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center gap-4 border-b border-border px-4 bg-background/80 backdrop-blur-sm">
            <SidebarTrigger>
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div className="flex-1" />
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Home
            </Link>
          </header>
          <main className="flex-1 p-6 overflow-auto bg-muted/20">
            {children}
          </main>
        </div>
      </div>
      <GuardianAI />
    </SidebarProvider>
  );
};

export default DashboardLayout;
