import { Pressable } from "react-native";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Entypo from "react-native-vector-icons/Entypo";
import styled from "styled-components/native";

export const ArrowLeft = styled(Entypo).attrs({
  name: "chevron-thin-left",
  size: wp("6%"),
})``;

export const ChatIcon = styled(Entypo).attrs({
  name: "chat",
  size: wp("6%"),
})``;


export const Button = styled(Pressable)`
  width: ${wp("10%")}px;
`;
