import {
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import styled from "styled-components/native";


export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.black["700"]};
	align-items: center;
	justify-content: center;
`;

export const Warning = styled.Text`
	color: #fff;

	font-size: ${wp("4.5%")}px;
	font-weight: bold;

	margin-top: ${wp("6%")}px;

	letter-spacing: 0.5px;
`;
