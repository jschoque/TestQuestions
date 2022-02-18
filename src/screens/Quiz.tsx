import React, {useEffect, useState} from 'react';
import { View, Text,  StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { QuestionData, Question } from '../interfaces/QuestionInterface';
import { getQuestions } from '../service/QuestionService';
import { DrawerScreenProps } from '@react-navigation/drawer';
import {decode} from 'html-entities';

interface Props extends DrawerScreenProps<any, any>{};

const QuizScreen = ({ route, navigation }: Props) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [count, setCount] = useState(0)

    //Consulta el api de las preguntas
    useEffect(() => {
        getQuestions().then((response: QuestionData) => {
            setQuestions(response.results)
        });
    }, [route])

    //Si termino redirecciona a los resultados
    //Sino aumenta el contador para mostrar la siguiente pregunta
    const responseQuestion = (resp: string) => {
        if(count > 9){
            setQuestions([])
            navigation.navigate('Results', questions)
        }else{
            addResponse(resp);
        
            const next = count + 1
            setCount(next)
        }
    }

    //Agrega la respuesta que se pulso
    const addResponse = (resp: string) => {
        questions[count].result = resp;
    }

    //Si no hay datos muestra un loading
    if(questions.length < 1) return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );

    return (
        <View style={styles.container} >
            <Text style={styles.title}>{questions[count].category}</Text>
            <View style={styles.containerQuiz}>
                <Text style={styles.subtitle}>{decode(questions[count].question)}</Text>
            </View>
            <Text>{count + 1}/{questions.length}</Text>
            <View style={styles.containerButtonsView}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.buttons, {backgroundColor:'#39a760'}]}
                        onPress={() => responseQuestion('True')}>
                        <Text style={styles.btnText}>True</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.buttons, {backgroundColor:'#7a1b1b'}]} onPress={() => responseQuestion('False')}>
                        <Text style={styles.btnText}>False</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default QuizScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#abc',
        textAlign: 'center'
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginHorizontal: 40,
        marginTop: 20
    },
    subtitle: {
        fontSize: 20,
        marginHorizontal: 50,
        marginVertical: 50
    },
    containerQuiz: {
        marginHorizontal: 50,
        marginVertical: 50,
        marginTop: '10%',
        borderColor: 'black',
        borderWidth: 2,
        borderBottomWidth:1,
        borderTopWidth:1,
        height: 400
    },
    containerButtonsView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5%'
    },
    buttonContainer: {
        flex: 1,
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
});