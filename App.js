import React from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Home from './screens/Home'
import RestaurantList from './screens/RestaurantList';
import RestaurantDetails from './screens/RestaurantDetails.js'
const AppNav = createStackNavigator ({
  Home: {
    screen: Home,
    navigationOptions : {
      title: 'Home',
      headerStyle: {
        backgroundColor: '#D32323',
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  },
  RestaurantList: {
    screen: RestaurantList,
    navigationOptions: {
      title: 'Restaurant List',
      headerStyle: {
        backgroundColor: '#D32323',
      },
      headerTitleStyle: {
        color: 'white'
      },
      // headerback
    }
  },
  RestaurantDetails: {
    screen: RestaurantDetails,
    navigationOptions: {
      // title: 'Restaurant Details',
      headerStyle: {
        backgroundColor: '#D32323',
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  }
})


export default createAppContainer(AppNav)
