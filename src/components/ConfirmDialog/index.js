import React, { forwardRef } from "react";

import { Modalize } from "react-native-modalize";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";


import * as S from "./styles";
import CustomButton from "../../components/CustomButton";


function ConfirmDialog({
  modalText,
  confirmLabel,
  cancelLabel,
  confirmAction,
  buttonStyle
}, ref) {
  return (
    <Modalize ref={ref} modalHeight={wp("42%")} snapPoint={wp("42%")}>
      <S.Modal>
        <S.ModalText>{modalText ?? "Você tem certeza?"}</S.ModalText>

        <S.ButtonGroup>
          <CustomButton
            component={S.ModalButton}
            onPress={confirmAction}
            loaderProps={{
              size: wp("6%"),
              circleSize: wp("5%"),
              strokeWidth: wp("0.64%"),
              color: "#fff",
            }}
            style={buttonStyle}
          >
            <S.ModalButtonText>
              {confirmLabel ?? "Confirmar"}
            </S.ModalButtonText>
          </CustomButton>

          <S.ModalButton
            style={{ backgroundColor: "rgba(255, 255, 255, .1)" }}
            onPress={() => ref.current.close()}
          >
            <S.ModalButtonText>
              {cancelLabel ?? "Cancelar"}
            </S.ModalButtonText>
          </S.ModalButton>
        </S.ButtonGroup>
      </S.Modal>
    </Modalize>
  );
}

export default forwardRef(ConfirmDialog);


