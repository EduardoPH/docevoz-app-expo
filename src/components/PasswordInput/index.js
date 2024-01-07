import React, { useState, forwardRef } from "react";

import * as S from "./styles";
import { ErrorMessage } from "../ErrorMessage";

function Input({ error, ...props }, ref) {
  const [showPassword, setShowPassword] = useState(false);
  const hasError = !!error;

  return (
    <>
      <S.WrapperInput>
        <S.Input
          ref={ref}
          secureTextEntry={!showPassword}
          placeholder="Senha"
          placeholderTextColor="#949599"
          hasError={hasError}
          {...props}
        />
        <S.ButtonWrapper>
          <S.ShowButton onPress={() => setShowPassword(state => !state)}>
            {showPassword ? <S.EyeCloseIcon /> : <S.EyeIcon />}
          </S.ShowButton>
        </S.ButtonWrapper>
      </S.WrapperInput>
      {hasError && (
        <ErrorMessage errorMessage={error?.message} />
      )}
    </>
  );
}

export const PasswordInput = forwardRef(Input);
