import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, ButtonGroup, Button, Form } from 'react-bootstrap';
import WeatherList from './lists/WeatherList';
import { IWeatherItem, IWeatherResponse } from '../types/interfaces';

const WeatherComponent: React.FC = () => {
  const [list, setList] = useState<IWeatherItem[]>([]);
  const [tab, setTab] = useState<number>(1);
  const [hasError, toggleError] = useState<boolean>(false);
  const [city, setCity] = useState<string>('');

  const refSearch = useRef<HTMLInputElement>(null);

  const getInfo = async (params: string | undefined): Promise<void> => {
    try {
      const result = await axios.get<IWeatherResponse>(
        `http://api.openweathermap.org/data/2.5/forecast?q=${params}&units=metric&lang=ua&appid=7d5164d60100fac02928c705e0d31cb6`
      );
      const response_list: IWeatherItem[] = result.data.list;
      setList(response_list);
      toggleError(false);
      if (params !== 'Mykolaiv,UA-48,UK') {
        setCity(result.data.city.name);
      } else {
        setCity('');
      }
    } catch {
      toggleError(true);
    }
  };

  useEffect(() => {
    getInfo('Mykolaiv,UA-48,UK');
  }, []);

  const changeTab = (tab: number) => {
    setTab(tab);
    tab === 2 ? setList([]) : getInfo('Mykolaiv,UA-48,UK');
  };

  const handlerSearch = (event: React.FormEvent) => {
    event.preventDefault();
    getInfo(refSearch.current?.value);
    console.log(refSearch.current?.value);
  };

  return (
    <Card>
      <Card.Body>
        <ButtonGroup aria-label="Basic example">
          <Button
            onClick={() => changeTab(1)}
            variant="secondary"
            className={tab === 1 ? 'active' : ''}
          >
            Миколаїв
          </Button>
          <Button
            onClick={() => changeTab(2)}
            variant="secondary"
            className={tab === 2 ? 'active' : ''}
          >
            Не Миколаїв
          </Button>
        </ButtonGroup>
        {tab === 2 && (
          <Form
            className="d-flex mt-2"
            onSubmit={(event: React.FormEvent) => handlerSearch(event)}
          >
            <Form.Control
              className="mr-2"
              type="text"
              placeholder="Введіть місто"
              ref={refSearch}
            />
            <Button variant="primary" type="submit">
              Знайти
            </Button>
          </Form>
        )}
        {!hasError && city !== '' && (
          <h2 className="text-center mb-0 mt-2">{city}</h2>
        )}
        <WeatherList weather_items={list} />
        {hasError && <p className="text-center mb-0 mt-2">Місто не знайдено</p>}
      </Card.Body>
    </Card>
  );
};

export default WeatherComponent;
