class WebClock extends HTMLElement {
	connectedCallback(){
		this.render();
	}
	
	render(){
		this.innerHTML = `<div class="clock">
				<span class="time"></span>
				<span class="date"></span>
			</div>`
	}
		
}

customElements.define("web-clock", WebClock)