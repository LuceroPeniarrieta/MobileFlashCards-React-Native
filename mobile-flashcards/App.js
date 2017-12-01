import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createStore, applyMiddleware, compose } from 'redux';
import { white, purple, green, lightPurp } from './utils/colors';
import { setLocalNotification } from './utils/api'
import thunk from 'redux-thunk';
import Home from './components/Home';
import Decks from './components/Decks';
import AddDeck from './components/AddDeck';
import DeckProfile from './components/DeckProfile';
import AddCart from './components/AddCard';
import Quiz from './components/Quiz';
import reducer from './reducers';

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={30} color={green} />
      },
    },

    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-cube' size={30} color={green} />
      },
    },

    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle' size={30} color={green} />
      },
    },
  }, 
  
  { tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },

  DeckProfile: {
    screen: DeckProfile,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.title,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightPurp,
      }
    })
  },

  AddCart: {
    screen: AddCart,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.title,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightPurp,
      }
    })
  },

  Quiz: {
    screen: Quiz,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.title,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightPurp,
      }
    })
  },
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }
  
  render() {
    return (
      <Provider store={createStore(reducer,
                            composeEnhancers(
                              applyMiddleware(thunk)
                          ))}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={green} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
