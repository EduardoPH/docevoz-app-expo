import styled from "styled-components/native";

export const CalendarHeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.font.family.sfProDisplay};
  font-weight: bold;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.white["800"]};
  text-transform: capitalize;
`;
