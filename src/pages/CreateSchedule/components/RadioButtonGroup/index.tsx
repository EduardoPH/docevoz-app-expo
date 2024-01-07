import React, { Dispatch, SetStateAction } from "react";
import { View, Pressable, Text } from "react-native";

import { Controller } from "react-hook-form";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components/native";

type RadioOption = {
  label: string;
  value: string;
};

type RadioProps = {
  options: RadioOption[];
  control: any;
  name: string;
  setIsExpanded: Dispatch<SetStateAction<boolean>>
};

const RadioContainer = styled(View)`
  flex: 1;
  margin: ${wp("4%")}px ${wp("4%")}px;
`;

const RadioOptionLabel = styled(Text)`
  color: black;
  font-family: ${({ theme }) => theme.font.family.inter};
`;

const RadioButton = styled(Pressable) <{ selected: boolean }>`
  padding: ${wp("4%")}px ${wp("4%")}px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${({ theme, selected }) => selected ? theme.colors.darkBlue[800] : theme.colors.gray["100"]};
  align-items: center;
  justify-content: center;
  margin: ${wp("2%")}px ${wp("0%")}px;
`;

export function RadioButtonGroup({ options, control, name,setIsExpanded }: RadioProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <RadioContainer>
          {options.map((option) => {
            const selected = value === option.value;

            return (
              <RadioButton
                key={option.value}
                onPress={() => {
                  onChange(option.value);
                  setIsExpanded(false)
                }}
                selected={selected}
              >
                <RadioOptionLabel>
                  {option.label}
                </RadioOptionLabel>
              </RadioButton>
            );
          })}
        </RadioContainer>
      )}
    />
  );
}
