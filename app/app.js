import React, {
  StyleSheet,
  Navigator,
  View,
  Text,
  Image,
  AsyncStorage,
  Alert,
} from 'react-native';

import ddpClient from './lib/ddp-client';
import Loading from './components/loading';
import Login from './login';
import Layout from './layout';

var ROUTES = {
  login: Login,
  layout: Layout,
};

// Polyfill the process functionality needed for minimongo-cache
global.process = require("./config/db/lib/process.polyfill");

export default React.createClass({
  getInitialState() {
    return {
      loaded: false,
      isLogin: false,
    };
  },

  renderScene(route, nav) {
    var Component = ROUTES[route.name];
    return (
      <Component route={route} navigator={nav} />
    );
  },

  componentDidMount() {
    ddpClient.connect((err, wasReconnect) => {
      if (err) {
        Alert.alert('Error', 'Connection failed, try again...');
      } else {
        AsyncStorage.getItem('login').then((value) => {
          setTimeout(() => {
            this.setState({
              loaded: true,
              isLogin: value ? true : false,
            });
          }, 1000);
        }).done();
      }
    });
  },

  componentWillUnmount() {
    ddpClient.close();
  },

  render() {
    if (!this.state.loaded) {
      return (
        <Loading />
      );
    }
    return (
      <View style={styles.container}>
        <Navigator
          ref="appNavigator"
          initialRoute={{ name: this.state.isLogin ? 'layout' : 'login' }}
          renderScene={this.renderScene}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }}
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
