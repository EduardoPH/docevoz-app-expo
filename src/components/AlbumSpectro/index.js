import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

import {
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const sleep = (timeout = 500) => new Promise(resolve => setTimeout(resolve, timeout));

const AlbumSpectro = () => {
	const heightOne = useRef(new Animated.Value(wp("2%")));
	const heightTwo = useRef(new Animated.Value(wp("2%")));
	const heightThree = useRef(new Animated.Value(wp("2%")));
	const heightFour = useRef(new Animated.Value(wp("2%")));

	function recursive(item) {
		Animated.timing(item, {
			toValue: Math.random() * wp("5%"),
			duration: 1000,
			useNativeDriver: false,
		}).start(async ({ finished }) => {
			if (finished) {
				await sleep();

				recursive(item);
			}
		});
	}

	useEffect(() => {
		recursive(heightOne.current);
		recursive(heightTwo.current);
		recursive(heightThree.current);
		recursive(heightFour.current);

		return () => {
			heightOne.current.stopAnimation();
			heightTwo.current.stopAnimation();
			heightThree.current.stopAnimation();
			heightFour.current.stopAnimation();
		};
	}, []);

	return (
		<View
			style={{
				position: "absolute",
				left: wp("3%"),
				bottom: wp("3%"),
				height: wp("6%"),
				zIndex: 3,
				flexDirection: "row",
				alignItems: "flex-end",
			}}
		>
			<Animated.View
				style={{
					width: wp("1.5%"),
					height: heightOne.current,

					backgroundColor: "#9d0208",
				}}
			/>

			<Animated.View
				style={{
					width: wp("1.5%"),
					height: heightTwo.current,

					backgroundColor: "#9d0208",

					marginLeft: wp("1%"),
				}}
			/>

			<Animated.View
				style={{
					width: wp("1.5%"),
					height: heightThree.current,

					backgroundColor: "#9d0208",

					marginLeft: wp("1%"),
				}}
			/>

			<Animated.View
				style={{
					width: wp("1.5%"),
					height: heightFour.current,

					backgroundColor: "#9d0208",

					marginLeft: wp("1%"),
				}}
			/>
		</View>
	);
};

export default AlbumSpectro;
