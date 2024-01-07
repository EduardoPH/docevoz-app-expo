import { Animated } from "react-native";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styled from "styled-components/native";

export const Circle = styled.View`
	width: ${wp("60%")}px;
	height: ${wp("60%")}px;

	border-radius: ${wp("30%")}px;

	background: #222;

	align-items: center;
	justify-content: center;

	z-index: 3;
`;

export const RipplerEffect = styled(Animated.View)`
		background-color: "rgba(125,244,102,0.3)";
		z-index: 2;
		width: ${wp("60%")}px;
		height: ${wp("60%")}px;
		border-radius: ${wp("30%")}px;
		position: absolute;
`;

export const Microphone = styled(FontAwesome).attrs({
  name: "microphone",
  size: wp("16%"),
  color: "#fff",
})``;
