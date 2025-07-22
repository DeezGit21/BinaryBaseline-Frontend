import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardGradient } from '@/components/ui/card-gradient';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<string>('main'); // 'main' or 'indicator'
  const [indicatorName, setIndicatorName] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/zip' && !file.name.endsWith('.zip')) {
        toast({
          title: "Invalid File Type",
          description: "Please select a ZIP file",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
      setUploadSuccess(false);
      setError(null);
    }
  };
  
  const handleUploadTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUploadType(e.target.value);
    setUploadSuccess(false);
    setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }
    
    if (uploadType === 'indicator' && !indicatorName) {
      toast({
        title: "No Indicator Name",
        description: "Please enter a name for the indicator",
        variant: "destructive"
      });
      return;
    }
    
    setUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      if (uploadType === 'indicator') {
        formData.append('type', 'indicator');
        formData.append('name', indicatorName);
        
        // For indicators, we'll use a different endpoint
        const response = await fetch('/api/upload/indicator', {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) {
          throw new Error('Failed to upload indicator file');
        }
      } else {
        // For main installer
        formData.append('type', 'main');
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) {
          throw new Error('Failed to upload installer file');
        }
      }
      
      setUploadSuccess(true);
      toast({
        title: "Upload Successful",
        description: uploadType === 'indicator'
          ? `${indicatorName} has been uploaded successfully`
          : "Binary Baseline Installer has been uploaded successfully",
      });
      
      // Clear form after successful upload
      if (uploadType === 'indicator') {
        setIndicatorName('');
      }
      setSelectedFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'An error occurred during upload');
      toast({
        title: "Upload Failed",
        description: err.message || "An error occurred during upload",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-4">
            <UploadCloud className="h-10 w-10 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Admin File Upload</span>
          </h1>
          
          <p className="text-gray-300">
            Upload new ZIP files for Binary Baseline
          </p>
        </div>
        
        <CardGradient className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="upload-type">Upload Type</Label>
              <select 
                id="upload-type"
                value={uploadType}
                onChange={handleUploadTypeChange}
                className="w-full px-3 py-2 bg-background border border-input rounded-md"
              >
                <option value="main">Main Installer</option>
                <option value="indicator">Indicator Add-on</option>
              </select>
            </div>
            
            {uploadType === 'indicator' && (
              <div className="space-y-2">
                <Label htmlFor="indicator-name">Indicator Name</Label>
                <Input
                  id="indicator-name"
                  value={indicatorName}
                  onChange={(e) => setIndicatorName(e.target.value)}
                  placeholder="e.g., BOSS_Pro_Indicator"
                  required={uploadType === 'indicator'}
                />
                <p className="text-xs text-gray-400">
                  This will be used for the filename (e.g., BOSS_Pro_Indicator.zip)
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="file-upload">Select ZIP File</Label>
              <div className="border-2 border-dashed border-input rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => document.getElementById('file-upload')?.click()}>
                <input
                  type="file"
                  id="file-upload"
                  className="sr-only"
                  accept=".zip,application/zip,application/x-zip-compressed"
                  onChange={handleFileChange}
                  required
                />
                {selectedFile ? (
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-green-500 mb-2 mx-auto" />
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <UploadCloud className="h-8 w-8 text-gray-400 mb-2 mx-auto" />
                    <p className="text-sm font-medium">Click to select a ZIP file</p>
                    <p className="text-xs text-gray-400">or drag and drop here</p>
                  </div>
                )}
              </div>
            </div>
            
            {error && (
              <div className="bg-destructive/20 p-4 rounded-md flex items-start">
                <AlertCircle className="text-destructive mr-2 mt-0.5 flex-shrink-0" size={16} />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
            
            {uploadSuccess && (
              <div className="bg-green-900/20 p-4 rounded-md flex items-start">
                <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                <p className="text-sm text-green-500">
                  {uploadType === 'indicator'
                    ? `${indicatorName} has been uploaded successfully!`
                    : "Binary Baseline Installer has been uploaded successfully!"}
                </p>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!selectedFile || uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Uploading...
                </>
              ) : (
                "Upload File"
              )}
            </Button>
          </form>
        </CardGradient>
        
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            This page is for administrators only. Uploaded files will be available immediately on the download and indicator pages.
          </p>
        </div>
      </div>
    </div>
  );
}