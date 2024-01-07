import React from "react";
import { PressableProps, ImageSourcePropType } from "react-native";

import styled from "styled-components/native";

interface IAvatarProps extends PressableProps {
  size?: number;
  source: ImageSourcePropType;
  badge?: any;
}

const AvatarImage = styled.ImageBackground<{ size: number }>`
  width: 100%;
  height: 100%;
`;

const AvatarWrapper = styled.Pressable.attrs<{ size: number }>(({ size }) => ({
  borderRadius: size,
})) <{ size: number }>`
  border-radius: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: 1px solid white;
`;

export function Avatar({
  size = 50,
  source,
  badge,
  ...props }: IAvatarProps) {
  return (
    <AvatarWrapper size={size} {...props}>
      <AvatarImage
        borderRadius={size}
        size={size}
        source={source}
      />
      {badge}
    </AvatarWrapper>
  );
}

