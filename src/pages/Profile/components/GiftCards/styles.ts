import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components/native";

import { Button } from "../../styles";

export const GiftCardsWrapper = styled.View`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  height: 365px;
  background-color: ${({ theme }) => theme.colors.white["500"]};
  border-radius: 30px;
`;

export const AddButton = styled(Button)`
  width: 100px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.black["200"]};
  margin: ${`${wp("4%")}px ${wp("3%")}px`};
`;
