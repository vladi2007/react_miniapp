import '../assets/layout.scss';
import React from 'react';
interface Layout {
  children: React.ReactNode;
}
function Layout({ children }: Layout) {
  return (
    <>
      <div className="layout">{children}</div>
    </>
  );
}

export default Layout;
