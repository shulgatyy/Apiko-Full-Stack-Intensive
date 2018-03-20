function render(element, mountNode) {
	mountNode.appendChild(element);
}

function createElement(name, props = {}, children) {
	const element = document.createElement(name);

	Object.keys(props).forEach(propName => {
		// TODO "class" and "for" attrs
		if (propName === "style") Object.assign(element.style, props.style);
		else element[propName] = props[propName];
	});

	if (!children) return element;
	const append = child => element.append(child);
	if (Array.isArray(children)) children.forEach(append);
	else append(children);

	return element;
}
