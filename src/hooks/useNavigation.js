import { CommonActions, useNavigation as useNavigate } from "@react-navigation/native";

export function useNavigation() {
	const { navigate, goBack, dispatch } = useNavigate();

	return {
		navigate,
		goBack,
		reset: (name, params = {}) => {
			dispatch(
				CommonActions.reset({
					index: 0,
					routes: Array.isArray(name) ? name : [{ name, params }],
				})
			);
		},
	};
}
