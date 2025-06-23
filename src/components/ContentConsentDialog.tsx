
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
import { Shield, Play } from "lucide-react";

interface ContentConsentDialogProps {
  isOpen: boolean;
  onConsent: () => void;
  onDecline: () => void;
  contentTitle?: string;
}

const ContentConsentDialog: React.FC<ContentConsentDialogProps> = ({
  isOpen,
  onConsent,
  onDecline,
  contentTitle = "this content"
}) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-gray-900 border-gray-700 text-white">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-6 h-6 text-yellow-500" />
            <AlertDialogTitle className="text-xl">External Content Warning</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-300 text-base leading-relaxed">
            This video player loads content from an external source. By continuing, you acknowledge that:
            <br /><br />
            • Content is hosted by third-party providers
            <br />
            • External links may have different privacy policies
            <br />
            • We cannot guarantee the security of external content
            <br /><br />
            Do you want to proceed and load <strong>{contentTitle}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel 
            onClick={onDecline}
            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConsent}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Load Content
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ContentConsentDialog;
