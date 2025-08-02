
import React from "react";
import { Cpu, Zap, Server } from "lucide-react";
import { ModeType } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface ModeSelectionProps {
  selectedMode: ModeType | null;
  onSelectMode: (mode: ModeType) => void;
}

const ModeSelection: React.FC<ModeSelectionProps> = ({
  selectedMode,
  onSelectMode
}) => {
  const { user } = useAuth();
  const isStudent = user?.role === "student";
  
  const modes: Array<{
    value: ModeType;
    label: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    restricted?: boolean;
  }> = [
    {
      value: "CPU",
      label: "CPU",
      description: "Standard processing on CPU cores",
      icon: <Cpu className="h-6 w-6" />,
      color: "bg-blue-500"
    },
    {
      value: "GPU",
      label: "GPU",
      description: "Accelerated processing on graphics cards",
      icon: <Zap className="h-6 w-6" />,
      color: "bg-green-500",
      restricted: true
    },
    {
      value: "PySpark",
      label: "PySpark",
      description: "Distributed computing for big data",
      icon: <Server className="h-6 w-6" />,
      color: "bg-orange-500",
      restricted: true
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {modes.map((mode) => {
          const isDisabled = isStudent && mode.restricted;
          return (
            <div
              key={mode.value}
              className={`
                relative group
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              onClick={isDisabled ? undefined : () => onSelectMode(mode.value)}
            >
              <div
                className={`
                  p-3 rounded-lg transition-all-slow
                  ${selectedMode === mode.value 
                    ? 'ring-2 ring-primary ring-offset-2 bg-muted' 
                    : 'bg-card hover:bg-muted border border-border'}
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-full ${mode.color} flex-center text-white`}>
                    {mode.icon}
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{mode.label}</p>
                    <p className="text-xs text-muted-foreground">{mode.description}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {isStudent && (
        <p className="text-xs text-destructive">
          Student accounts have limited access to execution modes. Some advanced modes are restricted.
        </p>
      )}
    </div>
  );
};

export default ModeSelection;
