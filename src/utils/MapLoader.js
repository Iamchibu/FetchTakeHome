import React from 'react';
import './MapLoader.css';

const MapLoader = () => {
  return (
    <div className='map-loader'>
      <div className='map-skeleton shimmer'></div>
      <p>Loading map...</p>
    </div>
  );
};

export default MapLoader;
