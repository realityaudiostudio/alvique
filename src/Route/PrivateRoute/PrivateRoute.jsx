import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';

// this means that the children means each page we are trying to check for protection on login 
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/login');
      }
    };
    checkUser();
  }, [navigate]);

  if (isAuthenticated === null) return <p>Checking auth...</p>;

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
