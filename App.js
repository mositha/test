import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

// import * as firebase from 'firebase';
// import 'firebase/firestore';

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: 'AIzaSyCaHkSQGdyvtyTEK-Ys2AjpKuhDu0rxegw',
//   authDomain: 'mycollctor.firebaseapp.com',
//   databaseURL: 'https://mycollctor.firebaseio.com',
//   projectId: 'mycollctor',
//   storageBucket: 'mycollctor.appspot.com',
//   messagingSenderId: '198939433139'
// };

// firebase.initializeApp(firebaseConfig);

const mapStateToProps = state => {
  console.log(state);
  return { ...state };
};

class AppScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false
    };
    // console.log('firebase', firebase);
  }
  state = {
    isLoadingComplete: false
  };
  render() {
    {
      console.log('STATE', this.state);
    }
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
    // console.log('firestore', firebase.firestore);
    // const db = firebase.firestore();
    // db.settings({
    //   timestampsInSnapshots: true
    // });
    // const userRef = db.collection('collector').add({
    //   name: 'Katatonia',
    //   albumsCount: 15
    // });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const ConnectedAppScreen = connect(mapStateToProps)(AppScreen);

export default class RootComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedAppScreen />
      </Provider>
    );
  }
}
