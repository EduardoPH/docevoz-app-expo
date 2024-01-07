import React, { useEffect } from "react";
import { Linking } from "react-native";

import { Modalize } from "react-native-modalize";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { 
	Modal,
	ModalRow,
	ModalButton,
	Chat,
	Delete,
	Phone,
	ButtonText,
	Warning,
	Checked,
} from "./styles";
import Requests from "../../classes/Requests";
import Songs from "../../classes/Songs"; 
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "../../hooks/useNavigation";
import { useSong } from "../../hooks/useSong";
import { useUser } from "../../hooks/useUser";
import events from "../../utils/events";

const SheduleModal = ({ modalRef, onClose, Shedule }) => {
	const { User } = useUser();
	const { song } = useSong();
	const { navigate } = useNavigation();

	useEffect(() => {
		const sub = events.on("close-modal", () => modalRef.current.close());

		return () => {
			sub();
		};
	}, []);

	return (
		<Modalize
			ref={modalRef}
			onClose={onClose}
			snapPoint={User.office === "administrator" ? wp("90%") : wp("45%")}
			modalHeight={User.office === "administrator" ? wp("90%") : wp("45%")}
		>
			<Modal
				style={{
					height: User.office === "administrator" ? wp("150%") : wp("55%"),
				}}
			>
				<ModalButton
					style={{ backgroundColor: "green" }}
					onPress={() => {
						modalRef.current.close();

						Linking.openURL(
							`tel:${Shedule.toUser.number.replace(" ", "").replace("+", "")}`
						);
					}}
				>
					<ModalRow>
						<Phone />

						<ButtonText>Ligar</ButtonText>
					</ModalRow>
				</ModalButton>

				{User.office === "administrator" && (
					<CustomButton
						style={{
							backgroundColor: !Shedule.alreadySent ? "#0DB1AD" : "#E5E05F",
						}}
						loaderProps={{
							size: wp("8%"),
							circleSize: wp("6.5%"),
							strokeWidth: wp("0.64%"),
							color: Shedule.alreadySent ? "#000" : "#fff",
						}}
						component={ModalButton}
						onPress={async () => await Requests.updateShedule(Shedule)}
					>
						<ModalRow>
							{Shedule.alreadySent ? <Warning /> : <Checked />}

							<ButtonText style={{ color: Shedule.alreadySent ? "#000" : "#fff" }}>
								Marcar como {Shedule.alreadySent ? "pendente" : "enviada"}
							</ButtonText>
						</ModalRow>
					</CustomButton>
				)}

				<ModalButton
					style={{ backgroundColor: "#444" }}
					onPress={() => {
						if (Object.keys(song).length >= 1 && song.isShedule) {
							Songs.destroy();
						}

						navigate("Chat", { chatId: Shedule.chatId });
					}}
				>
					<ModalRow>
						<Chat />

						<ButtonText>Suporte</ButtonText>
					</ModalRow>
				</ModalButton>

				<CustomButton
					onClose={() => setShedule({})}
					component={ModalButton}
					onPress={async () => {
						await Requests.deleteShedule(Shedule);

						if (
							Object.keys(song).length >= 1 &&
							song.isShedule &&
							song.sheduleId == Shedule.id
						) {
							Songs.destroy();
						}
					}}
					loaderProps={{
						size: wp("8%"),
						circleSize: wp("6.5%"),
						strokeWidth: wp("0.64%"),
						color: "#fff",
					}}
				>
					<ModalRow>
						<Delete />

						<ButtonText>Delete</ButtonText>
					</ModalRow>
				</CustomButton>
			</Modal>
		</Modalize>
	);
};

export default SheduleModal;
