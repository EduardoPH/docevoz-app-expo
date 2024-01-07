import {
	widthPercentageToDP as wp
} from "react-native-responsive-screen";
import styled from "styled-components/native";

export const ScheduleInfoWrapper = styled.View`
	padding: ${`${wp("0%")}px ${wp("4%")}px`};
	margin-top: ${wp("0%")}px;
`;

export const SectionLabel = styled.Text`
	font-size: 16px;
	font-family: ${({ theme }) => theme.font.family.poppins};
	color: #171B2E;
	font-weight: bold;
`;

export const SongImage = styled.Image`
	border-radius: 16px;
	width: 100%;
	height: 183px;
	margin: ${wp("8%")}px ${wp("0%")}px;
`;

export const PlayButton = styled.Pressable`
	width: 47.25px;
	height: 46.69px;
	border-radius: 100px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: rgba(11, 10, 14, 0.5);
	margin-left: ${wp("4%")}px;

`;

export const Row = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const MutedText = styled.Text`
	font-size: 14px;
	color: ${({ theme }) => theme.colors.gray["200"]};
	font-family: ${({ theme }) => theme.font.family.poppins};
`;

export const InfoText = styled.Text`
	font-size: 14px;
	color: #171B2E;
	font-family: ${({ theme }) => theme.font.family.poppins};
	text-transform: capitalize;
`;

export const InfoRow = styled.View`
	margin: ${wp("2%")}px ${wp("0%")}px;
`;
