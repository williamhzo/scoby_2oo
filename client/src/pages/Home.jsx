import React from "react";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoid2lsbGlhbWh6byIsImEiOiJja2EyY2swcDEwOTNnM25wbnNsNG9rdjJjIn0.hROSzMkhwCtMSdnDhvmOyA',
  
});


class Home extends React.Component {
  render(){
    return (
      <div>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '100vh',
            width: '100vw',
            // center: [2.351027, 48.856669], //   [longitude,latitude]
            // zoom: 12,
          }}
        />
      </div>
    );
  }
}

export default Home;
