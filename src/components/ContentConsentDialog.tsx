
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Shield, AlertTriangle } from "lucide-react";

interface ContentConsentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
  contentTitle: string;
  embedUrl?: string;
}

const ContentConsentDialog = ({ 
  isOpen, 
  onOpenChange, 
  onAccept, 
  contentTitle,
  embedUrl 
}: ContentConsentDialogProps) => {
  const getDomainFromUrl = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return "external source";
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-gray-900 border-gray-700 text-white">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-yellow-500" />
            <AlertDialogTitle className="text-white">External Content Warning</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-300">
            <div className="flex items-start gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                You're about to load content for <strong>"{contentTitle}"</strong> from an external source.
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <p><strong>Source:</strong> {embedUrl ? getDomainFromUrl(embedUrl) : "external provider"}</p>
              
              <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-200 mb-1">Security Notice:</p>
                <ul className="text-gray-300 space-y-1 text-xs">
                  <li>• External content is loaded from third-party servers</li>
                  <li>• We cannot guarantee the security of external sources</li>
                  <li>• Your browser may show security warnings</li>
                  <li>• Proceed only if you trust this content</li>
                </ul>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onAccept}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Load Content Anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ContentConsentDialog;
