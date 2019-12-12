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
    renderPage(image, index, ) {
            // return(
            //     <View key={index}>
            //         <Image style={{ width: Banner.width, height: Banner.height }} source={require("../assets/Artboard1.png")} />
            //     </View>
            // )
            console.log("run")
            return (
                <View key={index}>
                    <Image style={{ width: styles.banner.width, height: styles.banner.height }} source={{ uri: image }} />
                </View>
            );
                
    }
    //wow. much star
    starSelector(){
        let star = this.state.extraRestaurantInfo.rating
        switch(star){
            case 0:
                return require('../img/stars_regular_0.png')
            case 1:
                return require('../img/stars_regular_1.png')
            case 1.5:
                return require('../img/stars_regular_1_half.png')
            case 2:
                return require('../img/stars_regular_2.png')
            case 2.5:
                return require('../img/stars_regular_2_half.png')
            case 3:
                return require('../img/stars_regular_3.png')
            case 3.5:
                return require('../img/stars_regular_3_half.png')
            case 4:
                return require('../img/stars_regular_4.png')
            case 4.5:
                return require('../img/stars_regular_4_half.png')
            case 5:
                return require('../img/stars_regular_5.png')
        }
    }
    
    
    render() {
        let source = this.starSelector()
        console.log(source)
        if(!this.state.ready){
            return <AppLoading/>
        }else{
            let images = this.state.extraRestaurantInfo.photos
            console.log(images)
            let map 
            if (!images.length){
                console.log('false')
                map = <View key={1}>
                        <Image style={{ width: styles.banner.width, height: styles.banner.height }} source={require('../assets/Artboard1.png')} />
                      </View>
            }else{
                map = images.map((image, index) => this.renderPage(image, index))

            }
            return (
                <View style={styles.container}>
                    <Carousel 
                        style={styles.carousel}
                        >
                        {map}
                    </Carousel>
                    <Image source={source} />
                    <Text style={styles.name}> {this.state.extraRestaurantInfo.name} </Text>
                    <Text> {this.state.extraRestaurantInfo.location.display_address[0]} </Text>
                    <Text> {this.state.extraRestaurantInfo.location.display_address[1]} </Text>
                    <Text> {this.state.extraRestaurantInfo.price} </Text>
                    <Text> {this.state.extraRestaurantInfo.display_phone} </Text>
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
        // paddingHorizontal: '5%',
    },
    name: {
        fontSize: 26,
        fontWeight: '300'
    },
    banner: {
        width: Dimensions.get('screen').width,
        height: 200 
    }
})