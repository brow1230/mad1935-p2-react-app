import React, { Component } from 'react'
import { View, Platform, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import {AppLoading} from 'expo'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient'

export default class RestaurantList extends Component {

    constructor(props){
        super(props);
        this.state = {
            ready: false,
            status: "",
            restaurantList: [],
            ll: {lat: "", lng: ""},
            businesses: ""
        }
    }

    componentDidMount(){
      if (Platform.OS === 'android' && !Constants.isDevice) {
            console.log("This will only work on a device.")
          } else {
            this.getLocationAsync()
          } 
    }

    getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION)
        if (status !== "granted") {
            alert("Permission to access location was denied")
          }
    
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ll: {lat: location.coords.latitude, lng: location.coords.longitude}})
        this.fetchData()
    }

    fetchData = () => {
        const lat = this.state.ll.lat
        const lng = this.state.ll.lng
        const uri = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}&sort_by=distance`
        const API_KEY = "k6tgobWytbIiwMCsLbyimwo27gJ-d1LO5SZn0XvAd_8dR5XOKUT2Sjpg0p2dc8SiylqFKa-TMF5l73d6z6IGI1bviHIbXAkZOv_KnZuIX_XsIimmfN_b3lJlFfDrXXYx"
        const authKey = `Bearer ${API_KEY}`
        let header = new Headers()

        header.append("Authorization", authKey)
        header.append("Postman-Token", "1cf6818e-abe6-4a94-8c4b-71fe51408d67")

        let req = new Request(uri, {method: "GET", headers: header})
    
        fetch(req)
        .then((res) => {
            if(res.ok){
                return res.json();
            }else{
                throw new Error("There was an error accessing Yelp");
            }
        })
        .then((data) => {
            this.setState({
                businesses: data.businesses,
                ready: true
            })
        })
        .catch((err) => {
            alert(err)
        })
    }

    render() {
        if (!this.state.ready){
            return (
              <View>
                <ActivityIndicator size="large" color="#888882" style={this.styles.spinner}/>
              </View>
            )
        }
        return (
            <Container>
              <Content>
              <FlatList
                    data={this.state.businesses}
                    keyExtractor={({id}, i) => id}
                    renderItem = {({item})=>(
                  <ListItem thumbnail onPress={() => this.props.navigation.navigate('RestaurantDetails', {restaurant: item})}>
                    <Left>
                      {/* Add source tag to thumbnail for img...  */}
                      {/* <Thumbnail square  /> */}
                    </Left>
                    <Body>
                      <Text>{item.name}</Text>
                      <Text note numberOfLines={1}>{(Math.round((item.distance / 1000) * 100) / 100).toFixed(2)}km away</Text>
                    </Body>
                    <Right>
                      {/* <Button transparent onPress={() => this.props.navigation.navigate('RestaurantDetails',{restaurant: item})}> */}
                      {/* <Text>WE can find something to add in for the left and right!!</Text> */}
                      {/* </Button> */}
                    </Right>
                  </ListItem>
                  )}
              />
              </Content>
            </Container>
          );
    }

    styles = StyleSheet.create({
      spinner: {
        margin: 100
      }
    })
}