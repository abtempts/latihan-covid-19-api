import 'regenerator-runtime';
import "../../styles/style.css";
import $ from "jquery";
import moment from "moment";
import Chart from 'chart.js';


let appBarElement = document.querySelector("app-bar");

if(!appBarElement) {
	appBarElement = document.createElement("app-bar");
	document.body.appendChild(appBarElement);
}
	
	
let searchBarElement = document.querySelector("search-bar");
if(!searchBarElement) {
	searchBarElement = document.createElement("search-bar");
	document.body.appendChild(searchBarElement);
}
	
	//import './script/component/search-bar.js';
	
/*Clock*/
const displayTime = () => {
	moment.locale("id");
	$(".time").text(moment().format("LTS"));
	$(".date").text(moment().format("LL"));
};

const updateTime = () => {
	displayTime();
	setTimeout(updateTime,1000)
};

updateTime();

/*mathdroid*/
const apiUrl0 = "https://covid19.mathdro.id/api"
const apiUrl1 = "https://covid19.mathdro.id/api/countries"
const global = document.getElementById("global");
const countryid = document.getElementById("countryid");

let urls = [];

const dataAPI = (function(){
	
	 const fetchData = async () => {

        urls = [];
        for (let i = 0; i < 2; i++) {
			if(i==0)
			{
				urls.push(apiUrl0);
			}
			else
			{
				urls.push(apiUrl1+"/indonesia");
			}
		}

        try {
            const response = Promise.all(urls.map((url, i) =>
					fetch(url).then(resp => resp.json())
              )).then(json => {
					global.innerHTML = fetchSummaryData(json[0], "Dunia")
					countryid.innerHTML = fetchSummaryData(json[1], "Indonesia")
              })
        } catch (error) {
            console.error(error);
        }
    }

    const init = () => {
        fetchData();
    }

    return {
        init: init
    }
		
})();

let jsonResult = dataAPI.init();

let data;

function fetchSummaryData(summary, label){
			const confirmed = summary.confirmed.value;
			const recovered = summary.recovered.value;
			const deaths = summary.deaths.value;
			const lastUpdate = new Date(summary.lastUpdate).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
			
			const summaryElement = document.createElement("div");
            summaryElement.setAttribute("class", "summary");
			
			 summaryElement.innerHTML = '<div class="summary-info">\n' +
			 '<label id="label-summary">'+label+'</label>' +
                '<div class="confirmed-label">Positif</div> <div class="confirmed-value">' +
				confirmed.toLocaleString() + '</div>' +
				 '<div class="recovered-label">Sembuh</div><div class="recovered-value"> ' + recovered.toLocaleString() + '</div>' +
                '<div class="deaths-label">Meninggal</div><div class="deaths-value"> ' + deaths.toLocaleString() + '</div>' +
				'<div class="lastUpdated-label">Diperbarui</div> <div class="lastUpdated-value">' + lastUpdate + '</div>' +
                '</div>';
				
			data = {
				datasets: [{
					data: [confirmed, recovered, deaths],
					backgroundColor: ["#faffb0", "#c0ffb6", "#ffd6d6"]
				}],

				labels: [
					'Positif',
					'Sembuh',
					'Meninggal'
				]
			};
			
			const options = {
				responsive: true,
				maintainAspectRatio: false,
				title: {
					display: true,
					text: label,
					fontColor: "blue",
					fontSize: 24
				},
				legend: {
					labels: {
						fontColor: "blue",
						fontSize: 18
					}
				}
			};
			
			const donatLabel =  "donat"+label;

			const canvas = document.getElementById(donatLabel);
			const ctx = canvas.getContext("2d");
			ctx.canvas.width = 500;
			ctx.canvas.height = 500;
			
			const donatGlobal = new Chart(ctx, {
			type: 'doughnut',
			data: data,
			options: options
			});


			return summaryElement.innerHTML;
}

function fetchCountryItem(item, label){
	console.log("fetchCountryItem");
			const confirmed = item.confirmed.value;
			const recovered = item.recovered.value;
			const deaths = item.deaths.value;
			const lastUpdate = new Date(item.lastUpdate).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
			
			$(".item").remove();
			
			const countryItemElement = document.createElement("div");
            countryItemElement.setAttribute("class", "item");
			
			 countryItemElement.innerHTML = '<div class="item-info">\n' +
			 '<h1 id="label-item">'+label+'</h1>' +
                '<div class="confirmed-label">Positif</div> <div class="confirmed-value">' +
				confirmed.toLocaleString() + '</div>' +
				 '<div class="recovered-label">Sembuh</div><div class="recovered-value"> ' + recovered.toLocaleString() + '</div>' +
                '<div class="deaths-label">Meninggal</div><div class="deaths-value"> ' + deaths.toLocaleString() + '</div>' +
				'<div class="lastUpdated-label">Diperbarui</div> <div class="lastUpdated-value">' + lastUpdate + '</div>' +
                '</div>';
							
			data = {
				datasets: [{
					data: [confirmed, recovered, deaths],
					backgroundColor: ["#faffb0", "#c0ffb6", "#ffd6d6"]
				}],

				labels: [
					'Positif',
					'Sembuh',
					'Meninggal'
				]
			};
				
			const options = {
				responsive: true,
				maintainAspectRatio: false,
				title: {
					display: true,
					text: label,
					fontColor: "blue",
					fontSize: 24
				},
				legend: {
					labels: {
						fontColor: "blue",
						fontSize: 18
					}
				}
			};
			

			resetCanvas();

			const canvas = document.querySelector("#donatCountry");				
			const ctx = canvas.getContext("2d");			
			ctx.canvas.width = 500;
			ctx.canvas.height = 500;
			
			const donatCountries = new Chart(ctx, {
			type: 'doughnut',
			data: data,
			options: options
			});
							


			return countryItemElement.innerHTML;
}

//console.log("breakpoint");	
const countryInfo = document.getElementById("countryInfo");

async function request(url){
	const response = await fetch(url);
	const json = await response.json();
	return await json;
}


const main = () => {
	let searchElement = document.querySelector("search-bar");
	console.log(searchElement.value);
	
	const onButtonSearchClicked = async() => {
		try {
			let country = searchElement.value;
			let apiUrl = "https://covid19.mathdro.id/api/countries/"+country;
			console.log(searchElement.value);
			request(apiUrl)
			.then(res => {
					countryInfo.innerHTML = fetchCountryItem(res, country);
             }		
		)
			
			renderResult(result);
		} catch (message) {
			fallbackResult(message)
		}
	};
	
	const renderResult = results => {
		countryInfo.innerHTML = results;
	};
	
	const fallbackResult = message => {
		countryInfo.innerHTML = message;
	}
	
	searchElement.clickEvent = onButtonSearchClicked;
};

let resetCanvas = function() {
	$('#donatCountry').remove();
	$('#donatCountries').append('<canvas id="donatCountry"></canvas>');
}

//export default main;

document.getElementById("searchButtonElement").addEventListener("click", main);