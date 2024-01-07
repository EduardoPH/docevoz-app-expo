
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";

export const Modal = styled.View`
	width: ${wp("100%")}px;
	height: ${wp("45%")}px;

	align-items: center;

	background: #000;
`;

export const ModalButton = styled.TouchableOpacity.attrs({
	activeOpacity: 1,
})`
	width: ${wp("90%")}px;
	height: ${wp("15%")}px;

	border-radius: 10px;

	background: red;

	align-items: center;
	justify-content: center;

	margin-top: ${wp("4%")}px;

	background: #9d0208;
`;

export const ModalRow = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const Chat = styled(Ionicons).attrs({
	size: wp("6%"),
	color: "#fff",
	name: "chatbox-ellipses",
})`
	margin-top: ${wp("1%")}px;
`;

export const Delete = styled(Feather).attrs({
	size: wp("6%"),
	color: "#fff",
	name: "trash-2",
})`
	margin-top: ${wp("1%")}px;
`;

export const Phone = styled(Feather).attrs({
	size: wp("6%"),
	color: "#fff",
	name: "phone-call",
})`
	margin-top: ${wp("1%")}px;
`;

export const ButtonText = styled.Text`
	font-size: ${wp("5%")}px;
	font-weight: bold;

	color: #fff;

	margin-left: ${wp("2%")}px;
`;

export const Warning = styled(Feather).attrs({
	name: "alert-triangle",
	size: wp("7%"),
	color: "#000",
})``;

export const Checked = styled(Feather).attrs({
	name: "check",
	size: wp("7%"),
	color: "#fff",
})`
	margin-top: ${wp("1%")}px;
`;
