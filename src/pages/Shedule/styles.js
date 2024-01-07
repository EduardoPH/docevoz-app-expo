// @ts-nocheck


import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import styled from "styled-components/native";

export const Feed = styled.ScrollView.attrs({
	showsVerticalScrollIndicator: false,
	contentContainerStyle: {
		paddingHorizontal: wp("5%"),
	},
})`
	background-color: ${({ theme }) => theme.colors.black["700"]};
	padding-top: ${wp("10%")}px;
`;

export const Header = styled.View`
	flex-direction: row;

	align-items: center;
	justify-content: space-between;

	margin-bottom: ${wp("4%")}px;
`;

export const Button = styled.TouchableOpacity.attrs({
	activeOpacity: 1,
})``;

export const BackIcon = styled(AntDesign).attrs({
	name: "arrowleft",
	color: "#fff",
	size: wp("7%"),
})``;

export const Title = styled.Text`
	font-size: ${wp("5%")}px;
	font-weight: bold;

	color: #fff;
`;
