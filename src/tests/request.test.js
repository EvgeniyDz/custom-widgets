import axios from "axios";
import { getWeatherList } from '../services/apiCalls';
import { weatherResponse } from './testData';

jest.mock('axios');
describe('Get weather data', () => {
    it('get successfully data from an API', async () => {  
      axios.get.mockImplementationOnce(() => Promise.resolve(weatherResponse));
  
      await expect(getWeatherList('test')).resolves.toEqual(weatherResponse.data);
    });
  
    it('get error data from an API', async () => {
  
      axios.get.mockImplementationOnce(() =>
        Promise.reject(),
      );
  
      await expect(getWeatherList('test')).resolves.toEqual(null);
    });
});