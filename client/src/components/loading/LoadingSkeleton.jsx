import React from 'react';

const LoadingSkeleton = ({ className = '', ...passProps }) => {
    // destructuring
    return <div className={`skeleton ${className}`} {...passProps}></div>;
};

export default LoadingSkeleton;
