import React from 'react';
import './DogCard.css';

//component for all Dog items on the ./dog page..
const DogCard = ({ dog, onToggleFavorite, isFavorite }) => {
  return(
    <div className="dog-card">
      <img className="dog-image" src={dog.img} alt={dog.name} width={150}/>
      <div className="dog-info">
        <div className='dog-name'>
        <h3>{dog.name}</h3>
        <button 
          className={`heart-button ${isFavorite ? 'favorited' : ''}`}
          onClick={()=> onToggleFavorite(dog.id)}
          aria-label={isFavorite ? 'Unfavorite' : 'Favorite'}>
            {isFavorite ? '❤️' : '🤍'}
        </button>
        </div>
        <p><strong>Breed:</strong> {dog.breed}</p>
        <p><strong>Age:</strong> {dog.age}</p>
        <p><strong>Zip:</strong> {dog.zip_code}</p>
      </div>
    </div>
  );
}

export default DogCard;