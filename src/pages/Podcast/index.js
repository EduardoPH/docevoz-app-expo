import React, { useEffect, useState } from "react";
import { Dimensions, Image } from "react-native";

import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import { AboutPodcast, BtnBack, BtnSobre, Container, ImageAbout, ImagePodcast, PodcastList, PodcastThumb, PresenterPicture, RowPodcast, TextBy, TextSobre, TitleD, TitleP, TitlePodcast, ViewOpacity } from "./styles";
import findEpisodesByProgram from "../../api/service/Program/Find";
import Songs from "../../classes/Songs";
import { useNavigation } from "../../hooks/useNavigation";

const { width, height } = Dimensions.get("screen");

const Poscast = () => {

	const { goBack, navigate } = useNavigation();
	const { params = { data } } = useRoute();

	const [episodes, setEpisodes] = useState([]);

	const [album, setAlbum] = useState({});

	useEffect(() => {
		getEpisodes();
	}, []);

	const getEpisodes = async () => {

		const response = await findEpisodesByProgram(params.data.id);
		if (response.status == 200) {
			setEpisodes(response.data);

			console.log(params);

			var songAux = [];
			response.data.map(item => {

				var arrTime = item.duration.split(":");
				var t = 0;
				t += arrTime[0] * 60;
				t + - arrTime[1];

				songAux.push(
					{
						albumId: item.program_id,
						audioUrl: item.url,
						duration: t,
						durationFormated: item.duration,
						id: item.id,
						isMale: true,
						isShow: true,
						label: item.title,
						labelComplete: item.description,
						name: item.title,
						withoutBackgroundDuration: item.duration,
						withoutBackgroundUrl: item.url
					}
				);

			});

			setAlbum({
				categoryId: params.data.radio_id,
				id: params.data.id,
				imageUrl: params.data.thumb,
				isShow: true,
				loaded: false,
				name: params.data.title,
				smallUrl: params.data.thumb,
				songs: songAux
			});

		}
	};

	handleSong = (item, i) => {
		Songs.playSong(item.id, i, album);
	};

	return (
		<Container>

			<BtnBack onPress={() => goBack()}>
				<Image source={require("../../assets/images/icon_back.png")} />
			</BtnBack>

			<ScrollView>

				<PodcastThumb>
					<ImagePodcast source={{ uri: params.data.thumb }} />
				</PodcastThumb>

				<AboutPodcast>

					<ViewOpacity />
					<ImageAbout source={require("../../assets/images/about.png")} />

					<BtnSobre>
						<TextSobre>Sobre</TextSobre>
					</BtnSobre>

					<TitlePodcast>
						{params.data.title}
					</TitlePodcast>

					<PresenterPicture
						source={{ uri: params.data.presenter_picture }}
					/>

					<TextBy>
						Por {params.data.presenter}
					</TextBy>

				</AboutPodcast>

				<TitlePodcast style={{ marginLeft: 20 }}>
					Podcasts
				</TitlePodcast>

				<PodcastList>

					{album.songs?.map((item, i) => {

						return (
							<RowPodcast onPress={() => handleSong(item, i)}>
								<TitleP>{item.name}</TitleP>
								<TitleD>{item.labelComplete}</TitleD>
							</RowPodcast>
						);

					})}

					<RowPodcast>
						<TitleP></TitleP>
						<TitleD></TitleD>
					</RowPodcast>

				</PodcastList>

			</ScrollView>

		</Container>
	);
};

export default Poscast;
