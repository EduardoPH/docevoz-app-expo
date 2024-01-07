import { transparentize } from "polished";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getStatusBarHeight } from "react-native-status-bar-height";
import styled from "styled-components/native";

export const LayoutWrapper = styled.View`
  width: 100%;
  height: 100%;
  `;

export const PageContainer = styled.View`
  flex: 1;
`;