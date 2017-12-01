import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Animated, Button } from 'react-native';
import { getDailyReminderValue, clearLocalNotification, setLocalNotification } from '../utils/api';
import { connect } from 'react-redux';
import { white, green, pink, lightPurp, blue, red } from '../utils/colors';
import Modal from 'react-native-modal';

class Quiz extends Component {
    
    nextQuestion = () => {
        let index;
        let key = this.props.navigation.state.params.title;
        index = this.state.indexQuestions + 1;

        if(index < this.props.decks[key].questions.length){
            this.setState({
                indexQuestions: index
            })
        }
        else {
            this.setState({ isModalVisible: true })

            clearLocalNotification()
            .then(setLocalNotification)
        }
    }

    setText = () => {
        if(this.state.text === 'Question') {
            this.setState({
                text: 'Answer'
            })
        }
        else {
            this.setState({
                text: 'Question'
            })
        }
    }

    plusPercentageScore = () => {
        let actualScore = this.state.points;
        let key = this.props.navigation.state.params.title;

        if('Yes' === this.props.decks[key].questions[this.state.indexQuestions].answer){
            actualScore = actualScore + 1;
            this.state.points = actualScore;

            this.setState({
                points: actualScore
            })
        }

        this.nextQuestion();
    }

    lessPercentageScore = () => {
        let actualScore = this.state.points;
        let key = this.props.navigation.state.params.title;

        if('No' === this.props.decks[key].questions[this.state.indexQuestions].answer){
            actualScore = actualScore + 1;
            this.state.points = actualScore;

            this.setState({
                points: actualScore
            })
        }

        this.nextQuestion();
    }

    state = {
        opacity: new Animated.Value(0), 
        text: 'Answer',
        indexQuestions: 0,
        points: 0,
        isModalVisible: false
    } 

    componentDidMount() { 
        const { opacity } = this.state
        Animated.timing(opacity, { toValue: 1, duration: 1000}).start();
    }

    render () {
        const { opacity } = this.state
        const { decks } = this.props;
        let key = this.props.navigation.state.params.title;

        return (
            <Animated.View style={{opacity}}>

                <Text>{`${this.state.indexQuestions + 1}/${this.props.decks[key].questions.length}`}</Text>

                <Text style={styles.quiz}>{
                    this.state.text == 'Answer'
                    ?decks[key].questions[this.state.indexQuestions].question
                    :decks[key].questions[this.state.indexQuestions].answer
                }</Text>

                <Button style={styles.buttonText}
                title={this.state.text}
                onPress={this.setText}
                />

                <TouchableOpacity style={{
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
                    },}} 
                onPress={this.plusPercentageScore}>
                <Text style={styles.buttonText}>Correct</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: red,
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
                    },}} 
                onPress={this.lessPercentageScore}>
                <Text style={styles.buttonText}>Incorrect</Text>
                </TouchableOpacity> 

                <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn} onPress={this.nextQuestion}>
                <Text style={styles.buttonText}>Next Question</Text>
                </TouchableOpacity> 

                <View style={{ flex: 1 }}>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{ flex: 1 }}>
                            <Text style={{
                                marginTop: 500,
                                color: white,
                                fontSize: 14,
                                textAlign: 'center',
                            }}>{`SCORE: ${this.state.points}`}</Text>
                        </View>
                    </Modal>
              </View>
                
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    quiz: {
        flexDirection: 'column',
        backgroundColor: blue,
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
        marginTop: 20,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 50,
        marginRight: 50,
      },

    androidSubmitBtn: {
        backgroundColor: lightPurp,
        marginTop: 20,
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

    modalContent: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f7021a',
        padding: 100
    },
});

function mapStateToProps (state){
    return {
      decks: state.decks
    }
};

export default connect(mapStateToProps)(Quiz);