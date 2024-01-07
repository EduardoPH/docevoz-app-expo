import { StatusBar, NativeSyntheticEvent, NativeScrollEvent } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { isIOS } from "./os";
import { transparentize } from "polished";
import { theme } from "../styles/theme";

export async function handleChangeStatusBarColor(event: NativeSyntheticEvent<NativeScrollEvent>, color?: string) {
  const {
    contentOffset: { y },
  } = event.nativeEvent;

  const statusBarBgColor = color || transparentize(0.5,theme.colors.black[700]);

  if (isIOS) {
    if (y >= 25) {
      await AsyncStorage.setItem("statusbar-color", statusBarBgColor);
    } else {
      await AsyncStorage.setItem("statusbar-color", transparentize(0.5,theme.colors.black[700]));
    }
  } else {
    if (y >= 25) {
      StatusBar.setBackgroundColor(statusBarBgColor);
    } else {
      StatusBar.setBackgroundColor("rgba(0, 0, 0, 0.0)");
    }
  }
}
