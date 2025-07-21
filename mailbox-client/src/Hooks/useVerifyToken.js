import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const useVerifyToken = (logoutCallback) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      console.log(user);
      if (!user) {
        setUser(null);
        logoutCallback?.();
        navigate('/auth');
      } else {
        setUser(user);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, logoutCallback]);

  return { user, loading };
};

export default useVerifyToken;