import React, { useState } from 'react';
import './ImageLoader.css';

const ImageLoader = ({ src, alt, className, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  console.log('ImageLoader props:', { src, alt, className, rest });

  return (
    <div className={`image-loader-container ${className || ''}`}>
      {!loaded && <div className="skeleton-loader" />}
      <img
        src={src}
        alt={alt}
        className={`image-loader-img ${loaded ? 'loaded' : ''}`}
        onLoad={() => setLoaded(true)}
        {...rest}
      />
    </div>
  );
};

export default ImageLoader;
