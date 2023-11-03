import htmlString from "./template.html";
import styles from "./styles.css";

class AutocompleteInput extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create and append the template
        const template = document.createElement('template');
        template.innerHTML = `<style>${styles.toString()}</style>${htmlString}`;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.inputElement = this.shadowRoot.querySelector('.autocomplete-input');
        this.listElement = this.shadowRoot.querySelector('.autocomplete-list');

        this.handleInput = this.handleInput.bind(this);
        this.selectItem = this.selectItem.bind(this);

        this.debounceTimer = null;
    }

    connectedCallback() {
        this.inputElement.addEventListener('input', this.handleInput);
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
        if (!query) {
            this.listElement.innerHTML = '';
            return;
        }
        const response = await fetch(`https://api.cloud.tui.com/search-destination/v2/de/package/TUICOM/2/autosuggest/peakwork/${query}`);
        const data = await response.json();
        const items = (data[0]?.items || []);
        this.showSuggestions(items, query);
    }

    showSuggestions(items, query) {
        this.listElement.innerHTML = '';
        const regex = new RegExp(query, 'gi'); // Global, case-insensitive
        items.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = item.name.replace(regex, match => `<span class="highlight">${match}</span>`);
            div.addEventListener('click', () => this.selectItem(item));
            this.listElement.appendChild(div);
        });
    }

    selectItem(item) {
        this.inputElement.value = item.name;
        this.listElement.innerHTML = '';
        this.dispatchEvent(new CustomEvent('autocomplete-change', {
            detail: { value: item },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('autocomplete-input', AutocompleteInput);
