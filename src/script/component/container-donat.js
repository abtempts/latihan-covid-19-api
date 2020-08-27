class ContainerDonat extends HTMLElement {
	connectedCallback() {
		this.render();
	}
	
	render() {
		this.innerHTML = `<div class="donat-container">
			<div id="donatGlobal">
				<canvas id="donatDunia"></canvas>
			</div>
			<div id="donatId">
			<canvas id="donatIndonesia"></canvas>
			</div>
		</div>`;
	}
}

customElements.define("container-donat", ContainerDonat)