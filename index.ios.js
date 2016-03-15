/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  Navigator,
} from 'react-native';

import Login from './app/login';
import Layout from './app/layout';

class react_native_basic extends Component {
  renderScene(route, nav) {
    var Component = route.name === 'login' ? Login : Layout;
    return (
      <Component route={route} navigator={nav} />
    );
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'login' }}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
      />
    );
  }
}

AppRegistry.registerComponent('react_native_basic', () => react_native_basic);
