// @ts-nocheck

import { Dimensions } from "react-native";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components";

const { width, height } = Dimensions.get("screen");

export const Container = styled.View`
	width: ${wp("100%")}px;
	flex: 1;
	background: #090811;
	align-items: center;
`;

export const BtnBack = styled.TouchableOpacity`
	margin-left: 10px;
	width: ${width}px;
`;

export const PodcastThumb = styled.View`
	width: ${width}px;
	height: 260px;
	border-radius: 30px;
	justify-content: center;
	align-items: center;
`;

export const ImagePodcast = styled.Image`
	width: ${width / 1.05}px;
	height: 230px;
	border-radius: 20px;
`;

export const AboutPodcast = styled.View`
	width: ${width}px;
	height: 250px;
	border-radius: 30px;
	padding: 20px;
	margin-top: 20px;
`;

export const ViewOpacity = styled.View`
	z-index: 2;
	background-color: #090811;
	opacity: 0.95;
	width: ${width}px;
	height: 220px;
	border-radius: 20px;
	position: absolute;
`;

export const ImageAbout = styled.Image`
	height: 220px;
	border-radius: 20px;
	position: absolute;
	width: ${width}px;
`;

export const BtnSobre = styled.View`
	height: 30px;
	width: 70px;
	background-color: #fff;
	border-radius: 30px;
	justify-content: center;
	align-items: center;
	z-index: 3;
`;

export const TextSobre = styled.Text`
	font-weight: bold;
	color: #0071FF;
	font-size: 13px;
	z-index: 3;
`;

export const TitlePodcast = styled.Text`
	font-weight: bold;
	color: #fff;
	font-size: 25px;
	z-index: 3;
	margin-top: 10px;
`;

export const PresenterPicture = styled.Image`
width: 50px;
height: 50px;
border-radius: 100px;
z-index: 3;
margin-top: 10px;
`;

export const TextBy = styled.Text`
	margin-left: 70px;
	color: #fff;
	font-size: 15px;
	z-index: 3;
`;

export const PodcastList = styled.View`
	background-color: #111022;
	border-top-left-radius: 35px;
	border-top-right-radius: 35px;
	margin-top: 20px;
	
`;

export const RowPodcast = styled.TouchableOpacity`
	height: 45px;
	justify-content: center;
	/* border: 1px solid #fff;
	border-top-width: 0;
	border-left-width: 0;
	border-right-width: 0; */
	margin: 20px 20px 0 20px;
`;

export const TitleP = styled.Text`
margin-left: 70px;
color: #fff;
font-size: 15px;
z-index: 3;
`;

export const TitleD = styled.Text`
margin-left: 70px;
color: #fff;
font-size: 15px;
z-index: 3;
`;