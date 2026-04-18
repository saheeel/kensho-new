import { useEffect } from 'react';

const Admin = () => {
  useEffect(() => {
    // Force a complete page reload to the static CMS directory
    // This prevents React from interfering and keeps the URL cleaner
    window.location.href = '/admin/';
  }, []);

  return null;
};

export default Admin;
