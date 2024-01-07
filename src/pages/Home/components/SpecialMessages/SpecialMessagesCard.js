import React from "react";


import { MessageCardContainer, MessageCardDescription, MessageCardDescriptionText, MessageCardImage } from "./styles";


export function SpecialMessagesCard({ card }) {
  const { image, description } = card;

  const handleMessageCardPress = () => { };

  return (
    <MessageCardContainer onPress={handleMessageCardPress}>
      <MessageCardImage
        source={image}
        resizeMode="cover"
        borderRadius={7}
      >
        <MessageCardDescription>
          <MessageCardDescriptionText>
            {description}
          </MessageCardDescriptionText>
        </MessageCardDescription>
      </MessageCardImage>
    </MessageCardContainer>
  );
}
