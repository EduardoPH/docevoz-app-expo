import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";

import { Container, Content, Lives, RowPodcast, TextLive, TextTitle } from "./styles";
import findAllPerformers from "../../api/service/Performers/FindAll";
import findAllPrograms from "../../api/service/Program/FindAll";
import findAllRadios from "../../api/service/Radio/FindAll";
import Songs from "../../classes/Songs";
import CardLive from "../../components/CardLive";
import CardPodcast from "../../components/CardPodcast";
import CardPresent from "../../components/CardPresent";
import CardRecent from "../../components/CardRecent";
import { useNavigation } from "../../hooks/useNavigation";


const { width, height } = Dimensions.get("screen");

const Radio = () => {

	const { navigate } = useNavigation();

	const [performers, setPerformers] = useState([
		{ load: true }, { load: true }, { load: true }
	]);

	const [programs, setPrograms] = useState([
		{ load: true }, { load: true }, { load: true }
	]);

	const [radios, setRadios] = useState([
		{ load: true }, { load: true }, { load: true }
	]);

	useEffect(() => {

		findPresenters();
		findPrograms();
		findRadios();

	}, []);

	const findPresenters = async () => {

		const response = await findAllPerformers();
		if (response.status == 200) {
			setPerformers(response.data);
		}

	};

	const findPrograms = async () => {

		const response = await findAllPrograms();
		if (response.status == 200) {
			setPrograms(response.data);
		}

	};

	const findRadios = async () => {

		const response = await findAllRadios();
		if (response.status == 200) {
			setRadios(response.data);
		}

	};

	const recents = [
		{ title: "Relacionamento", image: "https://s3-alpha-sig.figma.com/img/1def/7027/ae61667dd3094fae2169df7ae146fbec?Expires=1678665600&Signature=Zp7hBNQerHGneBivX6jddR7NXd8mQbrlDHVU2xI2~LF1577PTtQfJWlXZlfP8r29NX8hv1yA-owVtnEHCbTz-oTGtgXHjRBfOu5Pt9lt4SgI3EVZLPo6do1RTqrB1QimkAzDI8I1UPQ9LwuZ~YUjhZ7m8IX0gaytVeTigb1RFBCgsJhYbshJjkB5jbAnPQDlgNqmPcYh~SnzJJH4cCN-KSZjJ9nrb~~~8n6li~SNoxPbIFG15j16k9B15vRTnCbwdsw~Jm-6ef30U1XoUH3gGi5HiT0-wex25PK0IJcn0XCzI~Al-OVC5x~rm5D9x6Wnr7B1HzsaolnCAlvfUjmfHg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" },
		{ title: "Datas", image: "https://s3-alpha-sig.figma.com/img/5352/f525/b964bc67305a84b8a0fa7f318eb0efc9?Expires=1678665600&Signature=asRymORbvdsCcjqULqCymFUqek~KadfN9bhIlIDD7b5swj0G-4bz5rtczQKguxLuHWud0EM32NudtAOfBrO-bWFnH66pPSgkwAsyVsszxJGtepFbY~Yo47X1sLNMfsaCH64TwSFE8UqC5dfp549hbk2FtKQfk6vlfEMFR5K6roZQV7UDQKm8xMSB9wkUVYxqIUsNd1GrQ0uMoNyPsdSGcwN~5qte3O3xxiiAjKcG-4NtdTQBnocEkFV3sltrPdDQxu4B1Pa6VAq2jhAXFq13r6xMWgbwnB70d85Cc68VuteSlahpq6ADhjhMQCnJPct9n~4E1D7yAa5gaIBwO3Nveg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" },
		{ title: "Amor", image: "https://s3-alpha-sig.figma.com/img/f544/a5a8/528d5aef55d4c85a596c6ddd063d6fd6?Expires=1678665600&Signature=DMhptsK9x~TNB30jutI9p-Z9gLOR1enxfpu99z72I870jeTXdmOFY0SnOgG9zbbzvJWFYbskHdUv07iWc-GxcVLtlANRRkp9SwXPANAVJ9BtbelF5W0C8SW31Ejb0bmJthS5SBUq22UfM1PfxfnMFliUTt7MZBL59-5oIaigUgmQAxvlvgh5CEchXv9GkBSkyjgaFs8Canc0WEiwl4cGjOSwo~n2n9Au-bxsUdV-r3yFwOqc~K6udsUjnLaVsMCPp2BSuhMTJJVK~GHNZncvOszYQkel7AtqLMyUHhvMijQmW0fQemyaYdN2n77kbJOyd0fs8qVQvqPVCNQaUGdgIQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" }
	];

	const handleLive = (item) => {

		var ab = {
			categoryId: "1",
			id: "12",
			imageUrl: item.thumb,
			isShow: true,
			loaded: false,
			name: item.title,
			smallUrl: item.thumb,
			songs: [
				{
					albumId: "1",
					audioUrl: item.url,
					duration: 0,
					durationFormated: 0,
					id: item.id,
					isMale: true,
					isShow: true,
					label: item.title,
					labelComplete: item.description,
					name: item.title,
					withoutBackgroundDuration: 0,
					withoutBackgroundUrl: item.url
				}
			]
		};

		Songs.playSong(item.id, 0, ab);
		navigate("Streaming", { data: item });


	};

	return (
		<Container>

			<Content>

				<ScrollView>

					<RowPodcast style={{ marginTop: 60 }}>

						<TextTitle>
							Apresentadores
						</TextTitle>

						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{performers.map((item, i) => {
								return (
									<CardPresent key={`present_${i}`} item={item} />
								);
							})}

						</ScrollView>

					</RowPodcast>

					<RowPodcast>

						<TextTitle>
							Podcasts
						</TextTitle>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{programs.map((item, i) => {
								return (
									<CardPodcast
										key={`podcast_${i}`}
										item={item}
										onPress={() => navigate("Podcast", { data: item })}
									/>
								);
							})}
						</ScrollView>

					</RowPodcast>

					<RowPodcast>

						<TextLive>
							Ouvidos recentemente
						</TextLive>

						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{recents.map((item, i) => {
								return (
									<CardRecent
										key={`recent_${i}`}
										item={item}
									/>
								);
							})}
						</ScrollView>

					</RowPodcast>

					<Lives>

						<TextLive>
							Ao vivo
						</TextLive>

						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{radios.map((item, i) => {
								return (
									<CardLive
										key={`live_${i}`}
										item={item}
										onPress={() => handleLive(item)}
									// onPress={() => navigate('Streaming', { data: item })}
									/>
								);
							})}

						</ScrollView>

					</Lives>

					<View style={{ height: 100 }} />
				</ScrollView>

			</Content>

		</Container>
	);
};

export default Radio;
