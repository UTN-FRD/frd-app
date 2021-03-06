// @flow
import React, { Component } from 'react';
import Exponent, { Asset, Constants, Font } from 'exponent';
import Ionicons from '@exponent/vector-icons/Ionicons';
import {
  AppState,
  Platform,
  Navigator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import theme from './theme';
import { Info, Schedule, Talk } from './scenes';
const Scenes = { Info, Schedule, Talk };

const DEFAULT_VIEW = 'Schedule';

class WorkshopApp extends Component {
  state = {
    ready: false,
  };

  componentWillMount() {
    this._downloadAssetsAsync();
  }

  _downloadAssetsAsync = async () => {
    const downloadAsset = asset => Asset.fromModule(asset).downloadAsync();

    await Promise.all([
      downloadAsset(require('./scenes/Schedule/images/workshop-delta3.jpg')),
      Font.loadAsync(Ionicons.font),
    ]);

    this.setState({ ready: true });
  };

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
  }

  render() {
    const renderScene = (route, navigator) => {
      const SceneComponent = Scenes[route.scene];

      return <SceneComponent {...route.props} navigator={navigator} />;
    };

    const TRANSITION_KEYS = Object.keys(Navigator.SceneConfigs);

    const configureScene = route => {
      if (
        route.transitionKey && !TRANSITION_KEYS.includes(route.transitionKey)
      ) {
        console.warn(
          'Warning: Invalid transition key `' +
            route.transitionKey +
            '` supplied to `Navigator`. Valid keys: [\n' +
            TRANSITION_KEYS.join('\n') +
            '\n]'
        );
        return Navigator.SceneConfigs.PushFromRight;
      }

      return route.transitionKey
        ? Navigator.SceneConfigs[route.transitionKey]
        : {
            ...Navigator.SceneConfigs.PushFromRight,
            gestures: route.enableSwipeToPop
              ? {
                  pop: Navigator.SceneConfigs.PushFromRight.gestures.pop,
                }
              : null,
          };
    };

    return (
      <View style={styles.container}>
        <Navigator
          configureScene={configureScene}
          initialRoute={{ scene: DEFAULT_VIEW, index: 0 }}
          renderScene={renderScene}
          sceneStyle={styles.scenes}
          style={styles.navigator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: 'red',
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    backgroundColor: 'black',
  },
  scenes: {
    backgroundColor: theme.color.sceneBg,
    overflow: 'visible',
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.33,
    shadowRadius: 5,
  },
});

module.exports = WorkshopApp;
