import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

export default class RestaurantList extends Component {

    constructor(props){
        super(props);
        this.state = {
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
                data: JSON.stringify(data)
            })
        })
        .catch((err) => {
            alert(err)
        })
    }

    render() {
        return (
            <View>
                <Button title="Click" onPress={this.fetchData}/>
                <Text> This is gonna be the list. </Text>
                <Text> This is gonna be the list. </Text>
            </View>
        )
    }
}