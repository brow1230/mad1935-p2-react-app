import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class RestaurantDetails extends Component {
    static navigationOptions = ({navigation}) => {
        return {title: navigation.state.params.restaurant.name}
    }
    constructor(props){
        super(props)
    }
    render() {
        // console.log(this.props.state)
        const restaurant = this.props.navigation.state.params.restaurant
        return (
            <View style={styles.container}>
                <Text style={styles.name}> {restaurant.name} </Text>
                <Text> {restaurant.location.display_address[0]} </Text>
                <Text> {restaurant.location.display_address[1]} </Text>
                <Text> {Math.floor(restaurant.distance)}m Away </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex : 1, 
        backgroundColor: 'yellow',
        paddingHorizontal: '5%',
        paddingTop: '5%',
    },
    name: {
        fontSize: 26,
        fontWeight: '300'
    }
})