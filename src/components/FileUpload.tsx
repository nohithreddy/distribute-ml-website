
import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Upload, File, X, Check, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { FileInfo } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface FileUploadProps {
  onFileUpload: (file: FileInfo) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  
  const isStudent = user?.role === "student";

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (isUploading) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    // Check file type - only allow CSV and other data files
    const allowedTypes = [
      'text/csv', 
      'application/json',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain'
    ];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Please upload a valid data file (CSV, JSON, Excel, etc.)");
      return;
    }
    
    // Check file size (10MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit");
      return;
    }
    
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 20;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearInterval(interval);
    setProgress(100);
    
    // Create a file info object
    const fileInfo: FileInfo = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date()
    };
    
    // Notify parent component
    onFileUpload(fileInfo);
    
    toast.success(`File ${file.name} uploaded successfully`);
    
    // Reset state after a delay
    setTimeout(() => {
      setIsUploading(false);
      setFile(null);
      setProgress(0);
    }, 1000);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 transition-all-slow flex flex-col items-center justify-center min-h-[200px]",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50",
          file && "border-primary/20 bg-primary/5"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />

        {!file && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted flex-center mx-auto mb-2 animate-pulse-subtle">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Upload Dataset</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Drag and drop your file here, or click to browse
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleButtonClick}
              className="mt-4"
              disabled={isUploading}
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Select File
            </Button>
          </div>
        )}

        {file && (
          <div className="w-full space-y-4">
            <div className="flex items-center p-3 bg-background rounded-md border">
              <File className="h-10 w-10 text-primary mr-3 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              {!isUploading && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveFile}
                  className="ml-2 flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              {isUploading && progress === 100 && (
                <div className="ml-2 flex-center w-8 h-8 rounded-full bg-green-100">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              )}
            </div>

            {isUploading && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-right text-muted-foreground">
                  {progress.toFixed(0)}%
                </p>
              </div>
            )}

            {!isUploading && (
              <Button
                onClick={handleUpload}
                className="w-full"
                disabled={isStudent}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </Button>
            )}
            
            {isStudent && (
              <p className="text-xs text-destructive mt-2">
                Student accounts cannot upload files. Please ask an admin for assistance.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
