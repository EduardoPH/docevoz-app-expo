import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components/native";


export const Container = styled.View`
	width: ${wp("100%")}px;
	flex: 1;

	padding: ${wp("5%")}px ${wp("5%")}px 0;

	background: #000;
`;

export const Ilustration = styled.Image`
	width: ${wp("80%")}px;
	height: ${wp("60%")}px;

	margin-top: ${wp("-30%")}px;
`;

export const Center = styled.View`
	flex: 1;

	align-items: center;
	justify-content: center;
`;

export const Title = styled.Text`
	color: rgba(255, 255, 255, 0.7);

	width: ${wp("80%")}px;

	text-align: center;

	font-size: ${wp("5%")}px;

	margin-top: ${wp("5%")}px;
`;
