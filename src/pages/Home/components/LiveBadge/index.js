import React from "react";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components/native";


const LiveBadgeWrapper = styled.View`
  max-width: ${wp("12%")}px;
  background: ${({ theme }) => theme.colors.pink["800"]};
  border-radius: 25px;
  padding: ${`${wp("1%")}px ${wp("2%")}px`};
  position: absolute;
  top: ${wp("4%")}px;
  left: ${wp("4%")}px;
`;

const LiveBadgeText = styled.Text`
  color: ${({ theme }) => theme.colors.white["800"]};
  font-weight: bold;
`;

export function LiveBadge({ ...props }) {
  return (
    <LiveBadgeWrapper>
      <LiveBadgeText>• Live</LiveBadgeText>
    </LiveBadgeWrapper>
  );
}
