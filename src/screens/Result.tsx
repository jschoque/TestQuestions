import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import {decode} from 'html-entities';
import { Question } from '../interfaces/QuestionInterface';

interface Props extends DrawerScreenProps<any, any>{};

const ResultsScreen = ({ route, navigation }: Props) => {
    var questions = (route.params || [])
    const [correctAnswers, setcorrectAnswers] = useState(0);

    useEffect(() => {
        setcorrectAnswers(questions.filter((x: Question) => x.result == 'True').length)
    }, []);

    const redirect = () => {
        navigation.navigate('Home')
    }

    const renderQuestion = ({item}:{item:any}) => (
        <View style={styles.containerText} key={item.question} >
            <Text style={[styles.text, item.correct_answer !== item.result ? styles.textinvalid : styles.textvalid]}>
                {item.correct_answer == item.result ? ('+') : ('-')}{decode(item.question)}
            </Text>
        </View>
    )
    return (
        <View style={styles.container} >
            <Text style={styles.title}>You scored</Text>
            <Text style={styles.title}>{correctAnswers} / {questions.length}</Text>   
            <FlatList data={questions} keyExtractor={(item: Question) => item.question} renderItem={renderQuestion} />
            
            <TouchableOpacity style={styles.button} onPress={() => redirect()}>
                <Text style={styles.btnText}>PLAY AGAIN?</Text>
            </TouchableOpacity>
         </View>
    )
}

export default ResultsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#abc',
        textAlign: 'center'
    },
    containerText: {
        textAlign: 'left'
    },
    text:{
        marginTop: 10,
        fontWeight: '400',
        fontSize: 18
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginHorizontal: 50,
        marginTop: 20
    },
    buttons:{
        paddingTop:10,
        paddingBottom:10,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    btnText: {
        color: 'white',
        fontSize: 20
    },
    button: {
        backgroundColor: 'blue',
        marginHorizontal: 70,
        marginTop: '10%',
        marginBottom: '10%',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center'
    },
    textinvalid: {
        color: 'red'
    },
    textvalid: {
        color: 'blue'
    }
});