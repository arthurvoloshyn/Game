export let random = (min, max) => {
	let r = Math.random();
	return Math.floor(r * (max - min) + min);
};

export let exists = (x) => {
	if (x != null) return x;
}

export let clone = (obj) => {
	let newObj = {};
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			newObj[prop] = obj[prop];
		}
	}
	return newObj;
}
