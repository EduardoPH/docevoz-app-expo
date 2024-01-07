import React from "react";

import { Container, ImageUser, TextName } from "./styles";

const CardRecent = ({ item }) => {



	return (
		<Container>

			<ImageUser
				source={{ uri: item.image != "" ? item.image : null }}
			/>

			{item.title && <TextName>
				{item.title}
			</TextName>}

		</Container>
	);
};

export default CardRecent;
