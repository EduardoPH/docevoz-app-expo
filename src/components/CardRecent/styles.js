// @ts-nocheck

import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
	height: 140px;
	width: 150px;
	background-color: rgba(0,0,0,0.4);
	border-radius: 20px;
	margin-left: 15px;
`;

export const ImageUser = styled.Image`
	height: 90px;
	width: 130px;
	border-radius: 12px;
	margin: 10px;
`;

export const TextName = styled.Text`
	color: #f1f1f1;
	font-size: ${wp("3.5%")}px;
	margin-left: 10px;
`;

export const CardImage = styled(ShimmerPlaceHolder).attrs({
	LinearGradient: LinearGradient,
	shimmerColors: ["#777", "#999", "#777"],
})`
	width: ${wp("35%")}px;
	height: ${wp("58%")}px;

	border-radius: 7px;

	flex-shrink: 0;
`;
