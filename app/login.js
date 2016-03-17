import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  AsyncStorage,
} from 'react-native';

import ddpClient from './lib/ddp-client';

let phone, password;

export default React.createClass({
  onLogin() {
    ddpClient.call("login", [{ user : { username : phone }, password : password }], (err, result) => {
      if (err) {
        Alert.alert('Error', err.reason);
      } else {
        ddpClient.subscribe("userProfile", [], () => {
          const user = Object.values(ddpClient.collections.users.items);
          if (user) {
            AsyncStorage.setItem('login', JSON.stringify(user[0]));
            this.props.navigator.push({name: 'layout'});
          }
        });
      }
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Login
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
    paddingLeft: 20,
    paddingRight: 20,
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
