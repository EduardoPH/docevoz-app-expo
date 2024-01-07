import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components/native";

export const CalendarContainer = styled.View`
  margin-bottom: ${wp("6%")}px;
`;

export const CalendarStatusRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CalendarStatus = styled.Text<{ color: string, size?: number }>`
  font-weight: bold;
  font-size: ${({ size }) => size ?? 20}px;
  font-family: ${({ theme }) => theme.font.family.poppins};
  color: ${({ color }) => color};
`;
