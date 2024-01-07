import React, { useRef, useState } from "react";

import { Feed, Header, Button, BackIcon, Title } from "./styles";
import Requests from "../../classes/Requests";
import SheduleCard from "../../components/SheduleCard";
import SheduleModal from "../../components/SheduleModal";
import { useContent } from "../../hooks/useContent";
import { useNavigation } from "../../hooks/useNavigation";

const Shedule = ({ label, type }) => {
	const { goBack } = useNavigation();
	const { Shedules } = useContent();

	const modalRef = useRef(null);
	const [Shedule, setShedule] = useState({});

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

	return (
		<>
			<Feed onScroll={onScroll}>
				<Header>
					<Button onPress={goBack}>
						<BackIcon />
					</Button>

					<Title>{label}</Title>
				</Header>

				{Shedules[type].data.map(item => (
					<SheduleCard
						item={item}
						openModal={() => {
							setShedule(item);

							modalRef.current.open();
						}}
						key={item.id}
					/>
				))}
			</Feed>
			<SheduleModal Shedule={Shedule} modalRef={modalRef} onClose={() => setShedule({})} />
		</>
	);
};

export default Shedule;
