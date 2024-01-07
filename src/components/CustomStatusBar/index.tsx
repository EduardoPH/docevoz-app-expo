import { transparentize } from "polished";
import React from "react";
import { StatusBar, StatusBarProps, View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { isIOS } from "../../utils/os";

interface ICustomStatusBarProps extends StatusBarProps {
  backgroundColor?: string
}

const IOSSatusBarBlur = styled.View`
  width:100%;
  height: ${getStatusBarHeight(true)}px;
  position: absolute;
  top: 0;
  z-index: 1;
  opacity: 0.99;
`

export function CustomStatusBar({
  backgroundColor,
  barStyle = "light-content",
  ...props
}: ICustomStatusBarProps) {
  const theme = useTheme();
  
  const bgColor = backgroundColor ?? transparentize(isIOS?0.03:0.5, theme.colors.black[700]);

  if(isIOS) {
    return (
      <>
      <IOSSatusBarBlur 
        style={{
          backgroundColor: bgColor,
          ...props
        }}
        />
        <StatusBar
          barStyle={barStyle}
          animated
          networkActivityIndicatorVisible
          {...props}
        />
      </>
    )
  }

  return (
    <StatusBar
      translucent
      backgroundColor={bgColor}
      barStyle={barStyle}
      animated
      networkActivityIndicatorVisible
      {...props}
    />
  );
}
