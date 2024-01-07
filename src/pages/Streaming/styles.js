// @ts-nocheck

import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import styled from "styled-components";

const { width, height } = Dimensions.get("screen");

export const Container = styled.View`
	width: ${width}px;
	height: ${height}px;
	flex: 1;
	background: #090718;
	padding-top: ${getStatusBarHeight()}px;
	align-items: center;
`;

export const ImageCover = styled.Image`
	height: ${height - 100}px;
	width: ${width}px;	
	opacity: 0.9;
	position: absolute;
`;

export const Content = styled.View`
	z-index: 1;
	height: ${height}px;
	width: ${width}px;	
	align-items: center;
`;

export const Title = styled.Text`
	color: #fff;
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 20px;
`;


export const Balls = styled.View`
	position: relative;
	align-items: center;
`;

export const ImageBalls = styled.Image`
	position: relative;
	height: ${width / 1.2}px;
	width: ${width / 1.2}px;
	margin-top: 40px;
`;

export const ImagePlay = styled.Image`
	height: 120px;
	width: 120px;
	position: absolute;
	top: ${width / 1.2 - 10}px;
	z-index: 1;
`;

export const ImageStreaming = styled.Image`
	position: relative;
	height: ${width / 1.55}px;
	width: ${width / 1.55}px;
	position: absolute;
	top: ${40 * 2}px;
	border-radius: 300px;
`;

export const TitleStreaming = styled.Text`
	color: #fff;
	font-size: 16px;
	font-weight: bold;
	margin: 40px 0 10px 0;
`;

export const DescStreaming = styled.Text`
	color: #ccc;
	font-size: 16px;
	margin-bottom: 20px;
`;

