const ref = Symbol("ref");

function render(element, mountNode) {
	mountNode.appendChild(element);
}

function createElement(name, props = {}, children) {
	let element;
	if (typeof name === "function") {
		props.children = children;
		children = null;
		const component = new name(props);
		element = component.render();
		component[ref] = element;
	} else {
		element = document.createElement(name);
	}

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

class Component {
	constructor(props) {
		this.props = props;
	}

	setState(newState) {
		Object.assign(this.state, newState);
		const newNode = this.render();
		this[ref].replaceWith(newNode);
		this[ref] = newNode;
	}
}
