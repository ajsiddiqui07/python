import { useState } from 'react';
import { LogOut, LoaderCircle } from 'lucide-react';
import { useAuth } from '../context/useAuth.js';

function LogoutButton() {
  const { logout } = useAuth();
  const [error, setError] = useState('');
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleLogout() {
    setError('');
    setIsSigningOut(true);
    try {
      await logout();
    } catch (logoutError) {
      console.error('Unable to sign out:', logoutError);
      setError('Sign out failed. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <div className="logout-wrap">
      <button className="logout-button" disabled={isSigningOut} onClick={handleLogout} type="button">
        {isSigningOut ? <LoaderCircle className="spin" size={16} /> : <LogOut size={16} />}
        <span>{isSigningOut ? 'Signing out…' : 'Log out'}</span>
      </button>
      {error && <span className="logout-error" role="alert">{error}</span>}
    </div>
  );
}

export default LogoutButton;
