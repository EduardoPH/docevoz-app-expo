import React, {
	Dispatch,
	MutableRefObject,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import events from "../utils/events";

interface User {
	id: string;
	ddd: string;
	phone: string;
	phoneVerified: boolean;
	name: string;
	office: string;
	shedulesCount: number;
	formatedPhone: string;
	createdAt: Date;
	country: string;
	token: string;
}

interface IUserProps {
	User: Partial<User>;
	alreadyBuild: MutableRefObject<boolean>;
	setUser: Dispatch<SetStateAction<Partial<User>>>;
}

export const UserContext = createContext<IUserProps>({});

export function UserProvider({ children }) {
	const alreadyBuild = useRef(false);

	const [User, setUser] = useState({
		ddd: "",
		phone: "",
		name: "",
	});

	useEffect(() => {
		const sub = events.on("user-deleted", () => {
			setUser({
				ddd: "",
				phone: "",
				name: "",
			});

			AsyncStorage.removeItem("token");
		});

		return () => {
			sub();
		};
	}, []);

	return (
		<UserContext.Provider
			value={{
				User,
				setUser,
				alreadyBuild,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	return useContext(UserContext);
}
