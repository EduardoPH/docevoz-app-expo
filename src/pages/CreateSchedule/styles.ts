import DropDownPicker from "react-native-dropdown-picker";
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import styled from "styled-components/native";

import { isIOS } from "../../utils/os";

export const Feed = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: wp("4%"),
    paddingBottom: wp("12%"),
  },
})`
	background: ${({ theme }) => theme.colors.black["700"]};
	padding: ${wp("10%")}px ${wp("6%")}px;
`;


export const Header = styled.View`
	flex: 1;
	margin-top: ${wp("6%")}px;
	margin-bottom: ${wp("6%")}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const DateWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const HeaderText = styled.Text`
  font-family: ${({ theme }) => theme.font.family.poppins};
  color: ${({ theme }) => theme.colors.white["800"]};
  text-transform: capitalize;
`;

export const Day = styled(HeaderText)`
  font-weight: bold;
  font-size: 44px;
`;

export const Date = styled(HeaderText)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray["400"]};
  margin-left: ${wp("2%")}px;
  margin-bottom: ${wp(isIOS ? "2.6%" : "0%")}px;
`;

export const WeekDay = styled(HeaderText)`
  font-size: 16px;
`;

export const Form = styled.View`
  margin-top: 0px;
  margin-bottom: 86px;
`;

export const SubmitButton = styled.Pressable`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: -10;
  height: 52px;
  border-radius: 28px;

  background-color: ${({ theme }) => theme.colors.white["800"]};

  margin: ${wp("8%")}px ${wp("0%")}px;
`;

export const SubmitButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  font-family: ${({ theme }) => theme.font.family.poppins};
  color: ${({ theme }) => theme.colors.gray["900"]};
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: 26px;
`;

export const DDDWrapper = styled.View`
  width: 22px;
  height: 16px;
`;

export const DDDImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export const DDDDropdown = styled(DropDownPicker).attrs(({ theme: { colors } }) => ({
  dropDownDirection: "BOTTOM",
  listMode: "SCROLLVIEW",
  showArrowIcon: false,
  showTickIcon: false,
  containerStyle: {
    width: 40,
    maxWidth: 40,
  },
  dropDownContainerStyle: {
    width: 42,
    maxWidth: 42,
    zIndex: 100,
  },
  listItemLabelStyle: {
    display: "none"
  }
}))`
  background: transparent;
  border: 0;
  border-radius: 0;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.white[800]};
  width: 40px;
  min-width: 40px;
  max-width: 40px;
  min-height: 30px;
  max-height: 30px;
  z-index: -10;
`;

export const Spacer = styled.View`
  margin: 65px 0;
`;
