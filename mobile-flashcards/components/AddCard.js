import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions/midleware'
import { white, green, pink, lightPurp, gray } from '../utils/colors';

function SubmitBtn ({ onPress }) {
    return (
      <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn} onPress={onPress}>
          <Text style={styles.submitBtnText}>Submit</Text>
      </TouchableOpacity>
    )
}

class AddCart extends Component {

    state = {
        question: null,
        answer: null
    }

    addCart = () => {
        let key = this.props.navigation.state.params.title;
        let data = this.state;

        this.props.addCardProp(key, data);
        this.props.navigation.navigate('DeckProfile', { title: key });
    }

    render () {
        const { decks } = this.props;

        return (
            <View>
                <TextInput style={styles.textInput} name='question' placeholder='Question' onChangeText={question => this.setState({question})}/>
                <TextInput style={styles.textInput} name='answer' placeholder='Answer' onChangeText={answer => this.setState({answer})}/>
                <SubmitBtn onPress={this.addCart} />
            </View> 
        )
    }
}

const styles = StyleSheet.create({

    textInput: {
        flexDirection: 'column',
        borderColor: pink,
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
})

function mapStateToProps (state){

    return {
      decks: state.decks
    }
};

function mapDispatchToProps(dispatch){ 

    return {
        addCardProp: (key, data) => dispatch(addCard(key, data)) 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCart);
