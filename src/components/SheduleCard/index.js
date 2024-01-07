import React from "react";
import { View } from "react-native";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import {
	Container,
	Background,
	Detail,
	DetailRow,
	Calendar,
	Date,
	Hour,
	Button,
	Config,
} from "./styles";
import Songs from "../../classes/Songs";
import { useSong } from "../../hooks/useSong";
import AnimatedText from "../AnimatedText";
import Image from "../Image";


const SheduleCard = ({ item, openModal }) => {
	const { song } = useSong();

	return (
		<Container
			onPress={() => {
				Songs.playSong(
					item.song.customId ? item.song.customId : item.song.id,
					0,
					{
						...item.song.album,
						songs: [
							{
								...item.song,
								...(item.song.customId && { id: item.song.customId }),
								sheduleId: item.id,
							},
						],
					},
					true
				);
			}}
		>
			<Background style={{ backgroundColor: item.alreadySent ? "#0DB1AD" : "#E5E05F" }} />

			{item.song.album && (
				<Image
					uri={item.song.album.imageUrl}
					style={{
						width: wp("12%"),
						height: wp("12%"),

						borderRadius: wp("6%"),
					}}
				/>
			)}

			<Detail>
				<View style={{ width: wp("58%"), overflow: "hidden" }}>
					{Boolean(song.id) &&
					(song.id == item.song.id ||
						(item.song.customId && song.id === item.song.customId)) &&
					song.isShedule &&
					song.sheduleId &&
					song.sheduleId == item.id ? (
						<AnimatedText
							animated
							width={wp("58%")}
							style={{
								color: "red",

								fontSize: wp("4%"),
								fontWeight: "bold",
								marginBottom: wp("1%"),
							}}
							text={item.song.name ? item.song.name : "Telemensagem customizada!"}
						/>
					) : (
						<AnimatedText
							width={wp("58%")}
							style={{
								color: "#fff",

								fontSize: wp("4%"),
								fontWeight: "bold",
								marginBottom: wp("1%"),
							}}
							text={item.song.name ? item.song.name : "Telemensagem customizada!"}
						/>
					)}
				</View>

				<DetailRow>
					<Calendar />

					<Date>{item.date}</Date>

					<Hour>{item.hour}</Hour>
				</DetailRow>
			</Detail>

			<Button onPress={() => openModal?.(item)}>
				<Config />
			</Button>
		</Container>
	);
};

export default SheduleCard;
