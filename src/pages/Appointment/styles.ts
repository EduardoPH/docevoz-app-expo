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
	padding: ${wp(isIOS ? "5%" : "10%")}px ${wp("0%")}px;
`;

export const Header = styled.View`
  margin-left: ${wp("4%")}px;
`

export const PageTitle = styled.Text`
  font-size: 16px;
	font-family: ${({ theme }) => theme.font.family.poppins};
	font-weight: bold;
	color: ${({ theme }) => theme.colors.black["700"]};
  text-transform: capitalize;
  margin-top: ${wp("8%")}px;
  margin-bottom: ${wp("8%")}px;
  margin-left: ${wp("2%")}px;
`;

export const DateTitle = styled.Text`
  font-size: 20px;
	font-family: ${({ theme }) => theme.font.family.poppins};
	font-weight: bold;
	color: ${({ theme }) => theme.colors.gray["300"]};
  margin-bottom: ${wp("8%")}px;
`;

export const AppointmentsWrapper = styled.View`
  align-items: center;
  justify-content: center;
  padding-bottom: ${wp("8%")}px;
`;

export const Divider = styled.View`
  margin: ${wp("4%")}px ${wp("2%")}px;
`;
