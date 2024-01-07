import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import styled from "styled-components/native";


export const Container = styled.TouchableOpacity.attrs({
	activeOpacity: 1,
})`
	width: ${wp("90%")}px;
	height: ${wp("20%")}px;

	flex-direction: row;
	align-items: center;

	margin-top: ${wp("3%")}px;
	margin-bottom: ${wp("3%")}px;
	padding: 0 ${wp("4%")}px;

	background: #000;

	border-radius: 10px;

	overflow: hidden;
`;

export const Progress = styled.View`
	position: absolute;
	top: 0;

	z-index: 3;

	width: ${wp("55%")}px;
	height: ${wp("1%")}px;

	/* background: #600c14; */
	/* background: #fff; */
`;

export const Background = styled.View`
	width: ${wp("90%")}px;
	height: ${wp("20%")}px;

	flex: 1;
	position: absolute;

	opacity: 0.5;
`;

export const Detail = styled.View`
	width: ${wp("55%")}px;

	margin-left: ${wp("3.5%")}px;
`;

export const DetailRow = styled.View`
	flex-direction: row;
	align-items: center;

	width: ${wp("55%")}px;

	overflow: hidden;

	margin-bottom: ${wp("1.5%")}px;
`;

export const Calendar = styled(AntDesign).attrs({
	name: "calendar",
	size: wp("5%"),
	color: "#fff",
})``;

export const Date = styled.Text`
	margin: 0 ${wp("3%")}px;

	font-size: ${wp("3.5%")}px;
	font-weight: 500;

	color: #fff;
`;

export const Hour = styled.Text`
	color: #fff;

	font-size: ${wp("3.5%")}px;
	font-weight: 500;
`;

export const Button = styled.TouchableOpacity.attrs({
	activeOpacity: 1,
})`
	position: absolute;
	top: ${wp("3%")}px;
	right: ${wp("3%")}px;

	z-index: 3;
`;

export const Config = styled(AntDesign).attrs({
	name: "setting",
	size: wp("6.5%"),
	color: "#fff",
})``;
