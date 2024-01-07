import React from "react";
import { PressableProps } from "react-native";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Feather from "react-native-vector-icons/Feather";
import styled from "styled-components/native";

interface ICancelButtonProps extends PressableProps {
  onPress: () => void;
}

const CancelButtonWrapper = styled.Pressable`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white["500"]};
  border-radius: 100px;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 0;
  left: 0;
  margin: ${`${wp("4%")}px ${wp("4%")}px`};
`;

export function CancelButton({ onPress, ...props }: ICancelButtonProps) {
  return (
    <CancelButtonWrapper onPress={onPress} {...props}>
      <Feather name="x" size={20} color="#05061B" />
    </CancelButtonWrapper>
  );
}
