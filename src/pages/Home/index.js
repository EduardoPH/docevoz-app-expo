import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

import * as Notifications from "expo-notifications";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { useContent } from "../../hooks/useContent";
import { useNavigation } from "../../hooks/useNavigation";
import { useUser } from "../../hooks/useUser";
import { LivePodcast } from "./components/LivePodcast";
import { SpecialMessages } from "./components/SpecialMessages";
import { AnimatedBlackBlur, BlackBlur, Column, Feed, Header, HistoryBadge, HistoryCircle, HistoryIcon, Microphone, Row, Title, Username } from "./styles";
import fitness from "../../assets/images/fitness.png";
import orange from "../../assets/images/orange.png";
import Requests from "../../classes/Requests";
import { Avatar } from "../../components/Avatar";
import Category from "../../components/Category";
import CategoryLoading from "../../components/CategoryLoading";
import { dayGreeting } from "../../utils/greeting";
import { handleChangeStatusBarColor } from "../../utils/statusbarColor";

const cards = [
	{ description: "Nao consigo parar de pensar em ti", image: fitness },
	{ description: "Nao consigo parar de pensar em ti.", image: orange },
];

const Home = () => {
	const { Categories } = useContent();
	const { navigate } = useNavigation();
	const { User } = useUser();
	const [showBlackBur, setShowBlackBlur] = useState(true)

	const username = User.name.split(" ")[0];

	const onScroll = (e) => {
		const {
			contentOffset: { y },
			layoutMeasurement,
			contentSize,
		} = e.nativeEvent;

		handleChangeStatusBarColor(e);

		const percentage = contentSize.height * 0.6;
		const total = y + layoutMeasurement.height;
		
		if(y >= contentSize.height - layoutMeasurement.height) {
			console.log('chegou no final')
			setShowBlackBlur(false)
		} else {
			setShowBlackBlur(true)
		}

		if (total > percentage && Categories.totalPages >= Categories.page + 1) {
			Requests.getCategories(Categories.page + 1);
		}
	};

	async function getToken() {
		let { status } = Notifications.getPermissionsAsync();
		if (status != "granted") {
			({ status } = await Notifications.requestPermissionsAsync());
		}

		if (status == "granted") {
			const token = await Notifications.getDevicePushTokenAsync();
			Requests.updateToken(token.data);
		}
	}

	useEffect(() => {
		Requests.getNotifications();
		getToken();
	}, []);

	return (
		<>
			<Feed onScroll={onScroll} scrollEventThrottle={16}>
				<Header>
					<Column>
						<Username>Hola, {username}</Username>
						<Title>{dayGreeting()}</Title>
					</Column>

					<Row>
						<TouchableOpacity
							style={{ marginRight: wp("4%") }}
							activeOpacity={1}
							onPress={() => navigate("Recording")}
						>
							<Microphone />
						</TouchableOpacity>

						<HistoryCircle
							activeOpacity={1}
							onPress={() => navigate("Appointments")}
						>
							<HistoryIcon />
							<HistoryBadge />
						</HistoryCircle>

						<Avatar
							onPress={() => navigate("Profile")}
							size={35}
							source={{ uri: "https://i.pravatar.cc/" }}
						/>
					</Row>
				</Header>

				<LivePodcast />

				<SpecialMessages cards={cards} />

				{Categories.data.length >= 1 ? (
					<>
						{Categories.data.map((item) => {
							return <Category item={item} key={item.id} />;
						})}
					</>
				) : (
					<>
						<CategoryLoading />
						<CategoryLoading />
					</>
				)}
			</Feed>
			{showBlackBur&&<BlackBlur
				pointerEvents="none"
				colors={["rgba(0, 0, 0, 0.0)", "#000000"]}
				locations={[0, 1]}
				start={{ x: 0, y: 1 }}
				end={{ x: 0, y: 0 }}
				useAngle
				angle={180}
				angleCenter={{ x: 0.5, y: 0.5 }}
			/>}
		</>
	);
};

export default Home;
