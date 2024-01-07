import { Alert, Platform } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { isAxiosError } from "axios";
import * as Device from 'expo-device';


import events from "../utils/events";

// export const baseURL = "http://localhost:3333";
export const baseURL = "https://api.docecast.com";

const sleep = t => new Promise(r => setTimeout(r, t));

class Requests {
	albums = {};
	categoriesLoaded = {};
	notificationsLoaded = {};
	shedulesLoaded = {};
	albumsLoaded = {};
	messages = {};
	videos = {};

	constructor() {
		this.api = axios.create({ baseURL });
		this.headers = {};

		this.handleErrors = this.handleErrors.bind(this);
		this.updateToken = this.updateToken.bind(this);
		this.createSchedule = this.createSchedule.bind(this);
		this.createLogin = this.createLogin.bind(this);
		this.destroyLogin = this.destroyLogin.bind(this);
		this.getUser = this.getUser.bind(this);
		this.getAlbum = this.getAlbum.bind(this);
		this.createRegister = this.createRegister.bind(this);
		this.verifyRegisterCode = this.verifyRegisterCode.bind(this);
		this.resendCode = this.resendCode.bind(this);
		this.resetPassword = this.resetPassword.bind(this);
		this.getNotifications = this.getNotifications.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.getAlbumByPage = this.getAlbumByPage.bind(this);
		this.getMessages = this.getMessages.bind(this);
		this.getVideos = this.getVideos.bind(this);
		this.buildSound = this.buildSound.bind(this);
		this.upload = this.upload.bind(this);
		this.createCustom = this.createCustom.bind(this);
		this.reset = this.reset.bind(this);
	}

	async upload(uri) {
		uri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;

		const body = new FormData();

		body.append("random", { uri, name: "random.mp4", type: "audio/mp4" });

		try {
			const { data } = await this.api.post("/upload", body, {
				headers: { "content-type": "multipart/form-data" },
			});

			return { audioUrl: data.file, duration: data.duration };
		} catch (e) {
			console.log(e);
		}
	}

	async createCustom(body) {
		try {
			const { data } = await this.api.post("/telemensagem", body);

			return data;
		} catch (e) {
			this.handleErrors(e, this.createCustom, body);
		}
	}

	async buildSound(songId, teleId, url, signal) {
		console.log({
			...(teleId ? { teleId } : { songId }),
			url,
		});

		const { data } = await this.api.post(
			"/sound",
			{
				...(teleId ? { teleId } : { songId }),
				url,
			},
			{ signal }
		);

		console.log(data);

		return data;
	}

	async getVideos(q, page, signal) {
		const { data } = await this.api.get("/youtube", {
			signal,
			params: { q, ...(page && { page }) },
		});

		return data;
	}

	async handleErrors(e, method, ...params) {
		try {
			if (isAxiosError(e)) {
				console.log("aqui2", e.response.data);

				switch (e.response.data.error) {
					case "timeout":
						Alert.alert("Erro", "Sua internet está lenta demais!");

						break;

					case "this shedule is invalid":
						if (method.name === "updateShedule") {
							Alert.alert("Erro", "Esse agendamento não exite mais!");
						}

						events.emit("shedule-removed", ...params);

						break;

					case "token is necessary":
						events.emit("redirect", "Login");

						await AsyncStorage.removeItem("token");

						break;

					case "this giftcard not exists or expired":
						Alert.alert("Erro", "Esse código não existe ou já foi utilizado!");

						break;

					case "this message not exists":
						events.emit("chat-message-deleted", ...params);

						break;

					case "this user not exists or password incorrect":
						if (method.name.replace("bound ", "").trim() == "deleteUser") {
							events.emit("user-deleted");
							events.emit("redirect", "Login");

							return;
						}

						if (method.name.replace("bound ", "").trim() === "getUser") {
							events.emit("redirect", "Login");

							await AsyncStorage.removeItem("token");

							return;
						}

						Alert.alert("Erro", "Esse usuário não existe ou senha invalida");

						break;

					case "this phone already in use":
						Alert.alert("Erro", "Esse número já está sendo usado");

						break;
				}
			}
		} catch (e) {
			if (method.name.replace("bound ", "").trim() == "getUser") {
				events.emit("redirect", "Login");

				return;
			}

			await sleep(1000);

			method?.apply(this, params);
		}
	}

