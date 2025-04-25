import React, { useEffect, useState } from 'react';
import {  useNavigate, useLocation } from 'react-router-dom';
import APP_CONFIG from '../config/config';
import MatchCard from '../components/MatchCard';
import LoadingCard from '../components/LoadingCard';
import Header from '../utils/Header';
import ZipCodeMap from '../components/ZipCodeMap'
import CustomDialog from '../utils/CustomDialog';
import MapLoader from '../utils/MapLoader';
import api from '../services/api';
import './Match.css';

export default function Match(){
  const [dogs, setDogs] = useState([]);
  const [code, setCode] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation(); 
  const matchData = location.state?.matchData;

  useEffect(() => {
    const token = localStorage.getItem(APP_CONFIG.token);
    if(!token){
      navigate('/');
    }
  },[navigate]);

  //to call the get dogs api..
  useEffect(() =>  {
    async function loadMatchedDog(){
      setIsLoading(true);
      setError(null);

      try{
        const response = await api.post(APP_CONFIG.getDogsEndpoint, matchData)
        setDogs(response.data);
        setCode(response.data[0].zip_code)
      } catch(err){
        setError(err.response?.data?.message || err.message);
      } finally{
        setIsLoading(false);
      }
    }
    loadMatchedDog();
  }, [matchData])

  return(
    <main>
      <Header/>
      <h3 className='your-match'>Your Match</h3>
      <CustomDialog 
        page={"match"} 
        msg={"Awesome!\n You will receive an email shortly!✉️"} 
        show={showDialog} 
        onClose={()=> setShowDialog(false)}
      />
      <div className='match-container'>
        {isLoading ? <LoadingCard /> : error ? <p className='error-message'>Error: {error}</p> : (dogs.map((dog) => (
           <MatchCard
            key={dog.id}
            dog={dog}
           />))
          )}
        {isLoading ? <MapLoader />: <ZipCodeMap zipcode={code}/>}
      </div>
      <div>
        <p className='pickup-text'>For Pickup</p>
          <button className='pick-up-button' onClick={()=> {setShowDialog(true)}}>Contact us</button>
      </div>
    </main>
  );
}