import React from "react";

import {
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { ButtonContainer, ButtonText, LoadingWrapper } from "./styles";
import LoadingSpinner from "../Loader";

export function Button({
  title,
  disabled,
  isLoading,
  loadingText,
  loaderProps,
  ...props }) {

  const loadingSpinnerProps = {
    animated: true,
    size: wp("6%"),
    circleSize: wp("5%"),
    strokeWidth: wp("0.64%"),
    color: "#fff",
    ...loaderProps
  };

  return (
    <ButtonContainer disabled={disabled || isLoading} {...props}>
      <ButtonText>{isLoading ? loadingText : title}</ButtonText>
      <LoadingWrapper>
        {isLoading && <LoadingSpinner {...loadingSpinnerProps} />}
      </LoadingWrapper>
    </ButtonContainer>
  );
}
