import React from "react";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import apiHandler from '../api/apiHandler'
import ItemInfo from '../components/ItemInfo'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoid2lsbGlhbWh6byIsImEiOiJja2EyY2swcDEwOTNnM25wbnNsNG9rdjJjIn0.hROSzMkhwCtMSdnDhvmOyA',
  
});


class Home extends React.Component {

  state = {
    items:[],
    isClicked:false,
    itemToDisplay: null,
  }

  componentDidMount() {
    apiHandler
      .getItems()
      .then((apiResponse) => {
        // console.log(apiResponse);
        this.setState({ items: apiResponse });
      })
      .catch((apiError) => {
        console.log(apiError);
      });
  }

  // clusterMarker = (coordinates) => (
  //   <Marker coordinates={coordinates}/>
  // );

  handleClick = (index) => {
    const oneItem = this.state.items[index]
    console.log(oneItem)
    this.setState({ isClicked: true, itemToDisplay: oneItem });
  }

  render(){
    // if (!this.state.items) return null
    return (
      <div>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '100vh',
            width: '100vw',
            // center: [2.351027, 48.856669], //   [longitude,latitude]
            // zoom: 12,
          }}>

        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        {this.state.items.map((item, index) => (
          <Feature key={index} onClick={ e => this.handleClick(index)} coordinates={item.location.coordinates} />
          ))}
        </Layer>
        {this.state.isClicked && <ItemInfo info={this.state.itemToDisplay}/>}
      </Map>
      </div>
    );
  }
}

export default Home;
