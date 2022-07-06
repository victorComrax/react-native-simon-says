import { NavigationContainerRef, RouteProp } from '@react-navigation/native';
import React, { FunctionComponent, useState } from 'react';
import { useEffect } from 'react';
import { Alert, Button, Modal, Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../components/Table/Table';
import { addScore } from '../src/store/slices/scoresSlice';
import { RootState } from '../src/store/store';


const ResultsScreen: FunctionComponent<{ navigation: NavigationContainerRef, route: RouteProp<{ params: { score: number } }, 'params'> }> = ({ navigation, route }) => {
    const [sortedScores, setSortedScores] = useState<{ name: string, score: number }[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(true);
    const [username, setUsername] = useState<string>('');

    const dispatch = useDispatch();
    const { score } = route.params;
    const scores = useSelector((state: RootState) => state.scores);

    useEffect(() => {
        if (scores.length !== 0) {
            sortScores();
        }
    }, []);

    useEffect(() => {
        sortScores();
    }, [scores])

    const sortScores = () => {
        const arr = [...scores];
        const sort = arr.sort((a, b) => a.score < b.score ? 1 : -1);
        const slice = sort.slice(0, 10);
        setSortedScores(slice);
    }

    const playAgain = () => {
        navigation.navigate('Game');
    }

    const saveScore = () => {
        if (username.length < 1) {
            Alert.alert('Enter valid user name')
            return;
        }
        dispatch(addScore({ score: score, name: username }))
        setModalVisible(!modalVisible);
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Enter your name :</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setUsername}
                            value={username}
                            keyboardType="default"
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={saveScore}>
                            <Text style={styles.textStyle}>Continue</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={styles.table}>
                <Table data={sortedScores} />
            </View>
            <View style={{ width: "50%", alignSelf: 'center' }}>
                <Button title='Play again' onPress={playAgain} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    table: {
        flex: 0.5,
        width: '50%',
        alignSelf: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 80,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    input: {
        height: 40,
        width: 150,
        margin: 12,
        borderWidth: 1,
        borderColor: 'lightgrey',
        padding: 10,
    },

})

export default ResultsScreen;