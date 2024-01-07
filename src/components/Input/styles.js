import {
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import styled, { css } from "styled-components/native";

export const Input = styled.TextInput`
	width: ${({ width }) => wp(`${width ?? 90}%`)}px;
	height: ${wp("12%")}px;
	border-radius: 5px;
	font-size: ${wp("4%")}px;
	font-weight: 500;
	color: #949599;
	background-color: #36393e;
	padding: 0 ${wp("5%")}px;
  ${({ hasError }) => hasError && css`border: 1px solid #DC143C;`};
`;

export const InputWrapper = styled.View``;
