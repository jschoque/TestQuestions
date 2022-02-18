import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { DrawerScreenProps } from '@react-navigation/drawer';

interface Props extends DrawerScreenProps<any, any>{};


const HomeScreen = ({ navigation }: Props) => {
    const redirect = () => {
        navigation.navigate('Quiz', {reload: true})
    }
    return (
        <View style={styles.container} >
            <Text style={styles.title}>Welcome to the Trivia Challenge!</Text>
            <Text style={styles.subtitle}>You will be presented with 10 True or False questions.</Text>
            <Text style={styles.label}>Can you score 100%?</Text>
            <TouchableOpacity style={styles.button} onPress={() => redirect()}>
                <Text style={styles.btnText}>BEGIN</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen;


const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginHorizontal: 50,
        marginTop: 20
    },
    subtitle: {
        fontSize: 25,
        fontWeight: 'normal',
        marginHorizontal: 50,
        marginTop: '50%'
    },
    label: {
        fontSize: 25,
        fontWeight: 'normal',
        marginHorizontal: 50,
        marginTop: '25%'
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
    btnText: {
        color: 'white',
        fontSize: 20
    },
    container: {
        backgroundColor: '#abc',
        textAlign: 'center'
    },
});
