import React, { useState, useRef } from "react";

import { useFocusEffect } from "@react-navigation/native";


import {
	Feed,
	Header,
	Button,
	BackIcon,
	HeaderTitle,
	Notifications,
	NewNotification,
	Boxs,
	Box,
	BoxHeader,
	BoxHeart,
	BoxHeaderTitle,
	BoxFlag,
	BoxAmount,
	Buttons,
	DeleteAccount,
	DeleteIcon,
	NewShedule,
	PlusIcon,
	LogoutButton,
	ButtonLabel,
	LogoutIcon,
} from "./styles";
import Requests from "../../classes/Requests";
import Songs from "../../classes/Songs";
import ConfirmDialog from "../../components/ConfirmDialog";
import SheduleCard from "../../components/SheduleCard";
import SheduleModal from "../../components/SheduleModal";
import { useContent } from "../../hooks/useContent";
import { useNavigation } from "../../hooks/useNavigation";
import { useSong } from "../../hooks/useSong";
import { useUser } from "../../hooks/useUser";
import events from "../../utils/events";

const Dashboard = () => {
	const { navigate, goBack } = useNavigation();
	const { User } = useUser();
	const { setSong, song } = useSong();
	const { Shedules, Notifications: Notify } = useContent();

	const modalRef = useRef(null);
	const deleteRef = useRef(null);
	const logoutRef = useRef(null);

	const [Shedule, setShedule] = useState({});

	function backScreen() {
		goBack();

		song.isShedule && Songs.destroy();
	}

	const onScroll = e => {
		const {
			contentOffset: { y },
			layoutMeasurement,
			contentSize,
		} = e.nativeEvent;

		const percentage = contentSize.height * 0.6;
		const total = y + layoutMeasurement.height;

		if (total > percentage && Shedules.messages.totalPages >= Shedules.messages.page + 1) {
			Requests.getShedules(Shedules.messages.page + 1);
		}
	};

	useFocusEffect(() => {
		const sub = events.on("shedule-removed", () => {
			setShedule({});
			modalRef.current.close();
		});

		return () => {
			sub();
		};
	});

	return (
		<>
			<Feed onScroll={onScroll} scrollEventThrottle={16}>
				<Header>
					<Button onPress={backScreen}>
						<BackIcon />
					</Button>

					<HeaderTitle>
						Olá
						<HeaderTitle style={{ color: "#F80F00" }}>
							{" " + User.name.split(" ")[0]}!
						</HeaderTitle>
					</HeaderTitle>

					<Button onPress={() => navigate("Notifications")}>
						<Notifications />
						{Notify.notReaded >= 1 && <NewNotification />}
					</Button>
				</Header>

				<Boxs>
					<Box onPress={() => navigate("Pending")}>
						<BoxHeader>
							<BoxHeart />
							<BoxHeaderTitle>Pendentes</BoxHeaderTitle>
						</BoxHeader>
						<BoxAmount>{Shedules.count.pending}</BoxAmount>
					</Box>

					<Box onPress={() => navigate("Aproved")}>
						<BoxHeader>
							<BoxFlag />
							<BoxHeaderTitle aproved>Enviadas</BoxHeaderTitle>
						</BoxHeader>
						<BoxAmount aproved>{Shedules.count.aproved}</BoxAmount>
					</Box>
				</Boxs>

				{Shedules.messages.data.map(item => (
					<SheduleCard
						item={item}
						key={item.id}
						openModal={item => {
							setShedule(item);
							modalRef.current.open();
						}}
					/>
				))}

				<Buttons>
					<DeleteAccount onPress={() => deleteRef.current.open()}>
						<DeleteIcon />
						<ButtonLabel>Deletar conta</ButtonLabel>
					</DeleteAccount>

					<NewShedule onPress={backScreen}>
						<PlusIcon />
					</NewShedule>
				</Buttons>

				<LogoutButton onPress={() => logoutRef.current.open()}>
					<LogoutIcon />
					<ButtonLabel>Sair da conta</ButtonLabel>
				</LogoutButton>
			</Feed>

			<ConfirmDialog
				ref={deleteRef}
				confirmAction={async () => await Requests.deleteUser()}
				confirmLabel="Deletar"
			/>

			<ConfirmDialog
				ref={logoutRef}
				confirmAction={async () => await Requests.destroyLogin()}
				confirmLabel="Sair da conta"
				buttonStyle={{ backgroundColor: "darkorange" }}
			/>

			<SheduleModal Shedule={Shedule} modalRef={modalRef} onClose={() => setShedule({})} />
		</>
	);
};

export default Dashboard;
