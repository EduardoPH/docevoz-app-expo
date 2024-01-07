import { TouchableOpacity, ScrollView } from "react-native";

import {
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import styled from "styled-components/native";

export const Feed = styled(ScrollView).attrs({
	contentContainerStyle: {
		alignItems: "center",
	},
})`
	background-color: ${({ theme }) => theme.colors.black["700"]};
	padding-top: ${wp("14%")}px;
`;

export const Title = styled.Text`
	font-size: ${wp("6%")}px;
	font-weight: bold;
	margin-bottom: ${wp("1%")}px;
	color: #fff;
`;

export const SubTitle = styled.Text`
	font-size: ${wp("3.8%")}px;
	font-weight: 500;
	color: #949599;
`;

export const Form = styled.View`
	width: ${wp("90%")}px;
	margin-top: ${wp("10%")}px;
`;

export const FormRow = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${wp("4%")}px;
`;

export const FormTitle = styled.Text`
	font-size: ${wp("3.5%")}px;
	font-weight: 600;

	margin-bottom: ${wp("2%")}px;

	color: #949599;
`;

export const CreateAccount = styled(TouchableOpacity).attrs({
	activeOpacity: 1,
})`
`;

export const CreateAccountText = styled.Text`
	color: #6c8ba2;
	font-size: ${wp("4%")}px;
	font-weight: bold;
`;

export const Row = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin: ${wp("3%")}px 0;
`;
