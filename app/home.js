import React, {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';

export default React.createClass({
  getInitialState() {
    return {
      info: null,
    };
  },

  componentWillMount() {
    AsyncStorage.getItem('login').then((value) => {
      if (value) {
        const user = JSON.parse(value);
        this.setState({info: user});
      }
    }).done();
  },

  render() {
    const user = this.state.info;
    if (user) {
      return (
        <View style={styles.content}>
          <Text>Phone: {user.phone}</Text>
          <Text>Address: {user.address}</Text>
          <Text>Type: {user.type}</Text>
        </View>
      );
    }
    return (
      <View style={styles.content}>
        <Text>No data</Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  content: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
