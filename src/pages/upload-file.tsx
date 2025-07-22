import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardGradient } from "@/components/ui/card-gradient";
import { UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Footer from "@/components/layout/Footer";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus("idle");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) return;
    
    setUploading(true);
    setUploadStatus("idle");
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUploadStatus("success");
      } else {
        setUploadStatus("error");
        setErrorMessage(data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      setErrorMessage("Network error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNavbar />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <CardGradient className="max-w-lg w-full p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Upload Binary Baseline Installer</h1>
            <p className="text-gray-300">
              Use this page to upload the new installer file for the download section.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
                accept=".zip"
              />
              <label 
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer h-40"
              >
                {file ? (
                  <>
                    <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
                    <p className="font-medium text-white">{file.name}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB · {file.type || "application/zip"}
                    </p>
                    <p className="text-xs text-gray-500 mt-3">Click to change file</p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="font-medium text-gray-300">Drop your file here or click to browse</p>
                    <p className="text-sm text-gray-500 mt-1">ZIP files only, up to 50MB</p>
                  </>
                )}
              </label>
            </div>
            
            {uploadStatus === "success" && (
              <div className="bg-green-900/20 border border-green-800 p-4 rounded-md flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-500">Upload successful!</p>
                  <p className="text-sm text-gray-300">
                    The file has been uploaded successfully and is now available in the download section.
                  </p>
                </div>
              </div>
            )}
            
            {uploadStatus === "error" && (
              <div className="bg-red-900/20 border border-red-800 p-4 rounded-md flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-500">Upload failed</p>
                  <p className="text-sm text-gray-300">
                    {errorMessage}
                  </p>
                </div>
              </div>
            )}
            
            <Button
              type="submit"
              disabled={!file || uploading}
              className="w-full"
            >
              {uploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <UploadCloud className="mr-2 h-5 w-5" />
                  Upload Installer
                </>
              )}
            </Button>
          </form>
        </CardGradient>
      </main>
      
      <Footer />
    </div>
  );
}