import React, {
  StyleSheet,
  View,
  Text,
  DatePickerAndroid,
  TimePickerAndroid,
  Picker,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';

let cost = 0, note = '', tempDate = {}, tempTime = {};

export default React.createClass({
  getInitialState() {
    return {
      date: '',
      time: '',
      duration: 2,
    };
  },

  onShowDatepicker() {
    try {
      DatePickerAndroid.open({
        date: new Date(),
        minDate: new Date(),
        // maxDate:
      }).then((response) => {
        if (response.action !== DatePickerAndroid.dismissedAction) { // Click OK button
          tempDate = {
            day: response.day,
            month: response.month,
            year: response.year,
          };
          this.setState({date: response.day + '/' + response.month + '/' + response.year}, () => {
            this.onShowTimePicker();
          });
        } else {  // Click Cancel button
          this.onShowDatepicker();
        }
      });
    } catch ({code, message}) {
      Alert.alert('Cannot open date picker', message);
    }
  },

  onShowTimePicker() {
    try {
      TimePickerAndroid.open({
        hour: 8,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      }).then((response) => {
        if (response.action !== DatePickerAndroid.dismissedAction) {
          tempTime = {
            hour: response.hour,
            minute: response.minute,
          };
          this.setState({time: response.hour + ':' + response.minute});
        } else {
          this.onShowTimePicker();
        }
      });
    } catch ({code, message}) {
      Alert.alert('Cannot open time picker', message);
    }
  },

  componentDidMount() {
    this.onShowDatepicker();
  },

  onChangeDuration(value) {
    this.setState({duration: value});
  },

  onNext() {
    const taskInfo = this.props.route.taskInfo;
    if (taskInfo) {
      taskInfo.datetime = new Date(tempDate.year, tempDate.month, tempDate.day, tempTime.hour, tempTime.minute, 0);
      taskInfo.duration = this.state.duration;
      taskInfo.cost = this.cost;
      taskInfo.note = this.note;
    }
    this.props.navigator.push({name: 'step4', taskInfo: taskInfo});
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.item} onPress={this.onShowDatepicker}>
          {this.state.date.length === 0 ? 'Select date' : this.state.date}
        </Text>
        <Text style={styles.item} onPress={this.onShowTimePicker}>
          {this.state.time.length === 0 ? 'Select time' : this.state.time}
        </Text>
        <Picker
          selectedValue={this.state.duration}
          onValueChange={this.onChangeDuration}
          mode="dropdown"
        >
          {['2','3','4','5','6','7','8'].map((item) => (
            <Picker.Item key={item} label={item + 'h'} value={item} />
          ))}
        </Picker>
        <TextInput
          placeholder="Cost"
          keyboardType="phone-pad"
          onChangeText={text => this.cost = text}
        />
        <TextInput
          placeholder="Note"
          onChangeText={text => this.note = text}
        />
        <TouchableHighlight
          onPress={this.onNext}
          underlayColor="#F5FCFF">
          <View>
            <Text style={styles.button}>Next</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  item: {
    fontSize: 20,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    textAlign: 'center',
    color: '#3F51B5',
  },
});
