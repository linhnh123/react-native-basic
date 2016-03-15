import React, {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default React.createClass({
  render() {
    return (
      <View>
        <Text>Step 2 {this.props.route.serviceId}</Text>
      </View>
    );
  }
});
