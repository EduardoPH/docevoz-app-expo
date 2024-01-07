import React, { useEffect } from "react";
import { Platform, StatusBar, Keyboard } from "react-native";

import {
	Container,
	PlaceHolder,
	Row,
	FlagImage,
	Options,
	Option,
	Title,
	OptionText,
	OptionImage,
	WrapperOptions,
} from "./styles";
import Angola from "../../../assets/angola.png";
import Brasil from "../../../assets/brasil.webp";
import CaboVerde from "../../../assets/cabo-verde.png";
import Eua from "../../../assets/estados-unidos.png";
import Franca from "../../../assets/franca.webp";
import Moçambique from "../../../assets/moçambique.png";
import Portgual from "../../../assets/portugal.png";
import SaoTome from "../../../assets/sao-tome.webp";

const values = [
	// { label: '5555', flag: Portgual },
	{ label: "258", flag: Moçambique },
	{ label: "351", flag: Portgual },
	{ label: "244", flag: Angola },
	{ label: "55", flag: Brasil },
	{ label: "239", flag: SaoTome },
	{ label: "238", flag: CaboVerde },
	{ label: "33", flag: Franca },
	{ label: "1", flag: Eua },
];

export const DDDOptions = ({ withKey, ShowOptions = {}, setShowOptions, onChange }) => {
	useEffect(() => {
		if (Platform.OS === "android") {
			StatusBar.setBackgroundColor("rgba(0,0,0,.5)");

			return () => {
				StatusBar.setBackgroundColor("#36393e");
			};
		}
	}, []);

	return (
		<WrapperOptions onPress={() => setShowOptions(withKey ? { show: false, key: "" } : false)}>
			<Options>
				<Title>Selecione um DDD</Title>

				{values.map((item, index) => {
					return (
						<Option
							key={item.label}
							style={{ ...(index === values.length - 1 && { marginBottom: 0 }) }}
							onPress={() =>
								withKey
									? onChange(item.label, ShowOptions.key)
									: onChange(item.label)
							}
						>
							<OptionImage source={item.flag} />

							<OptionText>{item.label}</OptionText>
						</Option>
					);
				})}
			</Options>
		</WrapperOptions>
	);
};

const DDDSelect = ({
	isLight = false,
	disabled = false,
	withKey = false,
	cKey: key = "",
	value,
	wrapperStyle = {},
	placeholderStyle = {},
	setShowOptions,
}) => {
	function getSource() {
		const index = values.findIndex(item => item.label === value);

		return values[index].flag;
	}

	return (
		<Container
			style={{
				...(isLight && {
					backgroundColor: "#fff",
					color: "#000",
				}),
				...wrapperStyle,
			}}
			onPress={() => {
				if (!disabled) {
					setShowOptions(withKey ? { show: true, key } : true);

					Keyboard.dismiss();
				}
			}}
		>
			{!value ? (
				<PlaceHolder
					style={{
						...(isLight && {
							color: "#000",
						}),
						marginLeft: 0,
						...placeholderStyle,
					}}
				>
					DDD
				</PlaceHolder>
			) : (
				<Row>
					<FlagImage source={getSource()} />

					<PlaceHolder
						style={{
							...(isLight && {
								color: "#000",
							}),
							...placeholderStyle,
						}}
					>
						{value}
					</PlaceHolder>
				</Row>
			)}
		</Container>
	);
};

export default DDDSelect;
