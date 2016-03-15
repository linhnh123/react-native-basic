import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  Navigator,
  AsyncStorage,
} from 'react-native';

import ddpClient from './lib/ddp-client';

// Polyfill the process functionality needed for minimongo-cache
global.process = require("./config/db/lib/process.polyfill");

let phone, password;

export default React.createClass({
  getInitialState() {
    return {
      connected: false,
      data: {},
    }
  },

  onLogin() {
    ddpClient.call("login", [{ user : { username : phone }, password : password }], (err, result) => {
      if (err) {
        Alert.alert('Error', err.reason);
      } else {
        ddpClient.subscribe("userProfile", [], () => {
          const user = Object.values(ddpClient.collections.users.items);
          if (user) {
            AsyncStorage.setItem('login', JSON.stringify(user[0]));
            this.props.navigator.push({
              name: 'layout',
              message: user[0].name,
            });
          }
        });
      }
    });
  },

  componentWillMount() {
    AsyncStorage.getItem('login').then((value) => {
      if (value) {
        const user = JSON.parse(value);
        this.props.navigator.push({
          name: 'layout',
          message: user.name,
        });
      }
    }).done();
  },

  componentDidMount() {
    ddpClient.connect((err, wasReconnect) => {
      let connected = true;
      if (err) {
        connected = false;
      }
      this.setState({connected: connected});
    });
  },

  componentWillUnmount() {
    ddpClient.close();
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Login
        </Text>
        <Text style={{color: this.state.connected ? 'green' : 'red'}}>
          {this.state.connected ? 'connected' : 'connect failed'}
        </Text>
        <TextInput
          ref="phone"
          placeholder="Phone"
          keyboardType="phone-pad"
          onChangeText={text => phone = text}
          />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => password = text}
          />
        <TouchableHighlight
          onPress={this.onLogin}
          underlayColor="#F5FCFF">
          <View>
            <Text style={styles.button}>Login</Text>
          </View>
        </TouchableHighlight>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    marginTop: 20,
    textAlign: 'center',
    color: '#3F51B5',
  },
});
