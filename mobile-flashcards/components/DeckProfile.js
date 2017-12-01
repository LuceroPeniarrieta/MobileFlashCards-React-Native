import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { white, green, pink, lightPurp } from '../utils/colors';

function AddCardBtn ({ onPress }) {
    return (
      <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn} onPress={onPress}>
          <Text style={styles.buttonText}>Add Card</Text>
      </TouchableOpacity>
    )
}

function StartQuizBtn ({ onPress }) {
    return (
      <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn} onPress={onPress}>
          <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    )
}

class DeckProfile extends Component { 

    addCard = () => {
        
        this.props.navigation.navigate('AddCart', { title: this.props.navigation.state.params.title })  
    }

    startQuiz = () => {
        
        this.props.navigation.navigate('Quiz', { title: this.props.navigation.state.params.title })  
    }

    render () {
        const { decks } = this.props;
        let key = this.props.navigation.state.params.title;

        return(
            <View>
                <View style={styles.deck}>
                    <Text>{decks[key].title}</Text>
                    <Text>{`${decks[key].questions.length} cards`}</Text>   
                </View>
                
                <AddCardBtn onPress={this.addCard} />
                <StartQuizBtn onPress={this.startQuiz} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'column',
        backgroundColor: green,
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
        backgroundColor: lightPurp,
        marginTop: 50,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 50,
        marginRight: 50,
      },

    androidSubmitBtn: {
        backgroundColor: lightPurp,
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
        fontSize: 14,
        textAlign: 'center',
    },
});

function mapStateToProps (state){
    return {
      decks: state.decks
    }
};

export default connect(mapStateToProps)(DeckProfile);