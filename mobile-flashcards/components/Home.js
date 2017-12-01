import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Image, Animated } from 'react-native';
import { white, green, pink, lightPurp } from '../utils/colors';
import AddDeck from './AddDeck'

class Home extends Component{
    
    render() {
        return (
            <View style={styles.home}>
                <Text>WELCOME</Text>
                <Image
                 style={{width: 200, height: 200}}
                 source= {require('../images/react-native-logo.jpg')}
                />
                <Text>READYY FOR START ?</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    home: {
        flexDirection: 'column',
        backgroundColor: green,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 100,
        alignItems: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
    },
})

export default Home;