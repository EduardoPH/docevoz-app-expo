// @ts-nocheck

import { ScrollView } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import styled from "styled-components/native";




export const Container = styled.View`
	margin-top: ${wp("8%")}px;
`;

export const Title = styled(ShimmerPlaceHolder).attrs({
	LinearGradient: LinearGradient,
	shimmerColors: ["#777", "#999", "#777"],
})`
	width: ${wp("50%")}px;
	height: ${wp("8%")}px;
	margin: 0 0 ${wp("5%")}px ${wp("5%")}px;
	border-radius: 7px;
`;

export const FeedHorizontal = styled(ScrollView).attrs({
	horizontal: true,
})`
	padding: ${`0 ${wp("2%")}px`};
`;

export const Card = styled.View`
	margin-left: ${wp("4%")}px;
	border-radius: 7px;
`;

export const CardImage = styled(ShimmerPlaceHolder).attrs({
	LinearGradient: LinearGradient,
	shimmerColors: ["#777", "#999", "#777"],
})`
	width: ${wp("45%")}px;
	height: ${wp("65%")}px;

	border-radius: 7px;

	flex-shrink: 0;
`;
