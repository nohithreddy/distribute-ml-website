
import React from "react";
import { Check, Cpu, Activity, LineChart, BarChart, ArrowRight, Layers } from "lucide-react";
import { ModelType } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface ModelOptionProps {
  value: ModelType;
  label: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const ModelOption: React.FC<ModelOptionProps> = ({
  value,
  label,
  description,
  icon,
  selected,
  onClick,
  disabled
}) => (
  <div
    className={`
      relative rounded-lg border p-4 transition-all-slow cursor-pointer
      ${selected 
        ? 'border-primary bg-primary/5' 
        : 'border-border hover:border-primary/50 hover:bg-muted/50'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
    onClick={disabled ? undefined : onClick}
  >
    {selected && (
      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex-center">
        <Check className="h-3 w-3 text-primary-foreground" />
      </div>
    )}
    
    <div className="flex items-start space-x-4">
      <div className="mt-1 w-10 h-10 rounded-md bg-muted flex-center">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="font-medium leading-none">{label}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
);

interface ModelSelectionProps {
  selectedModel: ModelType | null;
  onSelectModel: (model: ModelType) => void;
}

const ModelSelection: React.FC<ModelSelectionProps> = ({
  selectedModel,
  onSelectModel
}) => {
  const { user } = useAuth();
  const isStudent = user?.role === "student";
  
  const models: Array<{
    value: ModelType;
    label: string;
    description: string;
    icon: React.ReactNode;
    restricted?: boolean;
  }> = [
    {
      value: "ANN",
      label: "Artificial Neural Network",
      description: "Basic neural network for simple pattern recognition",
      icon: <Cpu className="h-5 w-5 text-primary" />
    },
    {
      value: "CNN",
      label: "Convolutional Neural Network",
      description: "Specialized for image and visual data processing",
      icon: <Activity className="h-5 w-5 text-primary" />
    },
    {
      value: "Linear Regression",
      label: "Linear Regression",
      description: "Model linear relationships between variables",
      icon: <LineChart className="h-5 w-5 text-primary" />,
      restricted: true
    },
    {
      value: "Logistic Regression",
      label: "Logistic Regression",
      description: "Classification model for binary outcomes",
      icon: <BarChart className="h-5 w-5 text-primary" />,
      restricted: true
    },
    {
      value: "LSTM",
      label: "Long Short-Term Memory",
      description: "RNN optimized for sequential data and time series",
      icon: <ArrowRight className="h-5 w-5 text-primary" />
    },
    {
      value: "Transformers",
      label: "Transformers",
      description: "Advanced model architecture for NLP and more",
      icon: <Layers className="h-5 w-5 text-primary" />,
      restricted: true
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map((model) => (
          <ModelOption
            key={model.value}
            value={model.value}
            label={model.label}
            description={model.description}
            icon={model.icon}
            selected={selectedModel === model.value}
            onClick={() => onSelectModel(model.value)}
            disabled={isStudent && model.restricted}
          />
        ))}
      </div>
      
      {isStudent && (
        <p className="text-xs text-destructive">
          Student accounts have limited access to models. Some advanced models are restricted.
        </p>
      )}
    </div>
  );
};

export default ModelSelection;
