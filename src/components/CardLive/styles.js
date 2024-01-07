// @ts-nocheck
import { Dimensions } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import styled from "styled-components/native";
const { width, height } = Dimensions.get("screen");

export const Container = styled.TouchableOpacity`
	height: 130px;
	width: ${wp('90%')}px;
	background-color: rgba(0,0,0,0.4);
	border-radius: 20px;
	margin-left: 15px;
	display: flex;
	flex-direction: row;
`;

export const ImageUser = styled.Image`
	width: 120px;
	border-radius: 12px;
	margin: 10px 0 0 10px;
`;

export const ViewInfo = styled.View`
	padding: 10px 0;
	width: 50%;
`;

export const TextName = styled.Text`
	color: #f1f1f1;
	font-size: ${wp("3.5%")}px;
	margin-left: 10px;
`;

export const TextPreset = styled.Text`
	color: #fff;
	font-size: ${wp("3.5%")}px;
	font-weight: bold;
	margin-left: 10px;
	margin-top: 25px;
`;


export const BtnPlay = styled.View`
	height: 50px;
	width: 50px;
	border:1px solid #ccc;
	border-radius: 100px;
	justify-content: center;
	align-items: center;
	top: 25px;
	z-index: 1;
`;

export const Card = styled.View`
	
`;

export const CardImage = styled(ShimmerPlaceHolder).attrs({
	LinearGradient: LinearGradient,
	shimmerColors: ["#777", "#999", "#777"],
})`
	height: 130px;
	width: ${width / 1.3}px;
	border-radius: 20px;
	flex-shrink: 0;
`;

