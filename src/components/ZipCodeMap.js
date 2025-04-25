import React, { useEffect, useState } from 'react';
import './ZipCodeMap.css'

//component for zipcode on map on the ./match page..
const ZipCodeMap = ({ zipcode }) => {
const [latlon, setLatlon] = useState(null);

  useEffect(()=> {
    const fetchCoordinates = async () => {
      //api from Nominatim to get longitude and latitude..
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${zipcode}&format=json`
      );

      const data = await res.json();
      //getting and converting longitude and latitude to float..
      if(data && data.length > 0){
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setLatlon({ lat, lon });
      }
    };
    if(zipcode){ 
      fetchCoordinates();
    }
    },[zipcode]);

  return latlon ? (
    <iframe
      title='Zipcode Map'
      width="65%"
      height="490"
      className='iframe'
      style={{ border: "none", width: "45%", height: "500", marginTop: 10 }}
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${latlon.lon - 0.01},${latlon.lat - 0.01},${latlon.lon + 0.01},${latlon.lat + 0.01}&layer=mapnik&marker=${latlon.lat},${latlon.lon}`}>
    </iframe> 
  ) : (
    <p className='loading-zipcode'>Loading map for Zipcode: {zipcode}</p>
  );
}

export default ZipCodeMap;