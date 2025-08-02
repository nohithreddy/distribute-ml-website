
import React from "react";
import Layout from "@/components/Layout";
import ModelInterface from "@/components/ModelInterface";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Model Workshop</h1>
          <p className="text-muted-foreground mt-2">
            Configure and run machine learning models on your datasets
          </p>
        </div>
        
        <ModelInterface />
      </div>
    </Layout>
  );
};

export default Dashboard;
