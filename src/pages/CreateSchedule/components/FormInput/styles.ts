import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin: ${wp("4%")}px ${wp("0%")}px;
  z-index: -10;
`;

export const Input = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.gray["400"]
})) <{ withPaddingLeft?: boolean }>`
  width: 100%;
  height: 30px;

  padding:0;

  border-color: white;
  border-bottom-width: 1px;

  font-family: ${({ theme }) => theme.font.family.poppins};
  font-size: 16px;
  color: white;

  padding-left: ${({ withPaddingLeft }) => withPaddingLeft ? wp("2%") : wp("0%")}px;
  `;

export const InputLabel = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.font.family.poppins};
  color: ${({ theme }) => theme.colors.gray["400"]};
  z-index: -10;
  margin-bottom: 22px;
  margin-top: 32px;
`;
