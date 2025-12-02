import { defineCustomElement } from 'vue'
import App from './App.ce.vue';

const WeatherCE = defineCustomElement(App)
customElements.define('weather-widget', WeatherCE)

