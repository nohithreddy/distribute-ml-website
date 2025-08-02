
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex-center">
              <span className="text-primary-foreground font-medium">AI</span>
            </div>
            <span className="font-medium">Model Interface</span>
          </div>
          
          {user && (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">{user.username}</span>
                <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container py-6 animate-fade-in">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/40 py-4 bg-background">
        <div className="container flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AI Model Interface
          </span>
          <span className="text-xs text-muted-foreground">
            Version 1.0.0
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
