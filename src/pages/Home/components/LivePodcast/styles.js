import LinearGradient from "react-native-linear-gradient";
import {
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import styled from "styled-components/native";

const cardBorderRadius = `${wp("5%")}px`;

export const CardBorder = styled(LinearGradient)`
  width: ${wp("90%")}px;
  border-radius: ${cardBorderRadius};
  background-color: transparent;
  margin: 0 auto;
  margin-top: ${wp("10%")}px;
  margin-bottom: ${wp("10%")}px;
  padding: ${wp("0.2%")}px;
`;

export const CardContainer = styled.Pressable`
  width: 100%;
  padding: ${`${wp("5%")}px ${wp("4%")}px`};
  border-radius: ${cardBorderRadius};

  background-color: #000000;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PodcastTitle = styled.Text`
  font-family: ${({ theme }) => theme.font.family.sfProDisplay};
  font-weight: bold;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white["800"]};
`;

export const PodcastAuthor = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.font.family.sfProDisplay};
  color: ${({ theme }) => theme.colors.white["400"]};
  margin-top: ${wp("1%")}px;
`;

export const PodcastImage = styled.Image`
  border-radius: 20px;
  width: 91px;
  height: 91px;
  margin-left: ${wp("6%")}px;
`;
