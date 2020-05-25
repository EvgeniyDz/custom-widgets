import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { IWeatherListProps } from '../../interfaces';

const WeatherList: React.FC<IWeatherListProps> = ({ weather_items }) => {
  return (
    <ListGroup variant="flush">
      {weather_items.map((item) => {
        let windDirection = '';
        if (item.wind.deg > 11.25 && item.wind.deg < 33.75) {
          windDirection = 'Северо-восток';
        } else if (item.wind.deg > 33.75 && item.wind.deg < 56.25) {
          windDirection = 'Северо-восток';
        } else if (item.wind.deg > 56.25 && item.wind.deg < 78.75) {
          windDirection = 'Восток';
        } else if (item.wind.deg > 78.75 && item.wind.deg < 101.25) {
          windDirection = 'Юго-восток';
        } else if (item.wind.deg > 101.25 && item.wind.deg < 123.75) {
          windDirection = 'Юго-восток';
        } else if (item.wind.deg > 123.75 && item.wind.deg < 146.25) {
          windDirection = 'Юго-восток';
        } else if (item.wind.deg > 146.25 && item.wind.deg < 168.75) {
          windDirection = 'Юго-восток';
        } else if (item.wind.deg > 168.75 && item.wind.deg < 191.25) {
          windDirection = 'Юг';
        } else if (item.wind.deg > 191.25 && item.wind.deg < 213.75) {
          windDirection = 'Юго-запад';
        } else if (item.wind.deg > 213.75 && item.wind.deg < 236.25) {
          windDirection = 'Юго-запад';
        } else if (item.wind.deg > 236.25 && item.wind.deg < 258.75) {
          windDirection = 'Юго-запад';
        } else if (item.wind.deg > 258.75 && item.wind.deg < 281.25) {
          windDirection = 'Запад';
        } else if (item.wind.deg > 281.25 && item.wind.deg < 303.75) {
          windDirection = 'Северо-запад';
        } else if (item.wind.deg > 303.75 && item.wind.deg < 326.25) {
          windDirection = 'Северо-запад';
        } else if (item.wind.deg > 326.25 && item.wind.deg < 348.75) {
          windDirection = 'Северо-запад';
        } else {
          windDirection = 'Север';
        }
        return (
          <ListGroup.Item key={item.dt}>
            <div className="d-flex align-items-center">
              <div
                className="mr-2 weather_icon"
                data-tooltip={item.weather[0].description}
              >
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                />
              </div>
              <p className="m-0">{item.dt_txt}</p>
            </div>
            <div className="d-flex">
              <p className="mr-2">
                Влажность: <strong>{item.main.humidity}%</strong>
              </p>
              <p className="mr-2">
                Скорость ветра: <strong>{item.wind.speed}м/с</strong>
              </p>
              <p className="mr-2">
                Направление ветра: <strong>{windDirection}</strong>
              </p>
            </div>
            <div className="d-flex">
              <p className="mr-2">
                Средняя температура: <strong>{item.main.temp}°</strong>
              </p>
              <p className="mr-2">
                Максимальная температура: <strong>{item.main.temp_max}°</strong>
              </p>
              <p className="mr-2">
                Минимальная температура: <strong>{item.main.temp_min}°</strong>
              </p>
            </div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default WeatherList;
