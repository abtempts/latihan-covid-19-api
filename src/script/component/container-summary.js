class ContainerSummary extends HTMLElement {
	connectedCallback() {
		this.render();
	}
	
	render() {
		this.innerHTML = `<div class="summary-container">
			<div  id="global"></div>
			<br/>
			<div id="countryid"></div>
		</div>`;
	}
}

customElements.define("container-summary", ContainerSummary)