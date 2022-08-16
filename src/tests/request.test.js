import axios from "axios";
import { getWeatherList, getCurrencyDefaultList, getCurrencyDateList } from '../services/apiCalls';
import { weatherResponse, currencyDefaultResponse, currencyDateResponse } from './testData';

jest.mock('axios');
describe('Get weather data', () => {
    it('get successfully data from an API', async () => {  
      axios.get.mockImplementationOnce(() => Promise.resolve(weatherResponse));
  
      await expect(getWeatherList('test')).resolves.toEqual(weatherResponse.data);

      expect(axios.get).toHaveBeenCalledWith(
        'http://api.openweathermap.org/data/2.5/forecast?q=test&units=metric&lang=ua&appid=7d5164d60100fac02928c705e0d31cb6',
      );

    });
  
    it('get error data from an API', async () => {
  
      axios.get.mockImplementationOnce(() =>
        Promise.reject(),
      );
  
      await expect(getWeatherList('test')).resolves.toEqual(null);
    });
});

describe('Get currency data', () => {
    // Default currency
    it('get successfully data for default value', async () => {  
      axios.get.mockImplementationOnce(() => Promise.resolve(currencyDefaultResponse));
  
      await expect(getCurrencyDefaultList()).resolves.toEqual(currencyDefaultResponse.data);

    });
  
    it('get error data for default value', async () => {
  
      axios.get.mockImplementationOnce(() =>
        Promise.reject(),
      );
  
      await expect(getCurrencyDefaultList()).resolves.toEqual(null);
    });

    // Date currency
    it('get successfully data for date value', async () => {  
        axios.get.mockImplementationOnce(() => Promise.resolve(currencyDateResponse));
    
        await expect(getCurrencyDateList('04.08.2022')).resolves.toEqual(currencyDateResponse.data);

        expect(axios.get).toHaveBeenCalledWith(
            'https://api.privatbank.ua/p24api/exchange_rates?json&date=04.08.2022',
        );
  
      });
    
      it('get error data for date value', async () => {
    
        axios.get.mockImplementationOnce(() =>
          Promise.reject(),
        );
    
        await expect(getCurrencyDateList('04.08.2022')).resolves.toEqual(null);
    });
});