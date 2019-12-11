import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class RestaurantDetails extends Component {
    static navigationOptions = ({navigation}) => {
        return {title: navigation.state.params.restaurant.name}
    }
    constructor(props){
        super(props)
        this.state = {
            restaurant : this.props.navigation.state.params.restaurant,

        }
    }
    fetchData = () => {
    
        const uri = `https://api.yelp.com/v3/businesses/${id}`
        const API_KEY = "k6tgobWytbIiwMCsLbyimwo27gJ-d1LO5SZn0XvAd_8dR5XOKUT2Sjpg0p2dc8SiylqFKa-TMF5l73d6z6IGI1bviHIbXAkZOv_KnZuIX_XsIimmfN_b3lJlFfDrXXYx"
        const authKey = `Bearer ${API_KEY}`
        let header = new Headers()

        header.append("Authorization", authKey)

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
        return (
            <View style={styles.container}>
                <Text style={styles.name}> {this.state.restaurant.name} </Text>
                <Text> {this.state.restaurant.location.display_address[0]} </Text>
                <Text> {this.state.restaurant.location.display_address[1]} </Text>
                <Text> {Math.floor(this.state.restaurant.distance)}m Away </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex : 1, 
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        paddingTop: '5%',
    },
    name: {
        fontSize: 26,
        fontWeight: '300'
    }
})