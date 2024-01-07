import {
	widthPercentageToDP as wp
} from "react-native-responsive-screen";
import styled from "styled-components/native";

export const Feed = styled.ScrollView.attrs({
	showsVerticalScrollIndicator: false,
	contentContainerStyle: {
		paddingTop: wp("4%"),
		paddingBottom: wp("12%"),
	},
})`
	background: ${({ theme }) => theme.colors.white["800"]};
	padding: ${`${wp("6%")}px ${wp("6%")}px`};
`;

export const Header = styled.View`
	flex-direction: row;
	align-items: center;
	padding: ${wp("2%")}px ${wp("6%")}px;
`;

export const SuccessText = styled.Text`
	color: ${({ theme }) => theme.colors.green["700"]};
	font-family: ${({ theme }) => theme.font.family.poppins};
	font-size: 24px;
	text-align: center;
`;

export const ScheduleInfoWrapper = styled.View`
	align-items: center;
	justify-content: center;
	margin: ${`${wp("10%")}px ${wp("0%")}px`};
	padding: ${`${wp("0%")}px ${wp("6%")}px`};
`;

export const DateBox = styled.View`
	border-radius: 20px;
	height: 123px;
	width: 100%;
	border: 1px solid #FFFF00;
	margin-top: ${wp("6%")}px;
	padding: ${`${wp("6%")}px ${wp("6%")}px`};
	justify-content: center;
`;

export const Row = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const DateText = styled.Text`
	font-family: ${({ theme }) => theme.font.family.sfProDisplay};
	font-size: 16px;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.darkBlue[800]};
`;

export const PersonText = styled.Text`
	font-family: ${({ theme }) => theme.font.family.sfProDisplay};
	font-size: 12px;
	color: ${({ theme }) => theme.colors.darkBlue[800]};
`;

export const SectionLabel = styled.Text`
	font-size: 16px;
	font-family: ${({ theme }) => theme.font.family.poppins};
	color: #171B2E;
	font-weight: bold;
`;

export const PlayButton = styled.Pressable`
	width: 47.25px;
	height: 46.69px;	
	border-radius: 100px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: rgba(11, 10, 14, 0.5);
`;

export const MutedText = styled.Text`
	font-size: 14px;
	color: ${({ theme }) => theme.colors.gray["200"]};
	font-family: ${({ theme }) => theme.font.family.poppins};
`;

export const InfoText = styled.Text`
	font-size: 14px;
	color: ${({ theme }) => theme.colors.darkBlue[800]};
	font-family: ${({ theme }) => theme.font.family.poppins};
`;
