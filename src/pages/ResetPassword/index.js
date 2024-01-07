import React, { useState, useRef } from "react";
import { TouchableWithoutFeedback, Keyboard, Platform, View } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import * as S from "./styles";
import Requests from "../../classes/Requests";
import { Button } from "../../components/Button";
import DDDSelect, { DDDOptions } from "../../components/DDDSelect";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { useNavigation } from "../../hooks/useNavigation";
import { loginFormSchema } from "../Login/form-schema";

const ResetPassword = () => {
	const { goBack } = useNavigation();
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

	const handleResetPassword = handleSubmit(async (data) => {
		await Requests.resetPassword(data);
	});

	const submitButtonLoading = isLoading || isSubmitting || isValidating;

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<>
				<S.Feed>
					<S.Title>Esqueceu sua senha</S.Title>
					<S.SubTitle>Forneça seu número de telefone e sua nova senha.</S.SubTitle>

					<S.Form>
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
						<View style={{ marginBottom: wp("3.5%") }}>
							<Controller
								name="password"
								control={control}
								render={({ field: { onChange, value } }) =>
									<PasswordInput
										ref={passwordInputRef}
										onChangeText={onChange}
										value={value}
										placeholder="Nova senha"
										returnKeyType="send"
										returnKeyLabel="Entrar"
										onSubmitEditing={handleResetPassword}
										error={errors.password}
									/>}
							/>
						</View>

						<Button
							title="Resetar"
							isLoading={submitButtonLoading}
							loadingText="Validando informações..."
							onPress={handleResetPassword}
						/>
					</S.Form>

					<View>
						<S.Cancel onPress={goBack}>
							<S.CancelText>Cancelar</S.CancelText>
						</S.Cancel>
					</View>
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

export default ResetPassword;
