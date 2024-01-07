// @ts-nocheck

import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import styled from "styled-components/native";



export const Container = styled.TouchableOpacity`
	height: 180px;
	width: 170px;
	background-color: rgba(0,0,0,0.4);
	border-radius: 20px;
	margin-left: 15px;
`;

export const ImageUser = styled.Image`
	height: 110px;
	width: 150px;
	border-radius: 12px;
	margin: 10px;
`;

export const BtnPlay = styled.TouchableOpacity`
	position: absolute;
	height: 50px;
	width: 50px;
	border:1px solid #ccc;
	border-radius: 100px;
	justify-content: center;
	align-items: center;
	top: 90px;
	z-index: 1;
	right: 20px;
`;

export const TextName = styled.Text`
	margin-top: 10px;
	color: #f1f1f1;
	height: 20px;
	font-size: ${wp("4%")}px;
	margin-left: 10px;
`;

export const TextDesc = styled.Text`
	color: #ddd;
	font-size: ${wp("2.5%")}px;
	margin-left: 10px;
`;

export const Card = styled.View`
	
`;

export const CardImage = styled(ShimmerPlaceHolder).attrs({
	LinearGradient: LinearGradient,
	shimmerColors: ["#777", "#999", "#777"],
})`
	height: 180px;
	width: 170px;
	border-radius: 12px;
	flex-shrink: 0;
`;

export const CardName = styled(ShimmerPlaceHolder).attrs({
	LinearGradient: LinearGradient,
	shimmerColors: ["#777", "#999", "#777"],
})`
	width: ${wp("22%")}px;
	height: 20px;
	border-radius: 7px;
	margin-top: ${wp("3%")}px;
`;