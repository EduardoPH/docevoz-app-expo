import React from "react";
import { View } from "react-native";

import FastImage from "react-native-fast-image";
import Reanimated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";

import { CardImage } from "../CategoryLoading/styles";

const Image = ({ isAlbum = false, animatedStyle = {}, uri, style = {} }) => {
	const zIndex = useSharedValue(3);
	const opacity = useSharedValue(1);

	const styleAnimated = useAnimatedStyle(() => ({
		zIndex: zIndex.value,
		opacity: opacity.value,

		position: "absolute",
	}));

	return (
		<View>
			<Reanimated.View style={styleAnimated}>
				<CardImage style={{ ...style, flexShrink: 0 }} />
			</Reanimated.View>

			<Reanimated.View style={[animatedStyle, { zIndex: 2 }]}>
				<FastImage
					style={{ ...style, flexShrink: 0, ...(isAlbum && { position: "absolute" }) }}
					onLoad={() => {
						zIndex.value = 1;
						opacity.value = 0;
					}}
					source={{
						uri,
						cacheControl: FastImage.cacheControl.immutable,
					}}
				/>
			</Reanimated.View>
		</View>
	);
};

export default Image;
