
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Material from "react-native-vector-icons/MaterialIcons";
import styled, { css } from "styled-components/native";

export const Feed = styled.ScrollView.attrs({
	contentContainerStyle: {
		paddingTop: wp("5%"),
		paddingBottom: wp("10%"),
		paddingHorizontal: wp("5%"),
	},
})`
	background-color: ${({ theme }) => theme.colors.black["700"]};
	padding-top: ${wp("6%")}px;
`;

export const Header = styled.View`
	height: ${wp("10%")}px;

	align-items: center;
	justify-content: space-between;

	flex-direction: row;
`;

export const Button = styled.TouchableOpacity.attrs({
	activeOpacity: 1,
})``;

export const BackIcon = styled(AntDesign).attrs({
	name: "arrowleft",
	color: "#fff",
	size: wp("7%"),
})`
	/* margin-top: ${wp("-0.5%")}px; */
`;

export const HeaderTitle = styled.Text`
	font-size: ${wp("5.7%")}px;
	font-weight: 500;

	color: #fff;

	text-align: center;
`;

export const Notifications = styled(Ionicons).attrs({
	name: "notifications-outline",
	size: wp("8%"),
	color: "#fff",
})`
	margin-top: ${wp("1.5%")}px;
`;

export const NewNotification = styled.View`
	position: absolute;
	right: ${wp(".5%")}px;
	top: ${wp("1.5%")}px;

	background: red;

	width: ${wp("3%")}px;
	height: ${wp("3%")}px;

	border-radius: ${wp("3.5%")}px;
`;

export const Boxs = styled.View`
	width: ${wp("90%")}px;

	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	margin-top: ${wp("10%")}px;
	margin-bottom: ${wp("3%")}px;
`;

export const Box = styled.TouchableOpacity.attrs({
	activeOpacity: 1,
})`
	width: ${wp("88%") / 2}px;
	height: ${wp("30%")}px;

	background: #555;

	padding: ${wp("4%")}px;

	border-radius: 10px;
`;

export const BoxHeader = styled.View`
	flex-direction: row;

	align-items: center;
`;

export const BoxHeart = styled(AntDesign).attrs({
	name: "hearto",
	size: wp("6%"),
	color: "#fff",
})``;

export const BoxFlag = styled(AntDesign).attrs({
	name: "flag",
	size: wp("6%"),
	color: "#0DB1AD",
})``;

export const BoxHeaderTitle = styled.Text`
	margin-left: ${wp("3%")}px;

	font-size: ${wp("4%")}px;
	font-weight: 500;

	color: #fff;

	${props =>
		props.aproved &&
		css`
			color: #0db1ad;
		`}
`;

export const BoxAmount = styled.Text`
	font-size: ${wp("10%")}px;
	font-weight: bold;

	color: #fff;

	margin-top: ${wp("2%")}px;

	${props =>
		props.aproved &&
		css`
			color: #0db1ad;
		`}
`;

export const Buttons = styled.View`
	width: ${wp("90%")}px;

	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	margin-top: ${wp("3%")}px;
`;

export const DeleteAccount = styled.TouchableOpacity.attrs({
	activeOpacity: 1,
})`
	width: ${wp("67%")}px;
	height: ${wp("13%")}px;

	border-radius: 10px;

	align-items: center;
	justify-content: center;

	flex-direction: row;
	flex-shrink: 0;

	background-color: darkred;
`;

export const LogoutButton = styled.TouchableOpacity.attrs({
	activeOpacity: 1,
})`
	width: ${wp("90%")}px;
	height: ${wp("13%")}px;

	border-radius: 10px;

	align-items: center;
	justify-content: center;

	flex-direction: row;
	flex-shrink: 0;

	background-color: darkorange;

	margin-top: ${wp("3%")}px;
`;

export const DeleteIcon = styled(Feather).attrs({
	size: wp("5.5%"),
	color: "#fff",
	name: "trash-2",
})`
	margin-right: ${wp("2%")}px;
`;

export const LogoutIcon = styled(Material).attrs({
	size: wp("6%"),
	color: "#fff",
	name: "logout",
})`
	margin-right: ${wp("2%")}px;
`;

export const ButtonLabel = styled.Text`
	font-size: ${wp("4.5%")}px;
	font-weight: bold;

	color: #fff;
`;

export const NewShedule = styled.TouchableOpacity.attrs({
	activeOpacity: 1,
})`
	width: ${wp("20%")}px;
	height: ${wp("13%")}px;

	border-radius: 10px;

	background: #444;

	align-items: center;
	justify-content: center;

	flex-shrink: 0;
`;

export const PlusIcon = styled(AntDesign).attrs({
	name: "plus",
	size: wp("5.5"),
	color: "#fff",
})``;

