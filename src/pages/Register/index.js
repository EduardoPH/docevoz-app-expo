import React, { useState, useRef } from "react";
import { Keyboard, TouchableWithoutFeedback, Platform, View } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { registerFormSchema } from "./form-schema";
import * as S from "./styles";
import Requests from "../../classes/Requests";
import { Button } from "../../components/Button";
import DDDSelect, { DDDOptions } from "../../components/DDDSelect";
import { GoBackButton } from "../../components/GoBackButton";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

const Register = () => {
	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors, isLoading, isSubmitting, isValidating } } = useForm({
			defaultValues: {
				ddd: "244",
				phone: "",
				password: "",
				name: "",
			},
			resolver: yupResolver(registerFormSchema),
		});

	const [ShowOptions, setShowOptions] = useState(false);
	const passwordInputRef = useRef();
	const nameInputRef = useRef();

	const handleRegister = handleSubmit(async (data) => {
		await Requests.createRegister(data);
	});

	const submitButtonLoading = isLoading || isSubmitting || isValidating;

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<>
				<S.Feed>
					<S.Row>
						<GoBackButton />
					</S.Row>

					<S.Title>Insira os dados</S.Title>

					<S.Form>
						<S.FormTitle>INFORMAÇÔES DE REGISTRO</S.FormTitle>
						<S.FormRow>
							<Controller
								name="ddd"
								control={control}
								render={({ field: { value } }) =>
									<DDDSelect value={value} setShowOptions={setShowOptions} />}
							/>

							<Controller
								name="phone"
								control={control}
								render={({ field: { value, onChange } }) =>
									<Input
										width={58}
										keyboardType={Platform.select({
											ios: "number-pad",
											android: "phone-pad",
										})}
										value={value}
										onChangeText={phone => {
											phone = phone.replace(/\D/g, "");
											onChange(phone);
										}}
										returnKeyType="next"
										returnKeyLabel="Próximo"
										onSubmitEditing={() => {
											nameInputRef.current.focus();
										}}
										blurOnSubmit={false}
										placeholder="Número de telefone"
										error={errors.phone}
									/>
								}
							/>
						</S.FormRow>

						<View style={{ marginBottom: wp("3.5%") }}>
							<Controller
								name="name"
								control={control}
								render={({ field: { value, onChange } }) =>
									<Input
										ref={nameInputRef}
										value={value}
										onChangeText={onChange}
										placeholder="Nome completo"
										returnKeyType="next"
										returnKeyLabel="Próximo"
										onSubmitEditing={() => {
											passwordInputRef.current.focus();
										}}
										blurOnSubmit={false}
										error={errors.name}
									/>
								}
							/>
						</View>

						<View style={{ marginBottom: wp("3.5%") }}>
							<Controller
								name="password"
								control={control}
								render={({ field: { onChange, value } }) =>
									<PasswordInput
										ref={passwordInputRef}
										onChangeText={onChange}
										value={value}
										returnKeyType="send"
										returnKeyLabel="Entrar"
										onSubmitEditing={handleRegister}
										error={errors.password}
									/>
								}
							/>
						</View>

						<Button
							title="Criar"
							isLoading={submitButtonLoading}
							loadingText="Validando informações..."
							onPress={handleRegister}
						/>
					</S.Form>
				</S.Feed>

				{ShowOptions && (
					<DDDOptions
						setShowOptions={setShowOptions}
						onChange={ddd => {
							setValue("ddd", ddd);
							setShowOptions(false);
						}}
					/>
				)}
			</>
		</TouchableWithoutFeedback>
	);
};

export default Register;
