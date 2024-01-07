import { Platform } from "react-native";

import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import MusicControl, { Command } from "react-native-music-control";

import events from "../utils/events";


const sleep = t => new Promise(r => setTimeout(r, t));

class Songs {
	songs = {};

	currentSong = {
		id: "",
		index: 0,
		list: [],
		sound: new Audio.Sound(),
		isPaused: false,
	};
	queue = {};

	constructor() {
		this.getCurrentId = this.getCurrentId.bind(this);
		this.stopCurrent = this.stopCurrent.bind(this);
		this.destroy = this.destroy.bind(this);

		this.playSong = this.playSong.bind(this);
		this.seek = this.seek.bind(this);
		this.togglePause = this.togglePause.bind(this);
		this.load = this.load.bind(this);

		MusicControl.on(Command.togglePlayPause, this.togglePause.bind(this));
		MusicControl.on(Command.seek, this.seek.bind(this));
		MusicControl.on(Command.stop, this.destroy.bind(this));
	}

	getCurrentId() {
		return this.currentSong.id ?? "";
	}

	setupControl() {
		// MusicControl.enableBackgroundMode(true);
		MusicControl.enableControl("play", true);
		MusicControl.enableControl("pause", true);
		MusicControl.enableControl("stop", true);
		MusicControl.enableControl("nextTrack", true);
		MusicControl.enableControl("previousTrack", true);
		MusicControl.enableControl("changePlaybackPosition", true);
		MusicControl.enableControl("seek", true);
		MusicControl.enableControl("seekForward", true);
		MusicControl.enableControl("seekBackward", true);
	}

	async stopCurrent() {
		try {
			const sound = this.songs[this.currentSong.id];

			await sound.pauseAsync();
			await sound.setPositionAsync(0);
		} catch (e) { }
	}

	async togglePause() {
		const { id, isPaused } = this.currentSong;

		await this.songs[id][isPaused ? "playAsync" : "pauseAsync"]();

		events.emit("song-toggle-playing", !isPaused);

		MusicControl.updatePlayback({
			state: isPaused ? MusicControl?.STATE_PLAYING : MusicControl?.STATE_PAUSED,
		});

		this.currentSong.isPaused = !isPaused;
	}

	async seek(p) {
		const { id } = this.currentSong;

		await this.songs[id].pauseAsync();
		await this.songs[id].setPositionAsync(p);
		await this.songs[id].playAsync();

		this.currentSong.isPaused = false;

		events.emit("song-toggle-playing", false);
	}

	async changeSong(isNext = false) {
		MusicControl.updatePlayback({ elapsedTime: 0, state: MusicControl.STATE_BUFFERING });

		const { id, index, album } = this.currentSong;

		const newIndex = isNext ? index + 1 : index - 1;

		if (album.songs[newIndex]) {
			this.playSong(album.songs[newIndex].id, newIndex, album);

			return;
		}

		await this.songs[id].pauseAsync();
		await this.songs[id].setPositionAsync(0);
	}

	async load(id, uri) {
		if (this.queue[id]) return;

		this.queue[id] = true;

		const sound = new Audio.Sound();
		await sound.loadAsync({ uri }, undefined, true);

		await sound.setProgressUpdateIntervalAsync(1000);

		sound.setOnPlaybackStatusUpdate(
			(e => {
				if (e.didJustFinish) return this.changeSong(true);

				if (this.currentSong.id) {
					events.emit("song-duration", (e.positionMillis | 0) * 0.001);

					MusicControl.updatePlayback({ elapsedTime: (e.positionMillis | 0) * 0.001 });
				}
			}).bind(this)
		);

		this.songs[id] = sound;

		events.emit("song-loaded", id);
	}

	async playSong(id, index, album, isShedule) {
		await this.stopCurrent();

		Audio.setAudioModeAsync({
			playsInSilentModeIOS: true,
			staysActiveInBackground: true,
			...(Platform.OS == "ios"
				? {
					interruptionModeIOS: isShedule
						? InterruptionModeIOS.MixWithOthers
						: InterruptionModeIOS.DoNotMix,
				}
				: {
					interruptionModeAndroid: isShedule
						? InterruptionModeAndroid.MixWithOthers
						: InterruptionModeAndroid.DoNotMix,
				}),
		});

		events.emit("song-duration", 0);

		this.currentSong = {
			id,
			list: album.songs,
			album,
			index,
			isShedule,
			isPaused: true,
			isLoading: !(id in this.songs),
		};

		events.emit("song-changed", {
			...album.songs[index],
			album,
			index,
			isShedule,
			isPaused: true,
			isLoading: !(id in this.songs),
		});

		this.setupControl();

		MusicControl.setNowPlaying({
			title: album.songs[index].name,
			artwork: album.imageUrl,
			album: album.name,
			duration: Number(album.songs[index].duration),
		});

		MusicControl.updatePlayback({ state: MusicControl.STATE_BUFFERING });
		//25/12/2022
		if (id in this.songs) {
			await this.songs[id].setPositionAsync(0);

			events.emit("song-loaded", id);
		} else {
			this.load(id, album.songs[index].audioUrl);
		}
	}

	async destroy() {
		console.log("destroy");

		await this.stopCurrent(this.songs[this.currentSong.id]);

		events.emit("song-stop");

		this.currentSong = {
			id: "",
			index: 0,
			list: [],
			sound: new Audio.Sound(),
			isPaused: false,
		};

		MusicControl.stopControl();
	}
}

export default new Songs();
