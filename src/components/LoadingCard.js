import React from "react";
import './LoadingCard.css';

//component for items in case there is no list..
const LoadingCard = () => {
  return(
  <div className="loading-card">
    <div className="loading-image shimmer"/>
      <div className="loading-info">
        <div className="loading-line shimmer"/>
        <div className="loading-line shimmer"/>
        <div className="loading-line shimmer"/>
    </div>
  </div>
  )
}

export default LoadingCard;