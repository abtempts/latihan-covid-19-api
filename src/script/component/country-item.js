class CountryItem extends HTMLElement {
	connectedCallback() {
		this.render();
	}
	
	render() {
		this.innerHTML = `<div id="countryInfo"></div>`
	}
	
}

customElements.define("country-item", CountryItem);
