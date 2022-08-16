import axios from 'axios';
import { IWeatherResponse } from '../types/interfaces';

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