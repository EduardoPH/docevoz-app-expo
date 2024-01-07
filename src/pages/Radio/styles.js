// @ts-nocheck

import { Dimensions } from "react-native";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getStatusBarHeight } from "react-native-status-bar-height";
import styled from "styled-components";

const { width, height } = Dimensions.get("screen");

export const Container = styled.View`
	width: ${wp("100%")}px;
	flex: 1;
	background: #060410;
`;

export const Content = styled.View`
		width: ${width}px;
		height: ${height}px;
		z-index: 2;
		position: relative;

`;

export const RowPodcast = styled.View`
	margin: 0 0 25px 0;
`;

export const TextTitle = styled.Text`
	color: #fff;
	font-size: ${wp("7%")}px;
	font-weight: bold;
	margin-left: 20px;
	margin-bottom: 20px;
`;

export const Lives = styled.View`
	margin: 40px 0px;
`;

export const TextLive = styled.Text`
	color: #fff;
	font-size: ${wp("6%")}px;
	font-weight: bold;
	margin-bottom: 10px;
	margin-left: 20px;
`;
