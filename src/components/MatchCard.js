import React from 'react';
import './MatchCard.css';

//component for all Dog items on the ./match page..
const MatchCard = ({ dog }) => {
  //random minutes to simulate as real minutes to pick up..
  const minutes = Math.floor(Math.random() * 60) + 1;
  
  return(
    <div className="match-card">
      <img src={dog.img} alt={dog.name} width={150} className="match-image"/>
      <div className="match-info">
        <h3>{dog.name}</h3>
        <p><strong>Breed:</strong> {dog.breed}</p>
        <p><strong>Age:</strong> {dog.age}</p>
        <p><strong>Distance:</strong> {minutes} mins away</p>
        <p><strong>Zip:</strong> {dog.zip_code}</p>
        <p className='match-emoji'>🐕 🐶</p>
      </div>
    </div>
  );
}

export default MatchCard;