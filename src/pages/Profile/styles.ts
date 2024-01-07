import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components/native";

import { Avatar } from "../../components/Avatar";

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: wp("14%"),
  },
})`
  background-color: ${({ theme }) => theme.colors.white["800"]};
  padding: ${`${wp("14%")}px ${wp("4%")}px`};
`;

export const SectionTitle = styled.Text`
  font-size: 26px;
  font-weight: bold;
  font-family: ${({ theme }) => theme.font.family.sfProDisplay};
  color: ${({ theme }) => theme.colors.gray["600"]};
  margin: ${`${wp("6%")}px ${wp("4%")}px`};
`;

// Button
export const Button = styled.Pressable`
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

export const LogoutButton = styled(Button)`
  width: 200px;
  height: 51.89px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.gray["500"]};
  border: 1px solid #FFF7F7;
  border-radius: 25px;
`;

export const ButtonTitle = styled.Text`
  font-family: ${({ theme }) => theme.font.family.inter};
  font-weight: bold;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white["800"]};
`;

export const CountryBadge = styled(Avatar)`
  position: absolute;
  top: -2px;
  right: -6px;
`;
