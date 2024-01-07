import {
	widthPercentageToDP as wp
} from "react-native-responsive-screen";
import styled from "styled-components/native";
import { isIOS } from "../../utils/os";

export const Feed = styled.ScrollView.attrs({
	showsVerticalScrollIndicator: false,
	contentContainerStyle: {
		paddingTop: wp(isIOS ? "8%" : "4%"),
		paddingBottom: wp("12%"),
	},
})`
	background: ${({ theme }) => theme.colors.black["700"]};
	padding: ${wp(isIOS ? "5%" : "10%")}px ${wp("4%")}px;
`;

export const PageTitle = styled.Text`
  font-size: 32px;
	font-family: ${({ theme }) => theme.font.family.poppins};
	font-weight: bold;
	color: ${({ theme }) => theme.colors.gray["700"]};
`;

export const Header = styled.View`
	flex: 1;
	margin-top: ${wp("6%")}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: ${`0 ${wp("2%")}px`};
`;

export const CalendarsWrapper = styled.View`
  margin-top: ${wp("8%")}px;
  padding: ${`0 ${wp("4%")}px`};
`;
