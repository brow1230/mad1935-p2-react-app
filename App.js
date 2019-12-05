import React from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import RestaurantList from './screens/RestaurantList'
const AppNav = createStackNavigator ({
  Home: {
    screen: RestaurantList,
    navigationOptions : {
      title: 'Home',
      headerStyle: {
        backgroundColor: 'purple'
      } 
    }
  }
})


export default createAppContainer(AppNav)
