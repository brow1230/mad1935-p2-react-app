import React from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Home from './screens/Home'
import RestaurantList from './screens/RestaurantList';
const AppNav = createStackNavigator ({
  Home: {
    screen: Home,
    navigationOptions : {
      title: 'Home',
      headerStyle: {
        backgroundColor: '#CD1204',
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
        backgroundColor: '#CD1204',
      },
      headerTitleStyle: {
        color: 'white'
      }
    }
  }
})


export default createAppContainer(AppNav)
