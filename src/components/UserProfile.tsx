
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';
import { toast } from 'sonner';

const UserProfile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/netflix');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  if (!user) {
    return (
      <Button
        onClick={handleSignIn}
        variant="ghost"
        className="w-full justify-start text-lg hover:bg-white/10 transition-colors"
      >
        <User className="mr-2 h-5 w-5" />
        Sign In
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-red-600 text-white">
            {user.email?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">
            {user.user_metadata?.username || user.email?.split('@')[0]}
          </p>
          <p className="text-xs text-gray-400 truncate">{user.email}</p>
        </div>
      </div>
      
      <Button
        onClick={handleSignOut}
        variant="ghost"
        className="w-full justify-start text-lg hover:bg-white/10 transition-colors text-red-400 hover:text-red-300"
      >
        <LogOut className="mr-2 h-5 w-5" />
        Sign Out
      </Button>
    </div>
  );
};

export default UserProfile;