	async registerHeaders(token) {
		this.headers = { headers: { authorization: `Bearer ${token}` } };
		await AsyncStorage.setItem("token", JSON.stringify({ token }));
	}

	async getMessages(chatId, page = 1) {
		try {
			if (!this.messages[chatId + String(page)]) {
				this.messages[chatId + String(page)] = true;

				const { data } = await this.api.get(
					`/messages?chatId=${chatId}&page=${page}`,
					this.headers
				);

				events.emit("chat-loaded", chatId, page, data);
			}
		} catch (e) {
			this.handleErrors(e, this.getMessages, chatId, page);
		}
	}

	async reset() {
		this.shedulesLoaded = {};
		this.notificationsLoaded = {};
	}

	async getShedules(page = 1) {
		try {
			if (!this.shedulesLoaded[page]) {
				this.shedulesLoaded[page] = true;

				const { data } = await this.api.get(`/shedules?page=${page}`, this.headers);

				events.emit("shedules-loaded", {
					...data,
					messages: { ...data.messages, page },
				});
			}
		} catch (e) {
			if (this.shedulesLoaded[page]) {
				delete this.shedulesLoaded[page];
			}

			this.handleErrors(e, this.getShedules, page);
		}
	}

	async getNotifications(page = 1) {
		try {
			if (!this.notificationsLoaded[page]) {
				this.notificationsLoaded[page] = true;

				const { data } = await this.api.get(`/notifications?page=${page}`, this.headers);

				events.emit("notifications-loaded", { ...data, page });
			}
		} catch (e) {
			if (this.shedulesLoaded[page]) {
				delete this.shedulesLoaded[page];
			}

			this.handleErrors(e, this.getNotifications, page);
		}
	}

	async getAlbumByPage(id, page = 1) {
		try {
			const data = this.albumsLoaded[page];

			if (!data || !data[id]) {
				if (!this.albumsLoaded[page]) {
					this.albumsLoaded[page] = {};
				}

				this.albumsLoaded[page][id] = true;

				const { data } = await this.api.get(
					`/albums?categoryId=${id}&page=${page}`,
					this.headers
				);

				events.emit("albums-loaded", id, page, data);
			}
		} catch (e) {
			if (this.albumsLoaded[page][id]) {
				delete this.albumsLoaded[page][id];
			}

			this.handleErrors(e, this.getAlbumByPage, id, page);
		}
	}

	async deleteShedule(shedule) {
		try {
			await this.api.delete(`/shedule/${shedule.id}`, this.headers);

			events.emit("shedule-removed", shedule);
		} catch (e) {
			this.handleErrors(e, this.deleteShedule, shedule);
		}
	}

	async resetNotifications() {
		try {
			await this.api.post("/notifications", {}, this.headers);
		} catch (e) {
			this.handleErrors(e, this.resetNotifications);
		}
	}

	async deleteUser() {
		try {
			await this.api.delete("/user", this.headers);

			events.emit("user-deleted");
			events.emit("redirect", "Login");
		} catch (e) {
			this.handleErrors(e, this.deleteUser);
		}
	}

	async updateShedule(shedule) {
		console.log(shedule.id);

		try {
			await this.api.put(
				`/shedule/${shedule.id}`,
				{ alreadySent: !shedule.alreadySent },
				this.headers
			);

			events.emit("shedule-updated", { ...shedule, alreadySent: !shedule.alreadySent });
		} catch (e) {
			this.handleErrors(e, this.updateShedule, shedule);
		}
	}

	async createSchedule(body) {
		try {
			const { data } = await this.api.post("/shedule", body, this.headers);

			if (!data.ref) {
				events.emit("shedule-created", data);
				// events.emit("redirect", [
				// 	{ name: "Home", params: {} },
				// 	{ name: "Dashboard", params: {} },
				// ]);
				return true;
			}
			if (data.ref) {
				events.emit("redirect", [
					{ name: "Home", params: {} },
					{ name: "Dashboard", params: {} },
					{ name: "Reference", params: { ref: data.ref } },
				]);
			}
		} catch (e) {
			this.handleErrors(e, this.createSchedule, body);
			return false;
		}
	}

