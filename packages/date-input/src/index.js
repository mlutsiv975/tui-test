import htmlString from "./template.html";
import styles from "./styles.css";

const RESPONSE = [
    {
        "category": "REISEZIELE VON A-Z",
        "icon": "location",
        "items": [
            {
                "key": "hub_6769",
                "name": "Kap Verde - Boavista",
                "level": 1,
                "parent": "hub_6757",
                "source": "peakwork"
            },
            {
                "key": "hub_6771",
                "name": "Kap Verde - Sal",
                "level": 1,
                "parent": "hub_6757",
                "source": "peakwork"
            },
            {
                "key": "hub_11274535",
                "name": "Kap Verde - weitere Inseln",
                "level": 1,
                "parent": "hub_6757",
                "source": "peakwork"
            },
            {
                "key": "hub_6827",
                "name": "Indien: Region Neu Delhi & Bombay",
                "level": 1,
                "parent": "hub_6817",
                "source": "peakwork"
            },
            {
                "key": "hub_7277",
                "name": "Bulgarien (Landesinnere)",
                "level": 1,
                "parent": "hub_10709",
                "source": "peakwork"
            },
            {
                "key": "hub_6887",
                "name": "Deutschland",
                "level": 0,
                "parent": null,
                "source": "peakwork"
            },
            {
                "key": "hub_6891",
                "name": "Baden-Württemberg",
                "level": 1,
                "parent": "hub_6887",
                "source": "peakwork"
            },
            {
                "key": "hub_6897",
                "name": "Berchtesgadener Land",
                "level": 1,
                "parent": "hub_6887",
                "source": "peakwork"
            },
            {
                "key": "hub_6901",
                "name": "Bodensee (Deutschland)",
                "level": 1,
                "parent": "hub_6887",
                "source": "peakwork"
            },
            {
                "key": "hub_6905",
                "name": "Brandenburg",
                "level": 1,
                "parent": "hub_6887",
                "source": "peakwork"
            }
        ],
        "type": "regions"
    }
]

class AutocompleteInput extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create and append the template
        const template = document.createElement('template');
        template.innerHTML = `<style>${styles.toString()}</style>${htmlString}`;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Elements
        this.inputElement = this.shadowRoot.querySelector('.autocomplete-input');
        this.listElement = this.shadowRoot.querySelector('.autocomplete-list');

        // Bind methods
        this.handleInput = this.handleInput.bind(this);
        this.selectItem = this.selectItem.bind(this);

        // Debounce timer
        this.debounceTimer = null;
    }

    connectedCallback() {
        this.inputElement.addEventListener('input', this.handleInput);
        console.log('this.inputElement', this.inputElement)
    }

    disconnectedCallback() {
        this.inputElement.removeEventListener('input', this.handleInput);
    }

    handleInput(event) {
        clearTimeout(this.debounceTimer);
        const inputElement = event.composedPath()[0];
        const value = inputElement.value;
        this.debounceTimer = setTimeout(() => {
            this.fetchData(value);
        }, 200);
    }

    async fetchData(query) {
        console.log('query', query)
        if (!query) {
            this.listElement.innerHTML = '';
            return;
        }
        console.log('11111')
        // Replace with your actual API endpoint
        // const response = await fetch(`https://api.cloud.tui.com/search-destination/v2/de/package/TUICOM/2/autosuggest/peakwork/${query}`);
        const data = RESPONSE;
        // const data = await response.json();
        const items = (data[0]?.items || []);
        this.showSuggestions(items, query);
    }

    showSuggestions(items, query) {
        this.listElement.innerHTML = '';
        const regex = new RegExp(query, 'gi'); // Global, case-insensitive
        items.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = item.name.replace(regex, match => `<span class="highlight">${match}</span>`);
            div.addEventListener('click', () => this.selectItem(item.name));
            this.listElement.appendChild(div);
        });
    }

    selectItem(item) {
        this.inputElement.value = item.name;
        this.listElement.innerHTML = '';
    }
}

customElements.define('autocomplete-input', AutocompleteInput);
