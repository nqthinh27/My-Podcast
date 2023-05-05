import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { device } from '../constants/device';

const styles = StyleSheet.create({
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 10,
    },
    loadingText: {
        fontSize: 27,
        fontWeight: 300,
    },
    loadingFrame: {
        width: device.width*40/100,
        height: device.width*40/100,
        borderRadius: 100,
        borderWidth: 10,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderTopColor: '#fff',
    }
});

const Loading = () => {
    const circleAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(circleAnimation, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            })
        ).start();
    }, [circleAnimation]);

    const circleTransform = circleAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={[StyleSheet.absoluteFillObject, styles.loadingContainer]}>
            <Animated.View
                style={[
                    styles.loadingFrame,
                    { transform: [{ rotate: circleTransform }] },
                ]}
            />
        </View>
    );
};

export default Loading;
