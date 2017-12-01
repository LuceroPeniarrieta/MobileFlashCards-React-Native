import React, { Component } from 'react';
import { Platform, Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { gray, purple, white, lightPurp } from '../utils/colors';
import { connect } from 'react-redux';
import { addDeck } from '../actions/midleware';

function SubmitBtn ({ onPress }) {
    return (
      <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn} onPress={onPress}>
          <Text style={styles.submitBtnText}>Submit</Text>
      </TouchableOpacity>
    )
}

export class AddDeck extends Component {

    state = {
        title: null,
        questions: []
    }

    submit = () => {
        if(this.state.title !== null){
            const key = this.state.title;
            const data = this.state;
    
            this.props.addDeckProp(key, data);
            this.props.navigation.navigate('Decks');
        } 
    }

    render() {
        return(
            <View>
                <Text style={styles.deckText}>DECK</Text>
                <TextInput style={styles.addDeck} name='title' placeholder='Title' onChangeText={title => this.setState({title})}/>
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckText: {
        marginTop: 30,
        color: lightPurp,
        fontSize: 22,
        textAlign: 'center',
    },

    addDeck: {
        flexDirection: 'column',
        borderColor: gray,
        borderWidth: 1,
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 50,
        alignItems: 'center',
        borderRadius: Platform.OS === 'ios' ? 16 : 2
    },

    iosSubmitBtn: {
        backgroundColor: lightPurp,
        marginTop: 50,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 20,
        marginRight: 20,
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

    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
});

function mapStateToProps (state){
    console.log('STATE ADD DECKS', state)
    return {
      deck: state.deck
    }
};

function mapDispatchToProps(dispatch){ 

    return {
        addDeckProp: (key, data) => dispatch(addDeck(key, data)) 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);