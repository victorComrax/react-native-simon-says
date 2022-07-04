import { NavigationContainerRef } from '@react-navigation/native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Box } from '../components';
import { COLORS, fillColorsArray } from '../services/colors';


const GameScreen: FunctionComponent<{ navigation: NavigationContainerRef }> = ({ navigation }) => {
    const [score, setScore] = useState<number>(0);

    const [chosenColors, setChosenColors] = useState<any[]>([]);
    const [colorToBlink, setColorToBlink] = useState<string>();
    const [lastColor, setLastColor] = useState<string>('');

    const colors: string[] = COLORS;

    const [pressable, setPressable] = useState<boolean>(false);

    useEffect(() => {
        setScore(0);
    }, [])

    useEffect(() => {
        let index = 0;

        let interval = setInterval(() => {
            // if array is empty clear interval.
            if (chosenColors.length == 0) {
                clearInterval(interval);
                return;
            }
            index++;

            setColorToBlink(chosenColors[index - 1]);

            if (index == chosenColors.length) {
                clearInterval(interval);
                setPressable(true);
            }
        }, 1000);

        if (chosenColors.length == 0) {
            setPressable(false);
        }

        return () => clearInterval(interval)

    }, [chosenColors]);

    const startButton = (): void => {
        setScore(score + 1);
        const arr = fillColorsArray(score,lastColor);
        setChosenColors(arr);
    }

    const boxClicked = (color: string) => {

        if (color === chosenColors[0]) {
            // slice chosen color
            const newArr = [...chosenColors].slice(1, chosenColors.length);
            // update state
            setChosenColors(newArr);
            // dont let last color to be the first in new array.
            if (newArr.length == 1) setLastColor(newArr[0]);
            // start with new colors
            if (newArr.length == 0) {
                // give some delay .
                setTimeout(() => {
                    startButton();
                }, 500);
            }

        } else {
            // navigate to results & reset score.
            navigation.navigate('Results', { score: score });
            setScore(0);
            setPressable(false);
        }
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ alignSelf: 'center', alignItems: 'center', padding: 20 }}>
                <Button title='Start' onPress={startButton} disabled={score !== 0} />
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