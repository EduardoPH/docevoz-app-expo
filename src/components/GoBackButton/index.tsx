import React from "react";
import { PressableProps, View } from "react-native";

import { ArrowLeft, Button, ChatIcon } from "./styles";
import { useNavigation } from "../../hooks/useNavigation";
import { Ionicons } from "@expo/vector-icons";

interface IGoBackButtonProps extends PressableProps {
  onPress?: () => void;
  light?: boolean;
}

export function GoBackButton({
  onPress = () => {},
  light = true,
  ...rest
}: IGoBackButtonProps) {
  const { goBack, navigate } = useNavigation();

  const handlePress = () => {
    if (onPress) onPress();
    goBack();
  };

  const openChat = () => {
    navigate("Chat", { chatId: '11' });
  };


  return (
<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

      <View>
        <Button onPress={handlePress} {...rest}>
          <ArrowLeft color={light ? "#fff" : "#151414DE"} />
        </Button>
      </View>

      <View>
        <Button onPress={openChat} {...rest}>
          <ChatIcon color={light ? "#fff" : "#151414DE"} />
        </Button>
      </View>

    </View>
  );
}
