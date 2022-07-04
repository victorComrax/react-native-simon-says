import { NavigationContainerRef } from '@react-navigation/native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Box } from '../components';
import { COLORS, fillColorsArray } from '../services/colors';


const GameScreen: FunctionComponent<{ navigation: NavigationContainerRef }> = ({ navigation }) => {
    const [score, setScore] = useState<number>(0);

    const [chosenColors, setChosenColors] = useState<any[]>([]);
    const [colorToBlink, setColorToBlink] = useState();

    const colors: string[] = COLORS;

    const [pressable, setPressable] = useState<boolean>(false);
    const [disableStart, setDisableStart] = useState<boolean>(false);

    useEffect(() => {
        let index = 0;

        let interval = setInterval(() => {
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
        }, 1500);

        if (chosenColors.length == 0) {
            setDisableStart(false);
            setPressable(false);
        }

        return () => clearInterval(interval)

    }, [chosenColors]);

    const startButton = (): void => {
        setScore(score + 1);
        const arr = fillColorsArray(score);
        setChosenColors(arr);
        setDisableStart(true);
    }

    const boxClicked = (color: string) => {
        if (color === chosenColors[0]) {
            const newArr = [...chosenColors].slice(1, chosenColors.length);
            setChosenColors(newArr);
        } else {
            navigation.navigate('Results', { score: score });
            setScore(0);
            setPressable(false);
            setDisableStart(false);
        }

    }

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ alignSelf: 'center', alignItems: 'center', padding: 5 }}>
                <Button title='Start' onPress={startButton} disabled={disableStart} />
                <Text>Score: {score}</Text>
            </View>
            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                {colors.map((color, index) =>
                    <Box color={color} index={index} key={index} pressable={pressable} blink={colorToBlink} onClick={boxClicked} />
                )}
            </View>

        </View>
    )
}

export default GameScreen;