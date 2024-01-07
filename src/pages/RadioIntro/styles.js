// @ts-nocheck

import { Dimensions } from "react-native";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components";

const { width, height } = Dimensions.get("screen");

export const Container = styled.View`
	width: ${wp("100%")}px;
	flex: 1;
	background: #000;
`;

export const ImageBackground = styled.Image`
	position: absolute;
	width: ${width}px;
	height: ${height}px;
	z-index: 1;
`;

export const ImageWoman = styled.Image`
	position: absolute;
	width: ${width / 1.5}px;
	height: ${height / 2}px;
	bottom: 0;
`;

export const Content = styled.View`
		width: ${width}px;
		height: ${height}px;
		z-index: 2;
		position: relative;
`;

export const TextTitle = styled.Text`
	color: #fff;
	font-size: ${wp("14.5%")}px;
	font-weight: bold;
`;

export const TextDesc = styled.Text`
	color: #fff;
	font-size: ${wp("4.5%")}px;
	margin: 30px ${width / 10}px;
	width: ${width / 2}px;
`;


