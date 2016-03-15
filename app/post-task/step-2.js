import React, {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Alert,
} from 'react-native';

import MapView from 'react-native-maps';
import RNGeocoder from 'react-native-geocoder';

export default React.createClass({
  getInitialState: function() {
    return {
      addressValue: '',
    };
  },

  onRegionChange(region) {
    const latLng = {
      latitude: region.latitude,
      longitude: region.longitude,
    };
    RNGeocoder.reverseGeocodeLocation(latLng, (err, data) => {
      if (err) {
        Alert.alert('Error', 'Can not get address');
      } else {
        const obj = data[0];
        let address = '';
        if (obj) {
          address = obj.thoroughfare + ', ' + obj.subLocality + ', ' + obj.subAdminArea + ', ' + obj.adminArea + ', ' + obj.country;
          this.setState({addressValue: address});
        }
      }
    });
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
        <TextInput
          style={styles.inputAddress}
          ref="phone"
          placeholder="Type or drag map to get address"
          value={this.state.addressValue}
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
  inputAddress: {
    position: 'absolute',
    top: 20,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#fff',
    fontSize: 20,
  },
});
