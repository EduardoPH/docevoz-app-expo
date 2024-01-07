import { transparentize } from "polished";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components/native";
import { isIOS } from "../../utils/os";

export const Feed = styled.ScrollView.attrs({
	showsVerticalScrollIndicator: false,
	contentContainerStyle: {
		paddingTop: wp(isIOS ? "8%" : "4%"),
		paddingBottom: wp("12%"),
	},
})`
	background: ${({ theme }) => theme.colors.white["500"]};
	padding: ${wp(isIOS ? "5%" : "10%")}px ${wp("4%")}px;
`;

export const Content = styled.View`
  padding: ${`${wp("0%")}px ${wp("4%")}px`};
`;

export const PageTitle = styled.Text`
  font-size: 16px;
	font-family: ${({ theme }) => theme.font.family.poppins};
	font-weight: bold;
	color: #0B0A0A;
  text-transform: capitalize;
  margin-top: ${wp("8%")}px;
  margin: ${wp("8%")}px;
  margin-left: ${wp("2%")}px;
`;

export const AppointmentWrapper = styled.View`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white[800]};
  margin-bottom: ${wp("8%")}px;
`;

export const DateBox = styled.View<{ color: string }>`
	border-radius: 20px;
	height: 123px;
	width: 100%;
	border: 1px solid ${({ color }) => color};
	margin-bottom: ${wp("6%")}px;
	padding: ${`${wp("6%")}px ${wp("6%")}px`};
	justify-content: center;
`;

export const Row = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const Column = styled.View`
	align-items: center;
	justify-content: center;
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

export const PlayButton = styled.Pressable<{ bgColor?: string }>`
	width: 47.25px;
	height: 46.69px;
	border-radius: 100px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: ${({ bgColor }) => bgColor ?? "rgba(11, 10, 14, 0.5)"};
`;

export const SongLabel = styled.Text`
  font-weight: bold;
  font-family: ${({ theme }) => theme.font.family.poppins};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkBlue[800]};
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

export const AppointmentInfoWrapper = styled.View`
	width: 90%;
	margin: 0 auto;
	align-items: center;
	justify-content: center;
`;

export const DashedLine = styled.View`
	width: 100%;
	height: 1px;
	border: 1px dashed #EFF0F9;
`;

export const UserRecordWrapper = styled.View`
	margin: ${wp("8%")}px ${wp("0%")}px;
`;

export const Circle = styled.View`
	width: 38px;
	height: 38px;
	border-radius: 38px;
	background: ${({ theme }) => theme.colors.white["500"]};
`;

export const UserPlayButton = styled.View`
	width: 84px;
	height: 83px;
	border-radius: 84px;
	background-color: ${transparentize(0.9, "#1E1E1E")};
	align-items: center;
	justify-content: center;
`;

export const ShelveButton = styled.Pressable<{ bgColor: string }>`
	height: 52px;
	justify-content: center;
	align-items: center;
	border-radius: 28px;
	background-color: ${({ bgColor }) => bgColor};
`;
export const ShelveButtonText = styled.Text`
	color: ${({ theme }) => theme.colors.white[800]};
	font-size: 16px;
	font-family: ${({ theme }) => theme.font.family.poppins};
	font-weight: bold;
`;
