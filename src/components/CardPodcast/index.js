import React from "react";
import { Image } from "react-native";

import { BtnPlay, Card, CardImage, CardName, Container, ImageUser, TextDesc, TextName } from "./styles";

const CardPodcast = ({ item, onPress }) => {

	return (
		<Container onPress={onPress}>

			{item.load ?

				<Card style={{ ...(item == 0 && { marginLeft: 0 }) }}>
					<CardImage />
					<CardName />
				</Card>
				:
				<>

					<ImageUser
						source={{ uri: item.thumb != "" ? item.thumb : null }}
					/>

					<BtnPlay style={{ backgroundColor: item.background_color }}>
						<Image source={require("../../assets/images/play.png")} />
					</BtnPlay>

					{item.title && <TextName>
						{item.title}
					</TextName>}

					{item.presenter && <TextDesc>
						por {item.presenter}
					</TextDesc>}

				</>
			}

		</Container>
	);
};

export default CardPodcast;
