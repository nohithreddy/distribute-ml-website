
import React, { useState } from "react";
import { Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileInfo, ModelType, ModeType } from "@/types";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface RunButtonProps {
  selectedFile: FileInfo | null;
  selectedModel: ModelType | null;
  selectedMode: ModeType | null;
  onRun: () => void;
}

const RunButton: React.FC<RunButtonProps> = ({
  selectedFile,
  selectedModel,
  selectedMode,
  onRun
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const { user } = useAuth();
  
  const handleClick = async () => {
    if (!selectedFile) {
      toast.error("Please upload a file first");
      return;
    }
    
    if (!selectedModel) {
      toast.error("Please select a model");
      return;
    }
    
    if (!selectedMode) {
      toast.error("Please select an execution mode");
      return;
    }
    
    setIsRunning(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onRun();
    
    toast.success("Model execution started successfully");
    setIsRunning(false);
  };

  return (
    <Button
      size="lg"
      className="w-full sm:w-auto font-medium transition-all-slow"
      disabled={isRunning || !selectedFile || !selectedModel || !selectedMode}
      onClick={handleClick}
    >
      {isRunning ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Play className="mr-2 h-5 w-5" />
          Run Model
        </>
      )}
    </Button>
  );
};

export default RunButton;
