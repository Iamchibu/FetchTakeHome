import React, { useEffect, useState } from 'react';
import api from '../services/api';
import APP_CONFIG from '../config/config';
import DogCard from '../components/DogCard';
import LoadingCard from '../components/LoadingCard';
import Header from '../utils/Header';
import {  useNavigate } from 'react-router-dom';
import CustomDialog from '../utils/CustomDialog';
import './Dogs.css';

export default function Dogs(){
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [breedFilter, setBreedFilter] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [favorites, setFavorite] = useState([]);
  const [page, setPage] = useState(1);
  const [totalDogs, setTotalDogs] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [matchData, setMatchData] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [msg, setMsg] = useState(null);
  const [pageMsg, setPageMsg] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  //toggles a dog's favorite status by adding/ removing its ID..
  const markAsfavorite = (id) => {
    setFavorite((prev) => 
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    //checks if user is logged in..
    const token = localStorage.getItem(APP_CONFIG.token);
    if(!token){
      navigate('/');
    }
  },[navigate]);

  //loads and cleans the breeds endpoint..
  useEffect(() =>  {
    async function loadBreeds(){
      setIsLoading(true);
      try{
        const data = await api.get(APP_CONFIG.breedsEndpoint);
        const raw = Array.isArray(data.data) ?
        data.data : Array.isArray(data?.data) ? data.data : [];

        const cleaned = raw
        .map(b => b.trim())
        .map(b => b === 'Basenj!' ? 'Basenji' : b)
        .filter(b => b.length > 0)
        .sort((a, b) => a.localeCompare(b));

        setBreeds(cleaned);
      } catch(err){
        setError('Failed to load breeeds...');
        setBreeds([]);
      }finally{
        setIsLoading(false);
      }
    }
    loadBreeds();
  }, [])

  //incase the generate button is clicked when no favorites is selected..
  const handleNotSelected = () => {
    setShowDialog(true)
    setPageMsg("dog but not for match")
    setMsg("Select favorite by clicking the heart🤍 on each dog")      
  }
  
  //runs the match api of the dogs..
  const handleMatch = async () => {
    const { data } = await api.post(APP_CONFIG.dogsMatchEndpoint, favorites)

    setMatchData([data.match]);
    setMsg("You have a match!");
    setPageMsg("dog");
    setShowDialog(true);
  }

  //loads dogs immediately the user enters the screen..
  useEffect(() =>  {
    async function loadDogs(){
      setIsLoading(true);
      setError(null);

      try{
        const  params = {
          breeds: breedFilter ? [breedFilter] : [],
          size: 10,
          from: (page - 1) * 10,
          sort: `breed:${sortOrder}`,
        }

      if(breedFilter) {
        params.breeds = [breedFilter]
      }

      const response = await api.get(APP_CONFIG.dogsSearchEndpoint,{ params });
      const dogData = await api.post(APP_CONFIG.getDogsEndpoint, response.data.resultIds);

      setDogs(dogData.data);
      setTotalDogs(response.data.total);
      } catch(err){
        setError(err.response?.data?.message || err.message);
      } finally{
        setIsLoading(false);
      }
    }
    loadDogs();
  }, [page, breedFilter, sortOrder])

  return(
    <main>
      <Header/>
      <h3 className='list-text'>List of Fetch's Shelter Dogs</h3>
      <label className='filter-text' htmlFor='breed-filter'>Filter by breed:</label>
      <CustomDialog 
        page={pageMsg} 
        msg={msg} 
        show={showDialog} 
        data={matchData} 
        onClose={()=> setShowDialog(false)}
      />
      <div className='filter-section'>
        <select
          id='breed-filter'
          value={breedFilter}
          onChange={e => {
            setBreedFilter(e.target.value); 
            setPage(1);
            }}>
              <option value="">All breeds</option>
              {breeds.map(b => (
              <option key={b} value={b}>{b}</option>
              ))}
        </select>
        
        <button className='filter-button' onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Sort Breed: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>
      <p className="select-fav-info">Select a list of your favorites❤️ and we will give you the best match!💯</p>
      <div className='dog-container'>
         {isLoading ? (
          [...Array(10)].map((_, index) => <LoadingCard key={index}/>)
         ) : error ? (
          <p className='error-message'>Error: {error}</p>
         ) : (
          dogs.map((dog) => (
           <DogCard
            key={dog.id}
            dog={dog}
            isFavorite={favorites.includes(dog.id)}
            onToggleFavorite={markAsfavorite}
           />
         ))
        )}
       </div>
       <div className='bottom-buttons'>
         <div className='dog-page-buttons'>
           <button className='prev' disabled={page === 1} onClick={()=> setPage((p) => p - 1)}>
             Previous
           </button>
           <span className='page-text'> Page {page} of {Math.ceil(totalDogs/10)}  </span>
           <button className='next' onClick={()=> setPage((p) => p + 1)}>
             Next
           </button>
         </div>
        
        <div className='generate-section'>
         <button style={{ opacity: favorites.length === 0 ? '60%' : '100%' }} className='generate-match-button' onClick={favorites.length === 0 ? handleNotSelected : handleMatch}>
           Generate Match
         </button>
        </div>
      </div>
    </main>
  );
}