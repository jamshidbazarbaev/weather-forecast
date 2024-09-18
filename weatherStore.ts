import { makeAutoObservable } from 'mobx';
import axios from 'axios';

const API_KEY = '499546dba53a1e0b4bd7c94053fcde8c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherStore {
  city: string = '';
  weather: any = null;
  loading: boolean = false;
  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setCity(city: string) {
    this.city = city;
  }

  async getWeather() {
    this.loading = true;
    this.error = '';
    this.weather = null;

    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: this.city,
          appid: API_KEY,
          units: 'metric',
          lang: 'ru',
        },
      });
      this.weather = response.data;
    } catch (error) {
      this.error = (error as Error).message;
    } finally {
      this.loading = false;
    }
  }
}

const weatherStore = new WeatherStore();
export default weatherStore;
