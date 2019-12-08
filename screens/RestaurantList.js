import React, { Component } from 'react'
import { View, Platform  } from 'react-native'
import {AppLoading} from 'expo'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

export default class RestaurantList extends Component {

    constructor(props){
        super(props);
        this.state = {
            ready: false,
            status: "",
            restaurantList: [],
            ll: {lat: "", lng: ""},
            data: ""
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
            let stringData = JSON.stringify(data)
            this.setState({data: stringData, ready: true})
        })
        .catch((err) => {
            alert(err)
        })
    }

    render() {
        if (!this.state.ready){
            return <AppLoading/>
        }
        //const restaurant = this.state.data.businesses[0].alias
        return (
            <Container>
              <Content>
                <List>
                  <ListItem thumbnail>
                    <Left>
                       {/* Add source tag to thumbnail for img...  */}
                      {/* <Thumbnail square  /> */}
                    </Left>
                    <Body>
                        <Text>McDonalds</Text>
                        <Text note numberOfLines={1}>The Best (HA!) Burgers. To die for.</Text>
                    </Body>
                    <Right>
                      <Button transparent>
                        <Text>View</Text>
                      </Button>
                    </Right>
                  </ListItem>
                </List> 
              </Content>
            </Container>
          );
    }
}