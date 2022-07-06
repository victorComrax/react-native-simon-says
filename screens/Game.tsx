import { NavigationContainerRef } from '@react-navigation/native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Box } from '../components';
import { COLORS, generateRandomColor } from '../services/colors';


const GameScreen: FunctionComponent<{ navigation: NavigationContainerRef }> = ({ navigation }) => {
    const [score, setScore] = useState<number>(0);

    const [colorToBlink, setColorToBlink] = useState<string>();
    const [colorsArray, setColorsArray] = useState<string[]>([]);
    const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
    const colors: string[] = COLORS;

    const [pressable, setPressable] = useState<boolean>(false);
    const [clickCounter, setClickCounter] = useState<number>(0);

    useEffect(() => {
        setScore(0);
        setColorsArray([]);
    }, []);

    const startInterval = (arr: any[]) => {
        let index = 0;

        let interval = setInterval(() => {
            setColorToBlink(arr[index]);

            index++;

            if (index == arr.length) {
                clearInterval(interval);
                setPressable(true);
            }
            setColorToBlink(undefined)
        }, 1000);
    }

    const startButton = (): void => {
        setClickCounter(0);
        const color = generateRandomColor();
        const newArr = [...colorsArray, color];
        setColorsArray(newArr);
        startInterval(newArr);
    }

    useEffect(() => {
        if (selectedColor !== undefined && clickCounter) {
            if (selectedColor === colorsArray[clickCounter -1]) {
                if (score == 0) {
                    setScore(1);
                }

                if (colorsArray.length == clickCounter) {
                    // give some delay.
                    setTimeout(() => {
                        startButton();
                    }, 1000);
                    setScore(score + 1);
                }
            } else {
                // navigate to results & reset score.
                navigation.navigate('Results', { score: score });
                setScore(0);
                setPressable(false);
            }
        }
    }, [clickCounter, selectedColor]);


    const boxClicked = (color: string) => {
        setSelectedColor(color);
        setClickCounter(clickCounter + 1);
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ alignSelf: 'center', alignItems: 'center', padding: 20 }}>
                <Button title='Start' onPress={startButton} disabled={colorsArray.length !== 0} />
                <Text style={{ marginTop: 10 }}>Score: {score}</Text>
            </View>
            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                {colors.map((color, index) =>
                    <Box color={color} index={index} key={index} pressable={pressable} blink={colorToBlink} onClick={boxClicked} />
                )}
            </View>

        </View>
    )
}

export default GameScreen;