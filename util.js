function assertEmpty(strOrArr, name) {
	if (!strOrArr.length) throw `${name} shouldn't be empty`;
}

function assertArray(arr) {
	if (!Array.isArray(arr)) throw "argument must by Array";
}

function checkTypes(checks) {
	assertArray(checks);
	checks.forEach(checkType);
}

function checkType(props) {
	assertArray(props);
	if (props.length !== 3)
		throw "argument must contain 3 elements: 'name', 'value', 'type'";

	const types = checkType.types;
	const nameOf = type => (type && type.name) || type;
	const checkHandler = type => {
		if (!types.has(type)) throw `checkType: unknown type "${nameOf(type)}"`;
	};
	const [name, value, type] = props;
	if (!types.get(String)(name)) throw `checkType: name must be "String"`;
	assertEmpty(name, "checkType: name");
	
	if (Array.isArray(type)) {
		type.forEach(checkHandler);
		const ok = type.some(t => types.get(t)(value));
		if (!ok) {
			const typeNames = type.map(t => `"${nameOf(t)}"`);
			throw `${name} must be one of (${typeNames})`;
		}
	} else {
		checkHandler(type);
		if (!types.get(type)(value)) throw `${name} must be ${nameOf(type)}`;
	}
}

checkType.types = new Map([
	[Array, Array.isArray],
	[String, s => typeof s === "string" || s instanceof String],
	[Object, o => o && o.constructor && o.constructor === Object],
	[HTMLElement, e => e instanceof HTMLElement],
	[undefined, u => typeof u === "undefined"]
]);
