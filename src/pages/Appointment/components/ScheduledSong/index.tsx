import React from "react";
import { PressableProps } from "react-native";

import { Container, ForText, RecipientName, SongTitle } from "./styles";
import { Avatar } from "../../../../components/Avatar";

interface IScheduledSongProps extends PressableProps {
  title: string;
  recipient: string;
  color: string;
}

export function ScheduledSong({ recipient, title, color, onPress, ...props }: IScheduledSongProps) {
  return (
    <Container {...props}>
      <Avatar
        style={{ borderColor: color }}
        size={100}
        source={{ uri: "https://i.pravatar.cc/" }}
        onPress={onPress}
      />
      <SongTitle numberOfLines={1}>
        {title}
      </SongTitle>
      <ForText numberOfLines={1}>
        Para <RecipientName>{recipient}</RecipientName>
      </ForText>
    </Container>
  );
}
