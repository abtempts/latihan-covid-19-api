class searchBar extends HTMLElement {
	connectedCallback(){
		this.render();
	}
	
set clickEvent(event) {
	this._clickEvent = event;
	this.render();
}

get value() {
	return this.querySelector("#searchElement").value;
}

	render() {
		this.innerHTML = `<div id="search-container" class="search-container">
			<input placeholder="cari negara" id="searchElement" type="search">
			<button id="searchButtonElement" type="submit">Cari</button>
			</div>`;
		this.querySelector("#searchButtonElement").addEventListener("click", this._clickEvent);
	}
}

if(!customElements.get('search-bar')) {
	customElements.define("search-bar", searchBar);
}
