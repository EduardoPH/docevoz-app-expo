import React from "react";

import { Card, CardImage, CardName, Container, ImageUser, TextName } from "./styles";


const CardPresent = ({ item }) => {

	return (
		<Container>

			{item.load ?
				<Card style={{ ...(item == 0 && { marginLeft: 0 }) }}>
					<CardImage />
					<CardName />
				</Card>
				:
				<>
					<ImageUser
						source={{ uri: item.url != "" ? item.url : null }}
					/>

					{item.title && <TextName>
						{item.title}
					</TextName>}
				</>
			}


		</Container>
	);
};

export default CardPresent;
