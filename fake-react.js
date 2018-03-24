function render(element, mountNode) {
	checkTypes([
		["render: element", element, HTMLElement],
		["render: mountNode", mountNode, HTMLElement]
	]);
	while (mountNode.lastChild) mountNode.removeChild(mountNode.lastChild);
	mountNode.appendChild(element);
}

function createElement(name, props = {}, children) {
	checkTypes([
		["createElement: name", name, String],
		["createElement: props", props, Object],
		["createElement: children", children,
			[undefined, String, HTMLElement, Array]
		]
	]);
	assertEmpty(name, "name");
	if (children && Array.isArray(children))
		children.forEach(child => checkType([
			"createElement: entries of children", child, [String, HTMLElement]
		]));

	const element = document.createElement(name);

	Object.entries(props).forEach(prop => addProp(element, prop));

	if (!children) return element;
	const append = child => element.append(child);
	if (Array.isArray(children)) children.forEach(append);
	else append(children);

	return element;
}

function addProp(element, [propName, propVal]) {
	const checkFor = type =>
		checkType([`createElement: props.${propName}`, propVal, type]);
	switch (propName) {
		case "style":
		case "dataset":
			checkFor(Object);
			Object.assign(element[propName], propVal);
			break;
		case "for":
			checkFor(String);
			element.htmlFor = propVal;
			break;
		case "class":
			checkFor([String, Array]);
			const classes = propVal;
			if (Array.isArray(classes)) {
				const name = "createElement: props.class entries";
				classes.forEach(c => {
					checkType([name, c, String]);
					assertEmpty(c, name);
				});
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
