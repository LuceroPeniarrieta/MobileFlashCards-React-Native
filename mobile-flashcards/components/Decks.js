import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { white, green, pink, orange } from '../utils/colors';
import { clear } from '../utils/api'
import { getDecks } from '../actions/midleware';

function ClearBtn ({ onPress }) {
    return (
      <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn} onPress={onPress}>
          <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>
    )
}

class Decks extends Component { 

    state = {
        data: false, 
    }

    componentDidMount () {
        this.props.getDecksProp();
    }

    clearDecks = () => {
        console.log('Clean.....')
        clear();
    }

    render () {
        const { decks } = this.props;
        
        return (
            <View>
                {Object.keys(decks).map((key) => {
                    return (
                        <View key={key} style={styles.deck}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckProfile', { 
                                title: decks[key].title,
                                cards: decks[key].questions.length
                                })}>
                            <Text>{decks[key].title}</Text> 
                            <Text>{`${decks[key].questions.length} cards`}</Text> 
                            </TouchableOpacity>
                        </View>
                    )
                })}
                
          </View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'column',
        backgroundColor: pink,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        alignItems: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
      },

    iosSubmitBtn: {
        backgroundColor: orange,
        marginTop: 50,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 50,
        marginRight: 50,
      },

    androidSubmitBtn: {
        backgroundColor: orange,
        marginTop: 50,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
});

function mapStateToProps (state){
    return {
      decks: state.decks
    }
};

function mapDispatchToProps(dispatch){ 
    return {
        getDecksProp: () => dispatch(getDecks())  
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Decks);