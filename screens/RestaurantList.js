import React, { Component } from 'react'
import { View, FlatList  } from 'react-native'
import {AppLoading} from 'expo' 

import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

export default class RestaurantList extends Component {

    constructor(props){
        super(props);
        this.state = {
            ready:false,
            restaurantList: [],
            data: ""
        }
    }

    fetchData = () => {
        const uri = "https://api.yelp.com/v3/businesses/search?latitude=45.4156&longitude=-75.6886"
        const API_KEY = "k6tgobWytbIiwMCsLbyimwo27gJ-d1LO5SZn0XvAd_8dR5XOKUT2Sjpg0p2dc8SiylqFKa-TMF5l73d6z6IGI1bviHIbXAkZOv_KnZuIX_XsIimmfN_b3lJlFfDrXXYx"
        const authKey = `Bearer ${API_KEY}`
        let header = new Headers()

        //header.append("Access-Control-Allow-Origin", "*")
        header.append("Authorization", authKey)
        header.append("Postman-Token", "1cf6818e-abe6-4a94-8c4b-71fe51408d67")

        let req = new Request(uri, {method: "GET", headers: header})
    
        fetch(req)
        .then((res) => {
            if(res.ok){
                return res.json();
            }else{
                throw new Error("response not ok");
            }
        })
        .then((data) => {
            this.setState({
                data : data.businesses,
                ready: true
            })
            alert("boom got it")
        })
        .catch((err) => {
            alert(err)
        })
    }
    componentDidMount(){
        this.fetchData()
    }
    render() {
        if (!this.state.ready){
            return <AppLoading/>
        }
        // const restaurant = this.state.data.businesses[0]
        return (
            <Container>
              <Content>
              <FlatList
                    data={this.state.data}
                    keyExtractor={({id}, i) => id}
                    renderItem = {({item})=>(
                  <ListItem thumbnail onPress={() => this.props.navigation.navigate('RestaurantDetails',{restaurant: item})}>
                    <Left>
                       {/* Add source tag to thumbnail for img...  */}
                      {/* <Thumbnail square  /> */}
                    </Left>
                    <Body>
                      <Text>{item.name}</Text>
                    <Text note numberOfLines={2}>{item.price} {item.rating} *</Text>
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
}