class AppBar extends HTMLElement {
	connectedCallback() {
		this.render();
	}
	
	render() {
		this.innerHTML = `<h2>Situs Pemantau Covid-19</h2>`;
	}
}

customElements.define("app-bar", AppBar)