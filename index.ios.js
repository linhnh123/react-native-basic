/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
} from 'react-native';

import App from './app/app';

class react_native_basic extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('react_native_basic', () => react_native_basic);
