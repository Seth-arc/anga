import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { PDFDownloadLink, PDFDownloadLinkProps } from '@react-pdf/renderer';
import { ArrowDown } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
}

interface DownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ResultsPDF: React.ComponentType<{
    results: Record<string, number>;
    mainStyle: any;
    orderedStyles: any[];
    userData: UserData;
  }>;
  results: Record<string, number>;
  mainStyle: any;
  orderedStyles: any[];
}

const DownloadDialog: React.FC<DownloadDialogProps> = ({
  isOpen,
  onClose,
  ResultsPDF,
  results,
  mainStyle,
  orderedStyles,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showDownload, setShowDownload] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDownload(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-deep-purple">
            Download Your Report
          </DialogTitle>
          <DialogDescription>
            Please provide your details to download your teaching style profile.
          </DialogDescription>
        </DialogHeader>

        {!showDownload ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-slate-grey">
              Thank you! Your report is ready for download.
            </p>
            <div className="w-full">
              {showDownload && (
                <Button 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    const pdfDoc = (
                      <ResultsPDF
                        results={results}
                        mainStyle={mainStyle}
                        orderedStyles={orderedStyles}
                        userData={{ name, email }}
                      />
                    );
                    // Create and trigger download
                    const blob = new Blob([pdfDoc as unknown as BlobPart], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'teaching-style-profile.pdf';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                >
                  <ArrowDown className="w-5 h-5" />
                  Download PDF Report
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DownloadDialog;