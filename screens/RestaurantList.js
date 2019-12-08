import React, { Component } from 'react'
import { View  } from 'react-native'
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
                data : data,
                ready: true
            })
            console.log(this.state.data.businesses[0])
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
        const restaurant = this.state.data.businesses[0].alias
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