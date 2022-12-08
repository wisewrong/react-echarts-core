import React from 'react';

const Widget: React.FC<{ className?: string; title: string }> = ({
  className,
  title,
  children,
}) => {
  return (
    <div className={`widget ${className || ''}`}>
      <h3 className="widget-title">{title}</h3>
      <div className="widget-body">{children}</div>
    </div>
  );
};

export default Widget;
