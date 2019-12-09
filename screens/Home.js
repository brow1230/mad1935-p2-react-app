import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { AppLoading } from 'expo' 
import { Content, Text, Button } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font'

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        };
    }

    async componentDidMount(){
        await Font.loadAsync({
            Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font
        });
        this.setState({ isReady: true });
    }

    render() {
        if (!this.state.isReady){
            return (
                <View>
                    <ActivityIndicator size="large" color="#888882" style={this.styles.spinner}/>
                </View>
            )
        }
        return (
            <View>
                <Button danger onPress={() => this.props.navigation.navigate('RestaurantList')}>
                    <Text>Tap to Load resutanrats</Text>
                </Button>
            </View>
        )
    }

    styles = StyleSheet.create({
        container: {
            flex: 1 ,
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
            flexShrink: 1
        },
        spinner: {
            margin: 100
        }
    })
}

