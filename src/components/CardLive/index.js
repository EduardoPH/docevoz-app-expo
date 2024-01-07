import React from "react";
import { Image } from "react-native";

import { BtnPlay, Card, CardImage, Container, ImageUser, TextName, TextPreset, ViewInfo } from "./styles";

const CardLive = ({ item, onPress }) => {



	return (
		<Container onPress={onPress}>

			{typeof item.load != "undefined"
				?
				<Card>
					<CardImage />
				</Card>
				:
				<>
					<ImageUser
						source={{ uri: item.thumb != "" ? item.thumb : null }}
					/>

					<ViewInfo>
						{item.title && <TextName>
							{item.title}
						</TextName>}

						{item.description && <TextName>
							{item.description}
						</TextName>}

						{item.presenter && <TextPreset>
							{item.presenter}
						</TextPreset>}

					</ViewInfo>

					<BtnPlay style={{ backgroundColor: item.background_color }}>
						<Image source={require("../../assets/images/play.png")} />
					</BtnPlay>
				</>
			}


		</Container>
	);
};

export default CardLive;
