import { useContext } from "react";

import { SongContext } from "../contexts/SongProvider";

export function useSong() {
	return useContext(SongContext);
}
