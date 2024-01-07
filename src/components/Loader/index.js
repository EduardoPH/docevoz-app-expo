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
import { Svg, Circle } from "react-native-svg";


const LoadingSpinner = ({
	size = wp("10%"),
	color = "blue",
	strokeWidth = wp(".7%"),
	radius = (size - strokeWidth) / 2,
	circleSize = wp("10%"),
	animated = false,
}) => {
	const circumference = radius * Math.PI * 2;

	const rotate = useSharedValue(0);
	const style = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotate.value}deg` }] }));

	useEffect(() => {
		if (animated) {
			rotate.value = withRepeat(
				withTiming(360, { duration: 2000, easing: Easing.linear }),
				Infinity
			);
		}

		return () => {
			cancelAnimation(rotate);
		};
	}, [animated]);

	return (
		<Reanimated.View style={style}>
			<Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
				<Circle
					fill="none"
					stroke={color}
					cx={size / 2}
					cy={size / 2}
					r={radius}
					strokeWidth={strokeWidth}
					transform={`rotate(-90 ${size / 2} ${size / 2})`}
					strokeLinecap="round"
					strokeDasharray={[circleSize, circumference]}
				/>
			</Svg>
		</Reanimated.View>
	);
};

export default LoadingSpinner;
