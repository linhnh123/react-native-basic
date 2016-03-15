import React, {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
} from 'react-native';

import ddpClient from '../lib/ddp-client';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default React.createClass({
  getInitialState() {
    return {
      dataSource: ds.cloneWithRows([]),
    };
  },

  componentWillMount() {
    ddpClient.subscribe("services", [], () => {
      const services = Object.values(ddpClient.collections.service.items);
      if (services) {
        const dataSource = services.map((service) => {
          return {id: service._id, text: service.text.vi, icon: service.icon};
        });
        this.setState({dataSource: ds.cloneWithRows(dataSource)});
      }
    });
  },

  componentWillUnmount() {
    ddpClient.close();
  },

  onSelectedService(serviceId) {
    if (serviceId) {
      this.props.navigator.push({name: 'step2', serviceId: serviceId});
    } else {
      alert('Service not found');
    }
  },

  render() {
    return (
      <ListView
        style={styles.content}
        dataSource={this.state.dataSource}
        renderRow={(rowData, sectionID, rowID, highlightRow) =>
          <Text
            style={styles.item}
            onPress={this.onSelectedService.bind(this, rowData.id)}
          >
            {rowData.text}
          </Text>
        }
      />
    );
  }
});

const styles = StyleSheet.create({
  content: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  item: {
    fontSize: 20,
    padding: 20,
  },
});
