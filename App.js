import React, { Component } from 'react';
import { AppRegistry, ActivityIndicator, ListView, Text, View } from 'react-native';

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    return fetch('http://api.population.io/1.0/population/Brazil/today-and-tomorrow/?format=json')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.total_population),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ alignItems: 'center', flex: 1, paddingTop: 200 }}>
        <Text style={{ fontSize: 20, color: 'orange' }}>População de hoje e amanhã do Brasil.......{'\n'}</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={{ color: 'blue' }}>Data: {rowData.date} - População: {rowData.population}</Text>}
        />
      </View>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Movies);
