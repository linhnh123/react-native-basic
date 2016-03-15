import React, {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

import MapView from 'react-native-maps';

export default React.createClass({
  onRegionChange(region) {
    
  },

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 10.720754,
            longitude: 106.729579,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={this.onRegionChange}
        />
        <Image style={styles.getLocationImg} source={require('../img/marker.png')} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  getLocationImg: {
    marginBottom: 60,
  },
});
