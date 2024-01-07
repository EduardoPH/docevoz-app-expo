import React, { forwardRef } from "react";

import * as S from "./styles";
import { ErrorMessage } from "../ErrorMessage";

function ForwardInput({ error, width, ...props }, ref) {
  const hasError = !!error;

  return (
    <S.InputWrapper>
      <S.Input
        ref={ref}
        width={width}
        placeholderTextColor="#949599"
        hasError={hasError}
        {...props}
      />
      {hasError && (
        <ErrorMessage errorMessage={error?.message} />
      )}
    </S.InputWrapper>
  );
}

export const Input = forwardRef(ForwardInput);
