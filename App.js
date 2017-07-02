import Expo from 'expo';
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { NetInfo, View, Text, Image } from 'react-native';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';

import Navigator from './src/routes';
import reducers from './src/reducers';

// https://images.pexels.com/photos/270700/pexels-photo-270700.jpeg?w=940&h=650&auto=compress&cs=tinysrgb

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      online: true,
    };
    console.ignoredYellowBox = [ 'Setting a timer' ];
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    // NetInfo.isConnected.fetch().then(isConnected => {
    //   this.setState({ online: isConnected });
    // });
  }

  componentWillUpdate(nextState, nextProps) {
    // NetInfo.isConnected.fetch().then(isConnected => {
    //   this.setState({ online: isConnected });
    // });
  }

  render() {
    return (
      <Provider store={store}>
        {
          this.state.online ?
          <Navigator /> :
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 22, textAlign: 'center' }}>
              Для работы приложения нужен интернет
            </Text>
          </View>
        }
      </Provider>
    );
  }
}
