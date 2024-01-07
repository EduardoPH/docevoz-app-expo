import React from "react";
import { TextInputProps } from "react-native";

import { FieldError } from "react-hook-form";

import { Container, Input, InputLabel } from "./styles";
import { ErrorMessage } from "../../../../components/ErrorMessage";

interface IFormInputProps extends TextInputProps {
  label?: string;
  error?: FieldError
  withPaddingLeft?: boolean;
}

export function FormInput({ label, error, withPaddingLeft = false, ...props }: IFormInputProps) {
  return (
    <Container>
      {label && <InputLabel>{label}</InputLabel>}
      <Input
        withPaddingLeft={withPaddingLeft}
        {...props}
      />
      {error && <ErrorMessage errorMessage={error.message} />}
    </Container>
  );
}
