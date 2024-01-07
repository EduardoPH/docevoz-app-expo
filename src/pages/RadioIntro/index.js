import React, { useEffect } from "react";
import { Dimensions, Image, View } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

import { Container, Content, ImageBackground, ImageWoman, TextDesc, TextTitle } from "./styles";
import { useNavigation } from "../../hooks/useNavigation";

const { width, height } = Dimensions.get("screen");

const RadioIntro = () => {

	const { navigate } = useNavigation();


	useEffect(() => {

	}, []);

	const handleRadio = () => {
		navigate("Radio");
	};

	return (
		<Container>

			<ImageBackground
				source={require("../../assets/images/fundo_radio.png")}
				resizeMode={"stretch"}
			/>

			<ImageWoman
				source={require("../../assets/images/woman.png")}
				resizeMode={"stretch"}
			/>

			<Content>

				<TextTitle style={{ marginTop: 100, marginLeft: width / 10, }}>
					Do Bom e
				</TextTitle>

				<TextTitle style={{ marginLeft: width / 10 + 30 }} >
					do Melhor
				</TextTitle>

				<TextDesc>
					Podcasts especialmente para si.
				</TextDesc>

				<View
					style={{
						position: "absolute", width: 100, left: width / 2 - 100, bottom: 100
					}}
				>
					<TouchableOpacity
						style={{ justifyContent: "center", alignItems: "center" }}
						activeOpacity={1}
						onPress={() => handleRadio()}
					>
						<Image
							source={require("../../assets/images/p1.png")}
						/>
						<Image
							source={require("../../assets/images/p2.png")}
							style={{ transform: [{ scale: 0.98 }], position: "absolute" }}
						/>
						<Image
							source={require("../../assets/images/p3.png")}
							style={{ position: "absolute" }}
						/>
						<Image
							source={require("../../assets/images/p4.png")}
							style={{ position: "absolute" }}
						/>
					</TouchableOpacity>

				</View>

			</Content>

		</Container>
	);
};

export default RadioIntro;
