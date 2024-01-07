import React, { useEffect } from "react";

import Reanimated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withTiming,
	Easing,
	cancelAnimation,
} from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { Container, Warning } from "./styles";
import Requests from "../../classes/Requests";
import Loader from "../../components/Loader";


const Authentication = () => {
	const rotate = useSharedValue(0);
	const style = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotate.value}deg` }],
	}));

	useEffect(() => {
		Requests.getUser();

		rotate.value = withRepeat(
			withTiming(360, {
				duration: 2000,
				easing: Easing.linear,
			}),
			500
		);

		return () => {
			cancelAnimation(rotate);
		};
	}, []);

	return (
		<Container>
			<Reanimated.View style={style}>
				<Loader
					color="red"
					size={wp("20%")}
					circleSize={wp("18%")}
					strokeWidth={wp(".8%")}
				/>
			</Reanimated.View>
			<Warning>Aguarde! Autenticando...</Warning>
		</Container>
	);
};

export default Authentication;
