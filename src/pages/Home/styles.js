import { Dimensions, ScrollView } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import {
	widthPercentageToDP as wp
} from "react-native-responsive-screen";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import { isIOS } from "../../utils/os";

export const Feed = styled(ScrollView).attrs({
	showsVerticalScrollIndicator: false,
	contentContainerStyle: {
		paddingTop: wp("8%"),
		paddingBottom: wp("4%"),
	},
})`
	background: ${({ theme }) => theme.colors.black["700"]};
`;

export const Header = styled.View`
	flex: 1;
	margin-top: ${wp("4%")}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: ${`0 ${wp("5%")}px`};
`;

export const Row = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const Column = styled.View`
	flex-direction: column;
	align-items: stretch;
	justify-content: center;
`;

export const Username = styled.Text`
	font-family: ${({ theme }) => theme.font.family.dearHeart};
	font-size: 36px;
	color: ${({ theme }) => theme.colors.white["800"]};
`;

export const Title = styled.Text`
	font-size: 20px;
	font-family: ${({ theme }) => theme.font.family.sfProDisplay};
	font-weight: bold;
	color: ${({ theme }) => theme.colors.white["800"]};
`;

export const Settings = styled(Ionicons).attrs({
	name: "ios-settings-outline",
	size: wp("6%"),
	color: "#fff",
})``;

export const Microphone = styled(Feather).attrs({
	name: "mic",
	size: wp("6%"),
	color: "#fff",
})``;

export const HistoryIcon = styled(Ionicons).attrs({
	name: "ios-time-outline",
	size: wp("6%"),
	color: "#fff",
})`
	padding:0;
	margin-left:1px;
`;

export const HistoryCircle = styled.TouchableOpacity`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.black["500"]};
	padding: ${wp("1.2%")}px;
	border-radius: 20px;
	margin-right: ${wp("4%")}px;
`;

export const HistoryBadge = styled.View`
	position: absolute;
	width: ${wp("4.7%")}px;
	height: ${wp("4.7%")}px;
	right: 0px;
	bottom: -4px;

	background: ${({ theme }) => theme.colors.pink["200"]};
	border: 2.5px solid #171717;
	border-radius: 10px;
`;

export const BlackBlur = styled(LinearGradient)`
	position: absolute;
	bottom: 0;
	left: 0;
	width: ${Dimensions.get("screen").width}px;
	height: ${isIOS ? "250" : "100"}px;
`;
