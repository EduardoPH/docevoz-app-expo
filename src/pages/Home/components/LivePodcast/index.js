import React from "react";
import { View } from "react-native";

import {
  CardBorder,
  CardContainer,
  PodcastAuthor,
  PodcastImage,
  PodcastTitle
} from "./styles";
import avatar from "../../../../assets/images/Avatar.png";
import { LiveBadge } from "../LiveBadge";
import { useNavigation } from "../../../../hooks/useNavigation";

export function LivePodcast({
  author = "Ryan Alencar",
  title = "Relacionamento saudável",
  isLive = true
}) {
  const {navigate} = useNavigation();

  const handleOpenLivePodcast = () => {
    console.log("open live podcast");
    navigate('Radio')
  };

  return (
    <CardBorder
      colors={["rgba(255, 255, 255, 0.102601)", "rgba(0, 0, 0, 0.10423)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <CardContainer onPress={handleOpenLivePodcast}>
        <View style={{
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          marginTop: 26
        }}>
          <PodcastTitle>{title}</PodcastTitle>
          <PodcastAuthor>Por {author}</PodcastAuthor>
        </View>
        <PodcastImage source={avatar} alt={`${title}-image`} />
        <LiveBadge />
      </CardContainer>
    </CardBorder>
  );
}