	async getUser() {
		try {
			const { token } = JSON.parse(await AsyncStorage.getItem("token"));
			this.registerHeaders(token);

			const { data } = await this.api.get("/user", this.headers);

			this.registerHeaders(data.token);

			events.emit("userChanged", data);
		} catch (e) {
			this.handleErrors(e, this.getUser);
		}
	}

	async deleteMessage(id, index, groupIndex) {
		try {
			await this.api.delete(`/message/${id}`, this.headers);

			events.emit("chat-message-deleted", id, index, groupIndex);
		} catch (e) {
			this.handleErrors(e, this.deleteMessage, id, index, groupIndex);
		}
	}

	async getCategories(page = 1) {
		try {
			if (!this.categoriesLoaded[page]) {
				this.categoriesLoaded[page] = true;
				const { data } = await this.api.get(`/categories?page=${page}`);
				events.emit("categories-loaded", data, page);
			}
		} catch (e) {
			if (this.categoriesLoaded[page]) {
				delete this.categoriesLoaded[page];
			}

			this.handleErrors(e, this.getCategories, page);
		}
	}

	async getAlbum(id) {
		try {
			if (id in this.albums) {
				events.emit("album-loaded", this.albums[id]);

				return;
			}

			const { data } = await this.api.get(`/album/${id}`);

			this.albums[id] = data;

			events.emit("album-loaded", data);
		} catch (e) {
			this.handleErrors(e, this.getAlbum, id);
		}
	}

	async createLogin(body) {
		try {
			const { data } = await this.api.post("/login", body);
			this.registerHeaders(data.token);
			events.emit("userChanged", data);
		} catch (e) {
			this.handleErrors(e, this.createLogin, body);
		}
	}

	async destroyLogin() {
		try {
			await AsyncStorage.removeItem("token");
			events.emit("redirect", "Login");
		} catch (e) {
			this.handleErrors(e, this.destroyLogin);
		}
	}

	async createRegister(body) {
		try {
			const { data } = await this.api.post("/register", body);
			this.registerHeaders(data.token);
			events.emit("userChanged", data);
		} catch (e) {
			this.handleErrors(e, this.createRegister, body);
		}
	}

	async resendCode(body) {
		try {
			await this.api.post("/resend", body);
		} catch (e) {
			this.handleErrors(e, this.resendCode, body);
		}
	}

	async verifyRegisterCode(code) {
		try {
			if (code.length < 5) {
				Alert.alert("Erro", "Código invalido!");

				return;
			}

			await this.api.post("/user/verify", { code }, this.headers);

			events.emit("userVerified");

			return;
		} catch (e) {
			this.handleErrors(e, this.verifyRegisterCode, code);
		}
	}

	async resetPassword(body) {
		try {
			const { ddd, phone } = body;
			await this.api.post("/resetPassword", { ddd, phone });
			events.emit("redirect", "CodeVerification", { resetPassword: body });
		} catch (e) {
			this.handleErrors(e, this.resetPassword, body);
		}
	}

	async changePassword(body) {
		try {
			const { code } = body;
			if (code.length < 5) {
				Alert.alert("Erro", "Preencha todos os campos!");

				return;
			}

			await this.api.post("/changePassword", body);

			Alert.alert("Sucesso", "Senha alterada!", [
				{
					text: "Continuar",
					onPress: () => events.emit("redirect", "Login"),
				},
			]);
		} catch (e) {
			console.log(e.response.data);

			this.handleErrors(e, this.changePassword, body);
		}
	}

	async updateToken(token) {
		try {
			await this.api.post(
				"/token",
				{
					token,
					deviceId: Device.modelId,
					platform: Platform.OS,
				},
				this.headers
			);
		} catch (e) {
			console.log(e.response.data);
		}
	}
}

export default new Requests();
