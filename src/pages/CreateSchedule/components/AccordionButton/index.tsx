import React, { useState, ReactElement, Dispatch, SetStateAction } from "react";
import { LayoutAnimation, PressableProps } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Entypo from "react-native-vector-icons/Entypo";
import { useTheme } from "styled-components";

import { AccordionContainer, Button, ButtonText, Container } from "./styles";

interface IAccordionButton extends PressableProps {
  title: string;
  children?: ReactElement<any, any>;
  hasAccordion?: boolean;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>
}

export function AccordionButton({ title, children, hasAccordion = true, onPress, isExpanded, setIsExpanded,...props }: IAccordionButton) {
  const height = useSharedValue(0);
  const rotation = useSharedValue(0);
  const { colors } = useTheme();

  const handleAnimation = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsExpanded(!isExpanded);
      height.value = isExpanded ? 0 : 1;
      rotation.value = withTiming(
        isExpanded ? 180 : 0,
        {
          duration: 300,
          easing: Easing.ease,
        });
  }

  const handlePress = () => {
    if (hasAccordion) {
      handleAnimation()
    }
    if (onPress) {
      onPress();
    }
  };

  const childrenStyle = useAnimatedStyle(() => {
    const newHeight = withTiming(isExpanded ? 1 : 0, {
      duration: 300,
      easing: Easing.ease,
    });

    return {
      height: newHeight * height.value * 100,
    };
  });

  const rotationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Container>
      <Button onPress={handlePress} {...props}>
        <ButtonText>{title}</ButtonText>
        {hasAccordion &&
          <Animated.View style={[rotationStyle]}>
            <Entypo name="chevron-thin-down" size={16} color={colors.black["800"]} />
          </Animated.View>
        }
      </Button>
      {hasAccordion &&
        <AccordionContainer style={[childrenStyle]}>
          {isExpanded && children}
        </AccordionContainer>
      }
    </Container>
  );
}
