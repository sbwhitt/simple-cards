'use strict';

import {
  createStackNavigator,
} from 'react-navigation';

import HomeScreen from './source/screens/HomeScreen';
import CardScreen from './source/screens/CardScreen';
import { Themes } from './source/themes/Themes.js';

let theme = Themes.dark;

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
