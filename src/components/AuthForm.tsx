
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2 } from "lucide-react";

const AuthForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="glass shadow-lg animate-scale-in">
        <CardHeader className="space-y-1">
          <div className="w-12 h-12 rounded-xl bg-primary flex-center mx-auto mb-2">
            <span className="text-primary-foreground text-xl font-medium">AI</span>
          </div>
          <CardTitle className="text-center text-2xl">Welcome</CardTitle>
          <CardDescription className="text-center">
            Sign in to access the AI Model Interface
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="transition-all-slow"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="transition-all-slow"
              />
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>Sample users for testing:</p>
              <ul className="list-disc pl-4 space-y-1 mt-1">
                <li>Student: student@example.com / password</li>
                <li>Admin: admin@example.com / password</li>
                <li>Alpha: alpha@example.com / password</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full transition-all-slow" 
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="mr-2 h-4 w-4" />
              )}
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AuthForm;
