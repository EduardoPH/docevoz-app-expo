import React, { RefObject, forwardRef } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Modalize, ModalizeProps } from "react-native-modalize";
import { IHandles } from "react-native-modalize/lib/options";

import { editUserFormSchema, FormData } from "./form-schema";
import { AvatarText, AvatarWrapper, Container, Footer, FooterButton, FormContainer, Input, Message } from "./styles";
import { ButtonTitle } from "../../styles";
import { Avatar } from "../../../../components/Avatar";
import { CancelButton } from "../../../../components/CancelButton";

interface IEditUserModalProps extends ModalizeProps {
}

function Modal({ ...props }: IEditUserModalProps, ref: RefObject<IHandles>) {
  const {
    handleSubmit,
    control
  } = useForm<FormData>({
    resolver: yupResolver(editUserFormSchema)
  });

  const closeModal = () => {
    ref.current?.close();
  };

  const handleEditUser = handleSubmit(async (data) => {
    console.log(data);
    closeModal();
  });

  return (
    <Modalize
      ref={ref}
      modalHeight={700}
      velocity={10}
      withHandle={false}
      FooterComponent={
        <Footer>
          <FooterButton onPress={closeModal}>
            <ButtonTitle>Cancelar</ButtonTitle>
          </FooterButton>
          <FooterButton onPress={handleEditUser}>
            <ButtonTitle>Guardar</ButtonTitle>
          </FooterButton>
        </Footer>
      }
      keyboardAvoidingBehavior="height"
      {...props}
    >
      <Container>
        <CancelButton onPress={closeModal} />
        <AvatarWrapper>
          <Avatar
            style={{ borderWidth: 0 }}
            size={140}
            source={{ uri: "https://i.pravatar.cc/" }}
          />
          <AvatarText>Alterar foto</AvatarText>
        </AvatarWrapper>
        <FormContainer>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) =>
              <Input
              style={{ color: 'black'}}
                onChangeText={onChange}
                value={value}
              />
            }
          />
          <Message>por motivos de segurança So é permitido alterar o nome depois de 30 dias. </Message>
          <Controller
            name="country"
            control={control}
            render={({ field: { value, onChange } }) =>
              <Input
              style={{ color: 'black'}}
                onChangeText={onChange}
                value={value}
              />
            }
          />
          <Message>apos alterar o pais altere o número de telefone para que possamos enviar a sms de confirmação  </Message>
          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange } }) =>
              <Input
              style={{ color: 'black'}}
                onChangeText={onChange}
                value={value}
              />
            }
          />
          <Message>por motivos de segurança So é permitido alterar o nome depois de 30 dias. </Message>
        </FormContainer>
      </Container>
    </Modalize>
  );
}

export const EditUserModal = forwardRef<RefObject<IHandles>, IEditUserModalProps>(Modal);
