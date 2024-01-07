import Animated from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components/native";

export const Container = styled.View`
  margin: ${wp("4%")}px ${wp("0%")}px;
  z-index: -120;
`;

export const Button = styled.Pressable`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 52px;

  background-color: ${({ theme }) => theme.colors.white["800"]};
  border: 0.5px solid #FDFAFA;
  border-radius: 10px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.black["800"]};
  font-family: ${({ theme }) => theme.font.family.poppins};
  font-weight: bold;
  font-size: 14px;
  margin-right: ${wp("2%")}px;
  text-transform: capitalize;
`;

export const AccordionContainer = styled(Animated.View)`
  background-color: ${({ theme }) => theme.colors.white["800"]};
  border-radius: 10px;
  margin-top: ${wp("2%")}px;
`;
