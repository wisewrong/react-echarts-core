import React from 'react';

const Loading: React.FC<{ loading: boolean }> = ({ children, loading }) => {
  return (
    <div className={`loading ${loading ? 'active' : ''}`}>
      {children}
      <div className="loading-mask" />
    </div>
  );
};

export default Loading;
