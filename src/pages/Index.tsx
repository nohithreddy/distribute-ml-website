
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "@/components/AuthForm";
import Dashboard from "./Dashboard";

const Index: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto"></div>
          <div className="h-4 w-32 bg-muted rounded-md mx-auto"></div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <AuthLoginPage />;
};

const AuthLoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">AI Model Workshop</h1>
          <p className="text-center text-muted-foreground">
            Sign in to access the platform
          </p>
        </div>
        
        <AuthForm />
      </main>
      
      <footer className="py-4 border-t border-border/40 text-center text-sm text-muted-foreground">
        <div className="container">
          © {new Date().getFullYear()} AI Model Workshop. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
