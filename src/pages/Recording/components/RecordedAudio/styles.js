import { Pressable } from "react-native";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styled from "styled-components/native";

export const Time = styled.Text`
	color: #fff;
	font-size: ${wp("5.55")}px;
	font-weight: bold;
	margin: ${wp("6%")}px 0 ${wp("10%")}px;
`;

export const Control = styled(Pressable)`
	width: ${wp("18%")}px;
	height: ${wp("18%")}px;
	border-radius: ${wp("10%")}px;
	background: #fff;
	align-items: center;
	justify-content: center;
	margin: ${wp("5%")}px 0 ${wp("20%")}px;
`;

export const Paused = styled(FontAwesome).attrs({
  name: "pause",
  size: wp("7%"),
  color: "#000",
})``;

export const Play = styled(FontAwesome).attrs({
  name: "play",
  size: wp("7%"),
  color: "#000",
})`
	margin-left: ${wp("1%")}px;
`;
