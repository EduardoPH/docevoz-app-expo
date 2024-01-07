import React from "react";

import { AddButton, GiftCardsWrapper } from "./styles";
import { ButtonTitle, SectionTitle } from "../../styles";

export function GiftCards() {
  return (
    <>
      <SectionTitle style={{ marginTop: 0, marginBottom: 8 }}>Cartões Presentes</SectionTitle>
      <GiftCardsWrapper>
        <AddButton>
          <ButtonTitle>Adicionar</ButtonTitle>
        </AddButton>
      </GiftCardsWrapper>
    </>
  );
}
