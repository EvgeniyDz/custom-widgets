import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { IWeatherListProps } from '../../types/interfaces';

const WeatherList: React.FC<IWeatherListProps> = ({ weather_items }) => {
  return (
    <ListGroup variant="flush">
      {weather_items.map((item) => {
        let windDirection = '';
        if (
          (item.wind.deg > 11.25 && item.wind.deg < 33.75) ||
          (item.wind.deg > 33.75 && item.wind.deg < 56.25)
        ) {
          windDirection = 'Північний-схід';
        } else if (item.wind.deg > 56.25 && item.wind.deg < 78.75) {
          windDirection = 'Схід';
        } else if (
          (item.wind.deg > 78.75 && item.wind.deg < 101.25) ||
          (item.wind.deg > 101.25 && item.wind.deg < 123.75) ||
          (item.wind.deg > 123.75 && item.wind.deg < 146.25) ||
          (item.wind.deg > 146.25 && item.wind.deg < 168.75)
        ) {
          windDirection = 'Південний-схід';
        } else if (item.wind.deg > 168.75 && item.wind.deg < 191.25) {
          windDirection = 'Південь';
        } else if (
          (item.wind.deg > 191.25 && item.wind.deg < 213.75) ||
          (item.wind.deg > 213.75 && item.wind.deg < 236.25) ||
          (item.wind.deg > 236.25 && item.wind.deg < 258.75)
        ) {
          windDirection = 'Південний-захід';
        } else if (item.wind.deg > 258.75 && item.wind.deg < 281.25) {
          windDirection = 'Захід';
        } else if (
          (item.wind.deg > 281.25 && item.wind.deg < 303.75) ||
          (item.wind.deg > 303.75 && item.wind.deg < 326.25) ||
          (item.wind.deg > 326.25 && item.wind.deg < 348.75)
        ) {
          windDirection = 'Північний-захід';
        } else {
          windDirection = 'Північ';
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
                Вологість: <strong>{item.main.humidity}%</strong>
              </p>
              <p className="mr-2">
                Швидкість вітру: <strong>{item.wind.speed}м/с</strong>
              </p>
              <p className="mr-2">
                Напрям вітру: <strong>{windDirection}</strong>
              </p>
            </div>
            <div className="d-flex">
              <p className="mr-2">
                Середня температура: <strong>{item.main.temp}°</strong>
              </p>
              <p className="mr-2">
                Максимальна температура: <strong>{item.main.temp_max}°</strong>
              </p>
              <p className="mr-2">
                Мінімальна температура: <strong>{item.main.temp_min}°</strong>
              </p>
            </div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default WeatherList;
