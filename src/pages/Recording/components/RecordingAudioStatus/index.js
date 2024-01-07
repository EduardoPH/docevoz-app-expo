import React, { useCallback, useEffect, useRef } from "react";
import { Animated as ReactNativeAnimated } from "react-native";

import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

import { Circle, Microphone, RipplerEffect } from "./styles";

export function RecordingAudioStatus({ isStarted, isFinished, metering }) {
  const animationRef = useRef(new ReactNativeAnimated.Value(0)).current;
  const maxVolume = 2;

  const startAnimations = useCallback(() => {
    ReactNativeAnimated.timing(animationRef, {
      toValue: (maxVolume / Math.abs(metering)),
      useNativeDriver: true,
      duration: 500,
    }).start();

  }, [animationRef, metering]);

  useEffect(() => {
    if (isStarted && !isFinished) {
      startAnimations();
      animateIcon();
    }
  }, [startAnimations]);

  const polAnim = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
    extrapolate: "identity",
  });

  const ANIMATION_DURATION = 2000;
  const ANIMATION_TYPE = Easing.bezier(0.25, 0.1, 0.25, 1);
  const MAX_SCALE = 1.5;
  const MIN_SCALE = 1.0;
  const REPEATS = -1; // infinite

  const scaleValue = useSharedValue(MIN_SCALE);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(scaleValue.value, [MIN_SCALE, MAX_SCALE], [1, MAX_SCALE]);
    return {
      transform: [{ scale }],
    };
  });

  const animateIcon = () => {
    scaleValue.value = withRepeat(
      withTiming(MAX_SCALE, {
        duration: ANIMATION_DURATION,
        easing: ANIMATION_TYPE,
      }, () => {
        scaleValue.value = withTiming(MIN_SCALE, {
          duration: ANIMATION_DURATION,
          easing: ANIMATION_TYPE,
        });
      }),
      REPEATS,
      true, // reverse the animation direction
    );
  };

  return (
    <>
      {isStarted && !isFinished && <RipplerEffect style={{
        transform: [{
          scale: polAnim
        }]
      }} />}
      <Circle>
        <Animated.View style={animatedStyle}>
          <Microphone />
        </Animated.View>
      </Circle>
    </>
  );
}
