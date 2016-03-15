import React, {
  StyleSheet,
  View,
  Image,
} from 'react-native';

export default React.createClass({
  render() {
    return (
      <View style={styles.loading}>
        <Image source={require('../img/loading.gif')} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
