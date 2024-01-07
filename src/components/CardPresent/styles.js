// @ts-nocheck

import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
	height: 130px;
	width: 100px;
	background-color: rgba(0,0,0,0.4);
	border-radius: 16px;
	margin-left: 15px;
	justify-content: center;
	align-items: center;
`;

export const Card = styled.View`
	
`;

export const CardImage = styled(ShimmerPlaceHolder).attrs({
	LinearGradient: LinearGradient,
	shimmerColors: ["#777", "#999", "#777"],
})`
	width: 80px;
	height: 80px;
	border-radius: 100px;
	flex-shrink: 0;
`;

export const CardName = styled(ShimmerPlaceHolder).attrs({
	LinearGradient: LinearGradient,
	shimmerColors: ["#777", "#999", "#777"],
})`
	width: ${wp("22%")}px;
	height: 15px;
	border-radius: 7px;
	margin-top: ${wp("3%")}px;
`;


export const ImageUser = styled.Image`
	height: 80px;
	width: 80px;
	border-radius: 100px;
`;

export const TextName = styled.Text`
	margin-top: 10px;
	color: #f1f1f1;
	font-size: ${wp("3.5%")}px;
`;
