import axios from 'axios';
import { IWeatherResponse, ICurrencyItem, ICurrencyDateResponse } from '../types/interfaces';

export const getWeatherList = async (params: string | undefined): Promise<IWeatherResponse | null> => {
    try {
        const result = await axios.get<IWeatherResponse>(
          `http://api.openweathermap.org/data/2.5/forecast?q=${params}&units=metric&lang=ua&appid=7d5164d60100fac02928c705e0d31cb6`
        );
        return result.data;
      } catch {
        return null;
      }
}

export const getCurrencyDefaultList = async (): Promise<ICurrencyItem[] | null> => {
    try {
        const result = await axios.get<ICurrencyItem[]>('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
        return result.data;
      } catch (error) {
        console.log(error);
        return null;
      }
}

export const getCurrencyDateList = async (date: string): Promise<ICurrencyDateResponse | null> => {
    try {
        const result = await axios.get<ICurrencyDateResponse>(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${date}`);
        return result.data;
      } catch (error) {
        console.log(error);
        return null;
      }
}