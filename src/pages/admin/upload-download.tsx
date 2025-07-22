import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Upload, ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function UploadDownload() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [version, setVersion] = useState('latest');
  const [releaseNotes, setReleaseNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select a file to upload',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('version', version);
      formData.append('notes', releaseNotes);

      const response = await fetch('/api/upload/download-file', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      toast({
        title: 'Upload Successful',
        description: `${file.name} has been uploaded as version ${version}`,
      });
      
      // Reset form
      setFile(null);
      setReleaseNotes('');
      setVersion('latest');
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
        <p className="mb-6">You need to be logged in to access this page.</p>
        <Button asChild>
          <a href="/login">Login</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Upload Download File</h1>
            <p className="text-muted-foreground">Update the Binary Baseline installer file</p>
          </div>
          
          <div className="flex gap-4">
            <Button size="sm" asChild>
              <a href="/admin/downloads">
                View Download Stats <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload New Version</CardTitle>
            <CardDescription>
              This file will be available for users to download after successful payment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <Select
                  value={version}
                  onValueChange={setVersion}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a version" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest (Default)</SelectItem>
                    <SelectItem value="v1.0.0">v1.0.0</SelectItem>
                    <SelectItem value="v1.1.0">v1.1.0</SelectItem>
                    <SelectItem value="v1.2.0">v1.2.0</SelectItem>
                    <SelectItem value="beta">Beta</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Using "latest" will make this the default download for all users
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file-upload">Binary Baseline Installer</Label>
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  accept=".zip,.exe,.dmg,.pkg"
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: .zip, .exe, .dmg, .pkg (Max size: 100MB)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="release-notes">Release Notes</Label>
                <Textarea
                  id="release-notes"
                  placeholder="Enter release notes or version changes..."
                  value={releaseNotes}
                  onChange={(e) => setReleaseNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isUploading || !file}>
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Installer
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Current Download Files</CardTitle>
            <CardDescription>
              Files available for user downloads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">binary_baseline_installer.zip</h3>
                    <p className="text-sm text-muted-foreground">Version: latest</p>
                    <p className="text-sm text-muted-foreground">Uploaded: May 19, 2025</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/api/download/latest" target="_blank" rel="noopener noreferrer">
                      Download
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}