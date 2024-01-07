import { ScrollView } from "react-native";
import {
	widthPercentageToDP as wp
} from "react-native-responsive-screen";
import styled from "styled-components/native";

import { isIOS } from "../../utils/os";

export const Container = styled(ScrollView).attrs({
	showsVerticalScrollIndicator: false,
	contentContainerStyle: {
		paddingTop: wp("4%"),
		paddingBottom: wp("10%"),
	},
})`
	background: ${({ theme }) => theme.colors.white["800"]};
	padding: ${`${wp("6%")}px ${wp(isIOS ? "2%" : "6%")}px`};
`;

export const Row = styled.View`
	align-items: center;
	flex-direction:row;
`

export const Header = styled.View`
	margin-top: ${wp("4%")}px;
	padding: ${wp("4%")}px ${wp("4%")}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	border-bottom-left-radius: 0px;
	border-bottom-right-radius: 0px;
	border-radius: 30px;
`;

export const EditScheduleButton = styled.Pressable`
	width: 113.78px;
	height: 49.78px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background: rgba(118, 122, 130, 0.2);
	border-radius: 33px;
`;

export const ButtonText = styled.Text`
	font-size: 16px;
	font-family: ${({ theme }) => theme.font.family.poppins};
	margin-left: ${wp("2%")}px;
	color: #222128;
`;

export const SmallText = styled.Text`
	color: ${({ theme }) => theme.colors.gray["400"]};
	font-family: ${({ theme }) => theme.font.family.poppins};
	font-size: 12px;
	text-align: center;
	margin: ${wp("6%")}px 0;
	z-index: -1;
`;

export const SubmitButton = styled.TouchableOpacity`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.black["700"]};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: -10;
  height: 52px;
  border-radius: 28px;
`;

export const DropdownWrapper = styled.View`
	margin: ${`${wp("8%")}px ${wp("0%")}px`};
`;

export const InputWrapper = styled.View`
  margin-bottom: ${wp("4%")}px;
`;
