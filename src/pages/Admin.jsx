import { useEffect } from 'react';

const Admin = () => {
  useEffect(() => {
    // Force a complete page reload to the static CMS file
    // This prevents React from interfering with the CMS's DOM manipulation
    window.location.href = '/admin/index.html';
  }, []);

  return null;
};

export default Admin;
