
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavMenu = () => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50 hover:bg-white/10 transition-colors"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-background/95 backdrop-blur-xl border-neutral-800">
        <SheetHeader>
          <SheetTitle className="text-left text-gradient">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-lg hover:bg-white/10 transition-colors"
            onClick={() => {
              navigate("/about");
            }}
          >
            About
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-lg hover:bg-white/10 transition-colors"
            onClick={() => {
              navigate("/terms");
            }}
          >
            Terms and Conditions
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavMenu;
