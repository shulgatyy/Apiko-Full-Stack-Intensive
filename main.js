const React = {
	createElement,
	render,
	Component
};

class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = { count: props.start };
		this.inc = this.inc.bind(this);
	}

	inc() {
		this.setState({ count: this.state.count + 1 });
	}

	render() {
		return React.createElement(
			"p",
			{ style: { backgroundColor: "green" } },
			[
				this.props.children,
				React.createElement("b", undefined, this.state.count),
				React.createElement("button", { onclick: this.inc }, "increment")
			]
		);
	}
}

const app = React.createElement("div", { style: { backgroundColor: "red" } }, [
	React.createElement(Counter, { start: 3 }, "count: "),
	React.createElement("span", undefined, "Hello world"),
	React.createElement("br"),
	"This is just a text node",
	React.createElement("div", { textContent: "Text content" })
]);

React.render(app, document.getElementById("root"));
