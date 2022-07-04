import React, { FunctionComponent, useEffect, useRef } from 'react';
import { Animated, Pressable, View } from 'react-native';
import Sound from 'react-native-sound';

type Props = {
    color: string;
    index: number;
    pressable?: boolean;
    blink?: string;
    onClick?: any;
}

const Box: FunctionComponent<Props> = ({ color, index, pressable, blink, onClick }) => {

    const fadeAnim = useRef(new Animated.Value(1)).current;
    Sound.setCategory('Playback');

    useEffect(() => {

    }, []);

    useEffect(() => {
        if (color === blink) {
            animate();
        }

    }, [blink]);

    const boxClicked = (): void => {
        if (!pressable) return;
        onClick(color);
        animate();
    }

    const animate = (): void => {
        let sound = new Sound('ding.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
            } else {
                sound.play(); 
            }
        });
        Animated.timing(
            fadeAnim,
            {
                toValue: 0.4,
                useNativeDriver: false,
                duration: 500
            }
        ).start();

        setTimeout(() => {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    useNativeDriver: false,
                    duration: 500

                }
            ).start();
        }, 500);
    }

    return (
        <Pressable style={{ height: '50%', width: '50%' }} onPress={boxClicked}>
            <Animated.View style={{ backgroundColor: color, flex: 1, opacity: fadeAnim }} />
        </Pressable>
    )
}

export default Box;