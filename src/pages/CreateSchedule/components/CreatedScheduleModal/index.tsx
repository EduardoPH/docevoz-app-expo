import React, { RefObject, forwardRef } from "react";

import { Modalize, ModalizeProps } from "react-native-modalize";
import { IHandles } from "react-native-modalize/lib/options";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { useReducerSchedule } from "../../../../store/hooks/schedule";
import { useNavigation } from "../../../../hooks/useNavigation";
import { CreatedSchedule } from "./CreatedSchedule";
import { Header } from "./styles";
import { CancelButton } from "../../../../components/CancelButton";
import { isIOS } from "../../../../utils/os";
import { darken } from "polished";

interface ICreatedScheduleModal extends ModalizeProps { }

function Modal({ ...props }: ICreatedScheduleModal, ref: RefObject<IHandles>) {
  const { navigate } = useNavigation();
  const [, { clearSchedule }] = useReducerSchedule();

  const closeModal = () => {
    ref.current?.close();
  };

  const handleCancel = () => {
    closeModal();
    clearSchedule();
    navigate("Home");
  };

  return (
    <Modalize
      ref={ref}
      modalHeight={hp(isIOS ? "95%" : "100%") - getStatusBarHeight()}
      velocity={10}
      withHandle={false}
      closeOnOverlayTap={false}
      modalStyle={{
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
      }}
      panGestureEnabled={false}
      HeaderComponent={() =>
        <Header>
          <CancelButton style={{
            position: "relative",
            marginLeft: 0
          }}
            onPress={handleCancel}
          />
        </Header>
      }
      {...props}
    >
      <CreatedSchedule />
    </Modalize>
  );
}

export const CreatedScheduleModal = forwardRef<RefObject<IHandles>, ICreatedScheduleModal>(Modal);
