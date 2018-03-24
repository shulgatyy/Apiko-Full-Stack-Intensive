function render(element, mountNode) {
	while (mountNode.lastChild) mountNode.removeChild(mountNode.lastChild);
	mountNode.appendChild(element);
}

function createElement(name, props = {}, children) {
	const element = document.createElement(name);

	Object.entries(props).forEach(prop => addProp(element, prop));

	if (!children) return element;
	const append = child => element.append(child);
	if (Array.isArray(children)) children.forEach(append);
	else append(children);

	return element;
}

function addProp(element, [propName, propVal]) {
	switch (propName) {
		case "style":
		case "dataset":
			if (
				propVal &&
				propVal.constructor &&
				propVal.constructor === Object
			)
				Object.assign(element[propName], propVal);
			break;
		case "for":
			element.htmlFor = propVal;
			break;
		case "class":
			const classes = propVal;
			if (Array.isArray(classes)) {
				if (classes.length) element.classList.add(...classes);
				// element.className = classes.join(' ');
			} else {
				element.className = classes;
			}
			break;
		default:
			element[propName] = propVal;
	}
}
