import React from "react";

import { Container, Title, FeedHorizontal, Card, CardImage } from "./styles";

const CategoryLoading = ({ isFirst }) => {
	return (
		<Container>
			<Title />
			<FeedHorizontal>
				{[0, 1, 2, 3, 4].map(item => (
					<Card key={item} style={{ ...(item == 0 && { marginLeft: 0 }) }}>
						<CardImage />
					</Card>
				))}
			</FeedHorizontal>
		</Container>
	);
};

export default CategoryLoading;
