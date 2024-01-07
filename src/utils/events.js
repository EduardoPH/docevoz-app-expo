class Events {
	events = {};

	emit(event, ...args) {
		if (event in this.events) {
			for (let fn of this.events[event]) {
				fn(...args);
			}
		}
	}

	on(event, callback) {
		if (!(event in this.events)) {
			this.events[event] = [];
		}

		const position = this.events[event].length;

		this.events[event].push(callback);

		return () => {
			this.events[event] = this.events[event].filter((c, index) => index != position);
		};
	}
}

export default new Events();
