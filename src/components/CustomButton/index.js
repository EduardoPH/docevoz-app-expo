import React, { useRef } from "react";

import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
	withRepeat,
	cancelAnimation,
} from "react-native-reanimated";

import Loader from "../Loader";

const CustomButton = ({
	component: Component,
	children,
	onPress,
	loaderProps = {},
	style = {},
}) => {
	const alreadyPressed = useRef(false);

	const rotate = useSharedValue(0);
	const zIndex = useSharedValue(0);
	const childrenIndex = useSharedValue(3);

	function startAnimation() {
		zIndex.value = 3;
		childrenIndex.value = 0;

		rotate.value = withRepeat(
			withTiming(360, {
				duration: 2000,
				easing: Easing.linear,
			}),
			100
		);
	}

	function stopAnimation() {
		cancelAnimation(rotate);

		zIndex.value = 0;
		childrenIndex.value = 3;
		rotate.value = 0;
	}

	async function handlePress() {
		if (!alreadyPressed.current) {
			startAnimation();
			alreadyPressed.current = true;

			await onPress();

			stopAnimation();
			alreadyPressed.current = false;
		}
	}

	const childrenStyle = useAnimatedStyle(() => ({
		// zIndex: zIndex.value,
		zIndex: childrenIndex.value,
	}));
	const loaderStyle = useAnimatedStyle(() => {
		return {
			position: "absolute",
			transform: [{ rotate: `${rotate.value}deg` }],

			zIndex: zIndex.value,
			// zIndex: childrenIndex.value,
		};
	});

	return (
		<Component style={style} onPress={handlePress}>
			<Component
				style={{ ...style, position: "absolute", zIndex: 2 }}
				onPress={handlePress}
			/>

			<Animated.View style={childrenStyle}>{children}</Animated.View>

			<Animated.View style={loaderStyle}>
				<Loader {...loaderProps} />
			</Animated.View>
		</Component>
	);
};

export default CustomButton;
