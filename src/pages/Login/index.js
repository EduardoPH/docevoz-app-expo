import React, { useState, useRef } from "react";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { loginFormSchema } from "./form-schema";
import * as S from "./styles";
import Requests from "../../classes/Requests";
import { Button } from "../../components/Button";
import DDDSelect, { DDDOptions } from "../../components/DDDSelect";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { useNavigation } from "../../hooks/useNavigation";

const Login = () => {
	const { navigate } = useNavigation();
	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors, isLoading, isSubmitting, isValidating } } = useForm({
			defaultValues: {
				ddd: "244",
				phone: "",
				password: ""
			},
			resolver: yupResolver(loginFormSchema),
		});
	const [ShowOptions, setShowOptions] = useState(false);
	const passwordInputRef = useRef();

	const handleLogin = handleSubmit(async (data) => {
		await Requests.createLogin(data);
	});

	const submitButtonLoading = isLoading || isSubmitting || isValidating;

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<>
				<S.Feed keyboardShouldPersistTaps="always">
					<S.Title>Boas-vindas de volta!</S.Title>
					<S.SubTitle>Estamos muito animados em te ver novamente!</S.SubTitle>

					<S.Form>
						<S.FormTitle>INFORMAÇÔES DE CONTA</S.FormTitle>
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
											passwordInputRef.current.focus();
										}}
										blurOnSubmit={false}
										placeholder="Número de telefone"
										error={errors.phone}
									/>
								}
							/>
						</S.FormRow>

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
									onSubmitEditing={handleLogin}
									error={errors.password}
								/>}
						/>

						<S.Row>
							<S.CreateAccount onPress={() => navigate("Register")}>
								<S.CreateAccountText>Criar uma conta</S.CreateAccountText>
							</S.CreateAccount>

							<S.CreateAccount onPress={() => navigate("ResetPassword")}>
								<S.CreateAccountText>Esqueci a senha</S.CreateAccountText>
							</S.CreateAccount>
						</S.Row>

						<Button
							title="Entrar"
							isLoading={submitButtonLoading}
							loadingText="Validando informações..."
							onPress={handleLogin}
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

export default Login;
