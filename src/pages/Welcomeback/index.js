import { useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

import { useNavigation } from "../../hooks/useNavigation";



const Welcomeback = () => {
	const { reset, navigate } = useNavigation();

	useEffect(() => {
		(async () => {
			// navigate('Reference', { ref: '123456789' });

			const token = await AsyncStorage.getItem("token");

			reset(token ? "Authentication" : "Login");

			setTimeout(SplashScreen.hideAsync, 100);
		})();
	}, []);

	return null;
};

export default Welcomeback;
