
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components/native";

import { Button } from "../../styles";

export const InfoWrapper = styled.View`
  margin: ${`${wp("0%")}px ${wp("5%")}px`};
  margin-bottom: ${wp("6%")}px;
  flex-direction: column;
  align-items: flex-end;
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Username = styled.Text`
  font-size: 36px;
  font-family: ${({ theme }) => theme.font.family.dearHeart};
  color: ${({ theme }) => theme.colors.black["600"]};
  margin-left: ${wp("3%")}px;
`;

export const LabelValue = styled.Text`
  font-size: 22px;
  font-family: ${({ theme }) => theme.font.family.dearHeart};
  color: ${({ theme }) => theme.colors.black["600"]};
  margin-left: ${wp("1%")}px;
`;

export const LabelKey = styled.Text`
  font-size: 18px;
  font-weight: bold;
  font-family: ${({ theme }) => theme.font.family.inter};
  color: ${({ theme }) => theme.colors.black["500"]};
`;

export const EditButton = styled(Button)`
  width: 100px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.pink["500"]};
`;
