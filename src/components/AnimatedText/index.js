import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// import { Container } from './styles';

const sleep = t => new Promise(r => setTimeout(r, t));

const AnimatedText = ({ animated = false, width = 0, style = {}, text = "", ...rest }) => {
	const composite = useRef();
	const textWidth = useRef(0);
	const isFirst = useRef(true);
	const titlePosition = useRef(new Animated.Value(0));

	function startAnimation(size) {
		if (size > width) {
			composite.current = Animated.loop(
				Animated.sequence([
					Animated.delay(3000),
					Animated.timing(titlePosition.current, {
						duration: 8000,
						toValue: -(size - width),
						useNativeDriver: true,
					}),
					Animated.delay(3000),
					Animated.timing(titlePosition.current, {
						duration: 8000,
						toValue: 0,
						useNativeDriver: true,
					}),
				])
			);

			composite.current.start();
		}
	}

	function stopAnimation() {
		if (typeof composite.current != "undefined") {
			composite.current.stop();
		}

		titlePosition.current.setValue(0);
	}

	useEffect(() => {
		stopAnimation();
	}, [text]);

	return (
		<Animated.Text
			{...rest}
			onTextLayout={({ nativeEvent: { lines } }) => {
				const width = lines.reduce((acc, item) => acc + item.width, 0);
				textWidth.current = width;

				if (animated) {
					startAnimation(width);
				}
			}}
			style={{
				...style,
				width: wp("13000%"),
				transform: [
					{
						translateX: titlePosition.current,
					},
				],
			}}
		>
			{text}
		</Animated.Text>
	);
};

export default AnimatedText;
