
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";

export const Feed = styled.ScrollView.attrs({
	contentContainerStyle: {
		paddingBottom: wp("10%"),
		paddingHorizontal: wp("4%"),
	},
})`
	background-color: ${({ theme }) => theme.colors.black["700"]};
	padding-top: ${wp("8%")}px;
`;

export const Back = styled.TouchableOpacity.attrs({
	activeOpacity: 1,
})`
	width: ${wp("8%")}px;
	height: ${wp("8%")}px;
`;

export const Arrow = styled(AntDesign).attrs({
	name: "arrowleft",
	color: "#fff",
	size: wp("7%"),
})``;

export const Title = styled.Text`
	margin-top: ${wp("5%")}px;

	font-size: ${wp("5%")}px;
	font-weight: bold;

	letter-spacing: 0.8px;

	color: #fff;
`;

export const Cards = styled.View``;

export const Card = styled.TouchableOpacity.attrs({
	activeOpacity: 1,
})`
	width: 100%;
	height: ${wp("20%")}px;

	flex-direction: row;

	border-radius: 25px;

	margin-top: ${wp("5%")}px;

	background: #333;

	padding: ${wp("4%")}px ${wp("5%")}px;
`;

export const CardSuccess = styled(Feather).attrs({
	name: "check-circle",
	size: wp("7%"),
	color: "#48B16E",
})``;

export const CardPending = styled(AntDesign).attrs({
	name: "warning",
	size: wp("7%"),
	color: "#DCA048",
})``;

export const CardCreated = styled(AntDesign).attrs({
	name: "calendar",
	size: wp("7%"),
	color: "#fff",
})``;

export const CardMessage = styled(Ionicons).attrs({
	name: "chatbox-outline",
	size: wp("7%"),
	color: "#fff",
})``;

export const CardDetails = styled.View`
	margin-left: ${wp("4%")}px;
`;

export const CardTitle = styled.Text`
	font-size: ${wp("3.8%")}px;
	font-weight: 500;

	letter-spacing: 0.8px;

	color: #fff;
`;

export const CardHour = styled.Text`
	font-size: ${wp("3.8%")}px;
	font-weight: 400;

	margin-top: ${wp("1%")}px;

	letter-spacing: 0.8px;

	color: rgba(255, 255, 255, 0.8);
`;
