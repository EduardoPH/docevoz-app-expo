import React from "react";

import { useUser } from "../../../../hooks/useUser";
import { EditButton, InfoWrapper, LabelKey, LabelValue, Row, Username } from "./styles";
import { ButtonTitle, CountryBadge, SectionTitle } from "../../styles";
import { Avatar } from "../../../../components/Avatar";
import { getCountryImage } from "../../../../utils/countryImage";

interface IUserInfoProps {
  openEditUserModal: () => void
}

export function UserInfo({ openEditUserModal }: IUserInfoProps) {
  const { User } = useUser();
  const { name, phone, country } = User;

  const countryImg = getCountryImage(country ?? "");

  return (
    <>
      <SectionTitle>Perfil</SectionTitle>
      <InfoWrapper>
        <Row>
          <Avatar
            style={{ borderWidth: 0 }}
            size={60}
            source={{ uri: "https://i.pravatar.cc/" }}
            badge={
              <CountryBadge
                size={28}
                source={countryImg}
              />
            }
          />
          <Username>{name}</Username>
        </Row>
        <Row>
          <LabelKey>Telemovel:</LabelKey>
          <LabelValue>{phone}</LabelValue>
        </Row>
        <Row>
          <LabelKey>Pais:</LabelKey>
          <LabelValue>{country}</LabelValue>
        </Row>
        <Row>
          <LabelKey>Gênero:</LabelKey>
          <LabelValue>Masculino</LabelValue>
        </Row>
        <EditButton onPress={openEditUserModal}>
          <ButtonTitle>Editar</ButtonTitle>
        </EditButton>
      </InfoWrapper>
    </>
  );
}
