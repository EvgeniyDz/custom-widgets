import React from 'react';
import { Card } from 'react-bootstrap';
import { IWeatherListProps } from '../../interfaces';

const WeatherList: React.FC<IWeatherListProps> = ({ weather_items }) => {
  return (
    <Card>
      <Card.Body>{weather_items}</Card.Body>
    </Card>
  );
};

export default WeatherList;
