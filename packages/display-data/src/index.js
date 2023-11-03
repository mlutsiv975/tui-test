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

        // Elements
        this.inputElement = this.shadowRoot.querySelector('.date-input');

        // Bind methods
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    connectedCallback() {
        this.inputElement.addEventListener('change', this.handleDateChange);
    }

    disconnectedCallback() {
        this.inputElement.removeEventListener('change', this.handleDateChange);
    }

    handleDateChange(event) {
        const selectedDate = event.target.value; // The date will be in "YYYY-MM-DD" format
        this.dispatchEvent(new CustomEvent('date-changed', {
            detail: { date: selectedDate },
            bubbles: true, // Allows the event to bubble up through the DOM
            composed: true // Allows the event to cross the shadow DOM boundary
        }));
    }
}

customElements.define('date-picker', DatePicker);
