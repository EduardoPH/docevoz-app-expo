import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components/native";

import { Button } from "../../styles";

export const Container = styled.View`
`;

// Avatar
export const AvatarWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: ${wp("8%")}px;
`;
export const AvatarText = styled.Text`
  font-family: ${({ theme }) => theme.font.family.poppins};
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black["900"]};
  margin-top: ${wp("4%")}px;
`;

// Form
export const FormContainer = styled.View`
  flex: 1;
  margin: ${`${wp("0%")}px ${wp("4%")}px`};
`;

export const Input = styled.TextInput`
  border-bottom-width: 1px;
  font-family: ${({ theme }) => theme.font.family.dearHeart};
  font-size: 64px;
`;

export const Message = styled.Text`
  font-family: ${({ theme }) => theme.font.family.poppins};
  font-size: 12px;
  color: rgba(112, 106, 106, 0.67);
  text-align: center;
  margin: 0 auto;
  margin-top: ${wp("2%")}px;
  width: ${wp("80%")}px;
`;


// Footer
export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${wp("6%")}px;
`;

export const FooterButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.gray["500"]};
  border: 1px solid #FFF7F7;
  width: 100px;
  height: 40px;
  margin: ${`${wp("0%")}px ${wp("4%")}px`};
`;

