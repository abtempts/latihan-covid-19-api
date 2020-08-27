class CountryDonat extends HTMLElement {
	connectedCallback() {
		this.render();
	}
	
	render() {
		this.innerHTML = `<div class="donat-country">
			<div id="donatCountries">
				<canvas id="donatCountry"></canvas>
			</div>
		</div>`;
	}
}

customElements.define("country-donat", CountryDonat)