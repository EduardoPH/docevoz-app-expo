import React from "react";

import { widthPercentageToDP } from "react-native-responsive-screen";
import styled from "styled-components/native";

const Message = styled.Text`
  font-weight: bold;
  color: #DC143C;
  margin-top: ${widthPercentageToDP("2%")}px;
  z-index: -10;
`;

export function ErrorMessage({ errorMessage }) {
  return (
    <Message>
      {errorMessage}
    </Message>
  );
}
