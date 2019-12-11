import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'
import {AppLoading} from 'expo'
import Carousel from 'react-native-banner-carousel'

export default class RestaurantDetails extends Component {
    static navigationOptions = ({navigation}) => {
        return {title: navigation.state.params.restaurant.name}
    }
    
    constructor(props){
        super(props)
        this.state = {
            restaurant : {
                id : this.props.navigation.state.params.restaurant.id,
                distance : this.props.navigation.state.params.restaurant.distance
            },
            extraRestaurantInfo : {},
            ready: false
        }
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData = () => {
    
        const uri = `https://api.yelp.com/v3/businesses/${this.state.restaurant.id}`
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
            
            console.log(data)
            this.setState({
                extraRestaurantInfo: data,
                ready: true
            })
        })
        .catch((err) => {
            alert(err)
        })
    }
    renderPage(image, index) {
        const Banner = {
            width: Dimensions.get('screen').width,
            height: 200 
        }
        return (
            <View key={index}>
                <Image style={{ width: Banner.width, height: Banner.height }} source={{ uri: image }} />
            </View>
        );
    }
    
    render() {
        if(!this.state.ready){
            return <AppLoading/>
        }else{
            const images = this.state.extraRestaurantInfo.photos
            
            return (
                <View style={styles.container}>
                    <Carousel>
                        {images.map((image, index) => this.renderPage(image, index))}   
                    </Carousel>
                    <Text style={styles.name}> {this.state.extraRestaurantInfo.name} </Text>
                    <Text> {this.state.extraRestaurantInfo.location.display_address[0]} </Text>
                    <Text> {this.state.extraRestaurantInfo.location.display_address[1]} </Text>
                    <Text> {Math.floor(this.state.restaurant.distance)}m Away </Text>
                </View>
            )
        }
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