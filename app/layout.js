import React, {
  StyleSheet,
  Navigator,
  View,
  AsyncStorage,
} from 'react-native';

import ToolbarAndroid from 'ToolbarAndroid';
import Home from './home';
import Step1 from './post-task/step-1';
import Step2 from './post-task/step-2';

var ROUTES = {
  home: Home,
  step1: Step1,
  step2: Step2,
};

export default React.createClass({
  getInitialState() {
    return {
      iconLeftToolbar: require('./img/menu.png'),
    };
  },

  renderScene(route, nav) {
    var Component = ROUTES[route.name];
    return (
      <Component route={route} navigator={nav} />
    );
  },

  onIconLeftClick() {
    let numOfRoutes = this.refs.layoutNavigator.getCurrentRoutes().length;
    if (numOfRoutes > 1) {
      this.refs.layoutNavigator.pop();
      numOfRoutes--;
      if (numOfRoutes === 1) {
        this.setState({iconLeftToolbar: require('./img/menu.png')});
      }
    }
  },

  onSelectMenu(position) {
    if (position === 0) { // Post task
      this.refs.layoutNavigator.push({name: 'step1'});
      this.setState({iconLeftToolbar: require('./img/back.png')})
    } else if (position === 1) { // Open map
      // this.props.navigator.push({name: 'mapUser'});
    } else if (position === 2) {  // Logout
      AsyncStorage.removeItem('login');
      this.props.navigator.pop();
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          navIcon={this.state.iconLeftToolbar}
          onIconClicked={this.onIconLeftClick}
          title={'Hello, ' + this.props.route.message}
          titleColor="#fff"
          actions={[{title: 'Post task', show: 'never'},
                    {title: 'Map', show: 'never'},
                    {title: 'Logout', show: 'never'}]}
          onActionSelected={this.onSelectMenu}
        />
        <Navigator
          ref="layoutNavigator"
          initialRoute={{ name: 'home' }}
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
  toolbar: {
    height: 56,
    backgroundColor: 'orange',
  },
});
