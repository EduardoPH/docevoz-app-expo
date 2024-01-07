import { ScrollView } from "react-native";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components/native";

export const Container = styled.View`
	margin-top: ${wp("8%")}px;
`;

export const Title = styled.Text.attrs({
	numberOfLines: 1,
	ellipsizeMode: "tail",
})`
	font-size: 24px;
	font-weight: bold;
	font-family: ${({ theme }) => theme.font.family.sfProDisplay};
	width: ${wp("90%")}px;
	color: #fff;
	margin: 0 0 ${wp("4%")}px ${wp("5%")}px;
`;

export const FeedHorizontal = styled(ScrollView).attrs({
	horizontal: true,
	showsHorizontalScrollIndicator: false
})`
	padding: ${`0 ${wp("2%")}px`};
`;

export const Card = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
	margin-right: ${wp("3.5%")}px;
	border-radius: 10px;
`;

export const CardNameWrapper = styled.View`
	width: 100%;
	z-index: 2;
	position: absolute;
	bottom: 0;
	padding: ${`${wp("4%")}px ${wp("3%")}px`};
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	background: rgba(255, 255, 255, 0.30);
`;

export const CardName = styled.Text.attrs({
	numberOfLines: 1,
	ellipsizeMode: "tail",
})`
	color: #fff;
	font-size: 14px;
	font-weight: bold;
	font-family: ${({ theme }) => theme.font.family.nunito};
`;
