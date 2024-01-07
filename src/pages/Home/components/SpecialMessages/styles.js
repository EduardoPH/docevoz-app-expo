import { ScrollView } from "react-native";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components/native";

export const SectionHeader = styled.View`
  margin-bottom: ${wp("6%")}px;
  padding: ${`0 ${wp("5%")}px`};
`;

export const Title = styled.Text`
  font-weight: bold;
  font-family: ${({ theme }) => theme.font.family.sfProDisplay};
  font-size: 40px;
  color: ${({ theme }) => theme.colors.white["300"]};
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.font.family.nunito};
  font-size: 16px;
  color: #FFFFFF98;
`;

export const FeedHorizontal = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false
})`
	padding: ${`0 ${wp("2%")}px`};

`;

export const MessageCardContainer = styled.Pressable`
  width: 329px;
  height: 288px;
  border-radius: 7px;
  margin-right: ${wp("3%")}px;
`;

export const MessageCardImage = styled.ImageBackground`
  flex: 1;
`;

export const MessageCardDescription = styled.View`
  background: rgba(255, 255, 255, 0.2);
  background-blend-mode: overlay;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 7px;
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: ${`${wp("5%")}px ${wp("10%")}px`};
`;

export const MessageCardDescriptionText = styled.Text`
  color: ${({ theme }) => theme.colors.white["800"]};
  font-family: ${({ theme }) => theme.font.family.poppins};
  font-size: 16px;
`;
