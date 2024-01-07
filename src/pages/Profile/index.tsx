import React, { useEffect } from "react";

import { useModalize } from "react-native-modalize";

import { GiftCards, UserInfo } from "./components";
import { EditUserModal } from "./components/EditUserModal";
import { ButtonTitle, Container, LogoutButton, SectionTitle } from "./styles";
import { GoBackButton } from "../../components/GoBackButton";
import { handleChangeStatusBarColor } from "../../utils/statusbarColor";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export function Profile() {
  const { open, ref } = useModalize();

  return (
    <>
      <Container onScroll={handleChangeStatusBarColor}>
        <GoBackButton light={false} />


        <UserInfo openEditUserModal={open} />
        <GiftCards />

<View>
<SectionTitle style={{ marginBottom: 0 }}>Conta</SectionTitle>

</View>

<View>
<SectionTitle style={{ marginTop: 6 }}>Sobre</SectionTitle>
</View>
     

        <LogoutButton>
          <ButtonTitle>Terminar sessão</ButtonTitle>
        </LogoutButton>
      </Container>
      <EditUserModal ref={ref} />
    </>
  );
}
