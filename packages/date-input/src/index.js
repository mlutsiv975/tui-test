import styles from "./styles.css";
import htmlString from "./template.html";

class DatePicker extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create and append the template
        const template = document.createElement('template');
        template.innerHTML = `<style>${styles.toString()}</style>${htmlString}`;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.inputElement = this.shadowRoot.querySelector('.date-input');

        this.handleDateChange = this.handleDateChange.bind(this);
    }

    connectedCallback() {
        this.inputElement.addEventListener('change', this.handleDateChange);
    }

    disconnectedCallback() {
        this.inputElement.removeEventListener('change', this.handleDateChange);
    }

    handleDateChange(event) {
        const selectedDate = event.target.value;
        this.dispatchEvent(new CustomEvent('date-change', {
            detail: { value: selectedDate },
            bubbles: true,
            composed: true,
        }));
    }
}

customElements.define('date-picker', DatePicker);
