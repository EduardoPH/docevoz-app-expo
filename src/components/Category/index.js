import React from "react";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { Container, Title, FeedHorizontal, Card, CardName, CardNameWrapper } from "./styles";
import Requests from "../../classes/Requests";
import { useNavigation } from "../../hooks/useNavigation";
import { useSong } from "../../hooks/useSong";
import AlbumSpectro from "../AlbumSpectro";
import Image from "../Image";

const Category = ({ item }) => {
	const { navigate } = useNavigation();
	const { song } = useSong();

	const onScroll = e => {
		const {
			contentOffset: { x },
			layoutMeasurement,
			contentSize,
		} = e.nativeEvent;

		const percentage = contentSize.width * 0.6;
		const total = x + layoutMeasurement.width;

		const page = item.albums.page ?? 1;

		if (total > percentage && item.albums.totalPages >= page + 1) {
			Requests.getAlbumByPage(item.id, page + 1);
		}
	};

	return (
		<Container>
			<Title>{item.name}</Title>
			<FeedHorizontal onScroll={onScroll} scrollEventThrottle={16}>
				{item.albums.data.map((item, index) => {
					return (
						<Card
							key={item.id}
							style={{ ...(index == 0 && { marginLeft: 0 }) }}
							onPress={() => navigate("Album", { album: item })}
						>
							<Image
								uri={item.imageUrl}
								style={{
									width: wp("40%"),
									height: wp("60%"),
									borderRadius: 10,
								}}
							/>
							{Boolean(song.id) && song.album.id === item.id && <AlbumSpectro />}
							<CardNameWrapper blurRadius={10}>
								<CardName>{item.name}</CardName>
							</CardNameWrapper>
						</Card>
					);
				})}
			</FeedHorizontal>
		</Container>
	);
};

export default Category;
