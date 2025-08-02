
import React, { useState } from "react";
import FileUpload from "./FileUpload";
import ModelSelection from "./ModelSelection";
import ModeSelection from "./ModeSelection";
import RunButton from "./RunButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FileInfo, ModelType, ModeType, RunHistory } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

const ModelInterface: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);
  const [selectedMode, setSelectedMode] = useState<ModeType | null>(null);
  const [runHistory, setRunHistory] = useState<RunHistory[]>([]);
  const { user } = useAuth();

  const handleFileUpload = (file: FileInfo) => {
    setSelectedFile(file);
  };

  const handleSelectModel = (model: ModelType) => {
    setSelectedModel(model);
  };

  const handleSelectMode = (mode: ModeType) => {
    setSelectedMode(mode);
  };

  const handleRun = () => {
    if (!user || !selectedFile || !selectedModel || !selectedMode) return;
    
    const newRun: RunHistory = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      username: user.username,
      modelType: selectedModel,
      modeType: selectedMode,
      fileName: selectedFile.name,
      status: 'running',
      startTime: new Date(),
      logs: [`[${new Date().toLocaleTimeString()}] Initializing ${selectedModel} model...`]
    };
    
    // Add the new run to history
    setRunHistory([newRun, ...runHistory]);
    
    // Simulate processing completion after random time
    const delay = 5000 + Math.random() * 10000;
    setTimeout(() => {
      setRunHistory(prev => {
        return prev.map(run => {
          if (run.id === newRun.id) {
            return {
              ...run,
              status: 'completed',
              endTime: new Date(),
              logs: [
                ...(run.logs || []),
                `[${new Date().toLocaleTimeString()}] Loading dataset: ${selectedFile.name}`,
                `[${new Date().toLocaleTimeString()}] Preprocessing data...`,
                `[${new Date().toLocaleTimeString()}] Training ${selectedModel} model...`,
                `[${new Date().toLocaleTimeString()}] Validation complete. Accuracy: ${(Math.random() * 20 + 80).toFixed(2)}%`,
                `[${new Date().toLocaleTimeString()}] Model execution completed successfully.`
              ]
            };
          }
          return run;
        });
      });
    }, delay);
  };

  return (
    <div className="space-y-8 animate-slide-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File Upload Section */}
        <Card className="glass shadow-sm lg:col-span-1">
          <CardHeader>
            <CardTitle>Dataset</CardTitle>
            <CardDescription>Upload or select your data file</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload onFileUpload={handleFileUpload} />
            
            {selectedFile && (
              <div className="mt-4 p-3 bg-muted/50 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(1)} KB • Uploaded {selectedFile.uploadedAt.toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Active
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Model & Mode Selection */}
        <Card className="glass shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Model Configuration</CardTitle>
            <CardDescription>Select the model and execution mode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Select Model</h3>
              <ModelSelection
                selectedModel={selectedModel}
                onSelectModel={handleSelectModel}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Execution Mode</h3>
              <ModeSelection
                selectedMode={selectedMode}
                onSelectMode={handleSelectMode}
              />
            </div>
            
            <div className="pt-4">
              <RunButton
                selectedFile={selectedFile}
                selectedModel={selectedModel}
                selectedMode={selectedMode}
                onRun={handleRun}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Run History & Logs */}
      {runHistory.length > 0 && (
        <Card className="glass shadow-sm">
          <CardHeader>
            <CardTitle>Execution Logs</CardTitle>
            <CardDescription>
              Recent model executions and their outputs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {runHistory.map((run) => (
                <div key={run.id} className="border rounded-md overflow-hidden">
                  <div className="bg-muted p-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{run.modelType} on {run.fileName}</h4>
                      <p className="text-xs text-muted-foreground">
                        Started at {run.startTime.toLocaleTimeString()} by {run.username}
                      </p>
                    </div>
                    <Badge
                      className={`
                        ${run.status === 'running' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                        ${run.status === 'completed' ? 'bg-green-500 hover:bg-green-600' : ''}
                        ${run.status === 'failed' ? 'bg-red-500 hover:bg-red-600' : ''}
                      `}
                    >
                      {run.status}
                    </Badge>
                  </div>
                  <div className="p-3 bg-black rounded-none font-mono text-xs text-green-400 max-h-40 overflow-y-auto">
                    {run.logs?.map((log, index) => (
                      <div key={index} className="py-0.5">
                        {log}
                      </div>
                    ))}
                    {run.status === 'running' && (
                      <div className="animate-pulse">▌</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ModelInterface;
