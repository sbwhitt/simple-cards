'use strict';

import {
  createStackNavigator,
} from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import CardScreen from './screens/CardScreen';
import { Themes } from './Themes.js';

export let theme = Themes.dark;

const App = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Card: { screen: CardScreen },
  },
  {
    headerMode: 'screen',
    cardStyle: { backgroundColor: theme.darkPrimary, },
  },
);

export default App;
