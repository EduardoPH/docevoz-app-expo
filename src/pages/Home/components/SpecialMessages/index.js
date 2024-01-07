import React from "react";

import { SpecialMessagesCard } from "./SpecialMessagesCard";
import { FeedHorizontal, SectionHeader, SubTitle, Title } from "./styles";

export function SpecialMessages({ cards }) {
  return (
    <>
      <SectionHeader>
        <Title>Para o seu dia</Title>
        <SubTitle>Telemensagens especiais para o seu dia dia</SubTitle>
      </SectionHeader>

      <FeedHorizontal>
        {cards.length > 0 && cards.map((card) =>
          <SpecialMessagesCard
            key={card.description}
            card={card}
          />
        )}
      </FeedHorizontal>
    </>
  );
}
