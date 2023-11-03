import styles from "./styles.css";
import htmlString from "./template.html";

class DisplayDataComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Clone the template and append it to the shadow root
        const template = document.createElement('template');
        template.innerHTML = `<style>${styles.toString()}</style>${htmlString}`;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.autocompleteValueElement = this.shadowRoot.getElementById('autocomplete-value');
        this.dateValueElement = this.shadowRoot.getElementById('date-value');

        this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    connectedCallback() {
        window.addEventListener('autocomplete-change', this.handleAutocompleteChange);
        window.addEventListener('date-change', this.handleDateChange);
    }

    disconnectedCallback() {
        window.removeEventListener('autocomplete-change', this.handleAutocompleteChange);
        window.removeEventListener('date-change', this.handleDateChange);
    }

    handleAutocompleteChange(event) {
        this.autocompleteValueElement.textContent = event.detail.value.name || '-';
    }

    handleDateChange(event) {
        const dateValue = event.detail.value || '-';
        if (dateValue) {
            this.dateValueElement.textContent = this.formatDateToDDMMYYYY(dateValue);
        } else {
            this.dateValueElement.textContent = '-';
        }
    }

    formatDateToDDMMYYYY(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    }
}

customElements.define('display-data', DisplayDataComponent);
