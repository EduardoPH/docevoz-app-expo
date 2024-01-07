import React from "react";

import { useTheme } from "styled-components";
import styled from "styled-components/native";

const HorizontalLine = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Circle = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 10px;
  background-color: transparent;
  border: 1px solid #9DA4B7;
  align-items: center;
  justify-content: center;
`;

const InnerCircle = styled.View`
  width: 4px;
  height: 4px;
  border-radius: 5px;
  background-color: black;
  align-items: center;
  justify-content: center;
`;

const Line = styled.View<{ lineColor: string }>`
  width: 50%;
  height: 1px;
  background-color: ${({ lineColor }) => lineColor};
`;

interface ILineWithCirclesProps {
  lastInnerCircleColor?: string;
  lineColor?: string;
}

export function LineWithCircles({ lastInnerCircleColor, lineColor }: ILineWithCirclesProps) {
  const { colors } = useTheme();

  return (
    <HorizontalLine>
      <Circle>
        <InnerCircle />
      </Circle>
      <Line lineColor={lineColor ?? colors.darkBlue[800]} />
      <Circle>
        <InnerCircle
          style={{
            backgroundColor: lastInnerCircleColor ?? colors.yellow["600"]
          }}
        />
      </Circle>
    </HorizontalLine>
  );
}
