import React from "react";
import { Linking } from "react-native";

import Clipboard from "@react-native-clipboard/clipboard";
import { useRoute } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getStatusBarHeight } from "react-native-status-bar-height";

import {
	Container,
	Feed,
	Background,
	DoceVozLogo,
	Title,
	RowItem,
	RowText,
	Line,
	CopyButton,
	Buttons,
	Button,
	ButtonLabel,
	Header,
	Back,
	BackIcon,
	HeaderTitle,
} from "./styles";
import Logo from "../../../assets/logo.png";
import { useNavigation } from "../../hooks/useNavigation";

const Row = ({ title, value }) => {
	return (
		<RowItem>
			<RowText>{title}</RowText>

			<RowText bold>{value}</RowText>
		</RowItem>
	);
};

const Reference = () => {
	const { goBack } = useNavigation();
	const { params = {} } = useRoute();

	return (
		<Container>
			<Feed bounces={false}>
				<Header style={{ top: getStatusBarHeight(), position: "absolute", zIndex: 2 }}>
					<Back onPress={goBack}>
						<BackIcon black />
					</Back>

					<HeaderTitle style={{ color: "#000", fontSize: wp("4.5%") }}>
						Pagamento por referência
					</HeaderTitle>
				</Header>

				<Background>
					<DoceVozLogo source={Logo} />
				</Background>

				<Title>Informações para depósito</Title>

				<Row title="Entidade" value="00970" />

				<Row title="Referência" value={String(params.ref).padStart(9, "0")} />

				<Row title="Valor" value="2.500 Kz" />

				<Line />

				<CopyButton
					onPress={() => Clipboard.setString(String(params.ref).padStart(9, "0"))}
				>
					<Title style={{ marginTop: 0, marginLeft: 0, color: "#3c3c3c" }}>Copiar</Title>
				</CopyButton>

				<Title style={{ marginTop: wp("5%"), marginBottom: wp("3%") }}>
					Informações para depósito
				</Title>

				<RowText style={{ width: wp("90%"), marginLeft: wp("5%"), fontSize: wp("4.25%") }}>
					Apôs realizar o seu pagamento por referência, o seu pedido estará disponível em
					seus agendamentos no App. Caso houver falha ao fazer o pagamento o pagamento por
					referência, tente novamente depois de 15 minutos. Para o Brasil, Moçambique,
					Portugal, Cabo Verde, São Tomé e Príncipe, França e Estados Unidos, clique em
					WhatsApp para aquisição do CARTÃO PRESENTE.
				</RowText>

				<Buttons>
					<Button onPress={goBack}>
						<ButtonLabel>Continuar</ButtonLabel>
					</Button>

					<Button
						outline
						onPress={() =>
							Linking.openURL(
								"https://wa.me/244923010001?text=Olá gostaria de saber como compro o gift card da Doce Voz."
							)
						}
					>
						<ButtonLabel style={{ color: "#1bd741" }}>Whatsapp</ButtonLabel>
					</Button>
				</Buttons>
			</Feed>
		</Container>
	);
};

export default Reference;
