import React, { useState } from "react";
import { Platform, KeyboardAvoidingView } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useReducerSchedule } from "../../store/hooks/schedule";
import { useNavigation } from "../../hooks/useNavigation";
import { useUser } from "../../hooks/useUser";
import { AccordionButton } from "./components/AccordionButton";
import { FormInput } from "./components/FormInput";
import { InputLabel } from "./components/FormInput/styles";
import { RadioButtonGroup } from "./components/RadioButtonGroup";
import { DDDDropdown, DDDImage, DDDWrapper, Date, DateWrapper, Day, Feed, Form, Header, Row, SubmitButton, SubmitButtonText, WeekDay } from "./styles";
import { CreateScheduleFormData, generateDatePieces, createScheduleFormSchema, formatSelectedTime, countriesDDD, radioOptions } from "./util";
import { ErrorMessage } from "../../components/ErrorMessage";
import { GoBackButton } from "../../components/GoBackButton";
import { handleChangeStatusBarColor } from "../../utils/statusbarColor";

interface RouteParams {
  songId: string;
  date: string;
  customId?: string;
}

export function CreateSchedule() {
  const { User } = useUser();
  const [selectDDDOpen, setSelectDDDOpen] = useState(false);
  const [selectToDDDOpen, setSelectToDDDOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs().toDate());
  const { navigate } = useNavigation();

  const { date, songId, customId } = (useRoute().params ?? {}) as RouteParams;
  const { control, handleSubmit, getValues, formState: { errors } } = useForm<CreateScheduleFormData>({
    defaultValues: {
      ddd: User?.ddd,
      name: User?.name,
      phone: User?.phone,
      code: "",
      withReference: false,
      toDDD: "244",
      toName: "",
      toPhone: "",
      voice: "",
      hour: ""
    },
    resolver: yupResolver(createScheduleFormSchema),
  });


  const [, { updateSchedule }] = useReducerSchedule();
  const { day, month, weekDay, year } = generateDatePieces(date);

  const handleCreateSchedule = handleSubmit(data => {
    const { code, withReference } = data;

    const formattedData = {
      date,
      ...data,
      ...(customId
        ? { customId }
        : { songId }),
      ...(User?.ddd === "244"
        ? {
          ...(code && { code }),
          ...(withReference && { withReference }),
        }
        : { code }),
    };

    updateSchedule(formattedData);
    navigate("ConfirmSchedule");
  });

  const formattedCountriesDDD = countriesDDD.map(ddd => ({
    ...ddd,
    icon: () => <DDDWrapper>
      <DDDImage resizeMode="cover" borderRadius={2} source={ddd.icon} />
    </DDDWrapper>
  }));

  return (
    <KeyboardAvoidingView>
      <Feed onScroll={handleChangeStatusBarColor} nestedScrollEnabled>
        <GoBackButton />
        <Header>
          <DateWrapper>
            <Day>{day}</Day>
            <Date>{month} {year}</Date>
          </DateWrapper>
          <WeekDay>{weekDay}</WeekDay>
        </Header>

        <AccordionButton
          title={getValues("hour") ? `Horário selecionado: ${getValues("hour")}` : "Escolher um horário"}
          hasAccordion={false}
          onPress={() => {
            setIsTimePickerOpen(prev => !prev);
          }}
        />
        {errors?.hour && <ErrorMessage errorMessage={errors?.hour?.message} />}

        <Form>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) =>
              <FormInput
                label="Nome do destinatário"
                value={value}
                onChangeText={onChange}
                error={errors.name}
              />
            }
          />

          <InputLabel>Número de telefone do destinario</InputLabel>
          <Row>
            <Controller
              control={control}
              name="ddd"
              render={({ field: { onChange, value } }) =>
                <DDDDropdown
                  open={selectDDDOpen}
                  items={formattedCountriesDDD}
                  setOpen={setSelectDDDOpen}
                  value={value}
                  setValue={(data) => {
                    onChange(data());
                  }}
                />
              }
            />
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) =>
                <FormInput
                  withPaddingLeft
                  value={value}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                />
              }
            />
          </Row>
          {errors.phone && <ErrorMessage errorMessage={errors.phone.message} />}
          {errors.ddd && <ErrorMessage errorMessage={errors.ddd.message} />}

          <Controller
            control={control}
            name="toName"
            render={({ field: { onChange, value } }) =>
              <FormInput
                label="Nome do receptor"
                placeholder="Digite o nome dele (a)"
                value={value}
                onChangeText={onChange}
                error={errors.toName}
              />
            }
          />

          <InputLabel>Número de telefone do receptor</InputLabel>
          <Row style={{ zIndex: -1 }}>
            <Controller
              control={control}
              name="toDDD"
              render={({ field: { onChange, value } }) =>
                <DDDDropdown
                  style
                  open={selectToDDDOpen}
                  items={formattedCountriesDDD}
                  setOpen={setSelectToDDDOpen}
                  value={value}
                  setValue={(data) => {
                    onChange(data());
                  }}
                />
              }
            />
            <Controller
              control={control}
              name="toPhone"
              render={({ field: { onChange, value } }) =>
                <FormInput
                  withPaddingLeft
                  placeholder="000 000 000"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                />
              }
            />
          </Row>
          {errors.toPhone && <ErrorMessage errorMessage={errors.toPhone.message} />}
          {errors.toDDD && <ErrorMessage errorMessage={errors.toDDD.message} />}

          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, value } }) =>
              <FormInput
                label="🎁 Código do cartão presente"
                value={value}
                onChangeText={onChange}
                error={errors.code}
              />
            }
          />
        </Form>

        <AccordionButton
          isExpanded={isAccordionExpanded}
          setIsExpanded={setIsAccordionExpanded}
          title={getValues("voice") ? `Voz selecionada: ${getValues("voice")}` : "Escolha uma voz para a ligação"}
        >
          <RadioButtonGroup
            options={radioOptions}
            control={control}
            name="voice"
            setIsExpanded={setIsAccordionExpanded}
          />
        </AccordionButton>
        {errors.voice && <ErrorMessage errorMessage={errors.voice.message} />}

        <SubmitButton onPress={handleCreateSchedule}>
          <SubmitButtonText>
            Criar agendamento
          </SubmitButtonText>
        </SubmitButton>

        <Controller
          control={control}
          name="hour"
          render={({ field: { onChange } }) => (
            <DateTimePickerModal
              date={currentDate}
              isDarkModeEnabled={Platform.OS === "android"}
              is24Hour
              isVisible={isTimePickerOpen}
              confirmTextIOS="Confirmar"
              cancelTextIOS="Cancelar"
              locale="pt-br"
              mode="time"
              themeVariant="light"
              textColor="#000000"
              onConfirm={_date => {
                setCurrentDate(_date);
                onChange(
                  formatSelectedTime(date, _date.toISOString())
                );
                setIsTimePickerOpen(false);
              }}
              onCancel={() => setIsTimePickerOpen(false)}
              onHide={() => setIsTimePickerOpen(false)}
            />
          )}
        />
      </Feed>
    </KeyboardAvoidingView>
  );
}
