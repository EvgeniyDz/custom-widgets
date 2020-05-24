import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import WeatherList from './lists/WeatherList';
import { IWeatherItem } from '../interfaces';

const WeatherComponent: React.FC = () => {
  const [list, setList] = useState<IWeatherItem[]>([]);
  useEffect(() => {
    axios
      .get(
        'http://api.openweathermap.org/data/2.5/forecast?q=Mykolaiv,UA-48,UK&appid=7d5164d60100fac02928c705e0d31cb6'
      )
      .then((response) => {
        console.log(response);
        // setList(list.push(response.data.list));
        const response_list: IWeatherItem[] = response.data.list;
        setList(response_list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Card>
      <Card.Body>
        {/* <WeatherList weather_items={list} /> */}
      </Card.Body>
    </Card>
  );
};

export default WeatherComponent;
