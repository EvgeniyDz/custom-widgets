import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, ButtonGroup, Button, Form } from 'react-bootstrap';
import WeatherList from './lists/WeatherList';
import { IWeatherItem } from '../interfaces';

const WeatherComponent: React.FC = () => {
  const [list, setList] = useState<IWeatherItem[]>([]);
  const [tab, setTab] = useState<number>(1);
  const [hasError, toggleError] = useState<boolean>(false);
  const [city, setCity] = useState<string>('');

  const refSearch = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getInfo('Mykolaiv,UA-48,UK');
  }, []);

  const getInfo = (params: string | undefined): void => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${params}&units=metric&lang=ru&appid=7d5164d60100fac02928c705e0d31cb6`
      )
      .then((response) => {
        console.log(response);
        const response_list: IWeatherItem[] = response.data.list;
        setList(response_list);
        toggleError(false);
        if (params !== 'Mykolaiv,UA-48,UK') {
          setCity(response.data.city.name);
        } else {
          setCity('');
        }
      })
      .catch((error) => {
        if (error.message === 'Request failed with status code 404') {
          toggleError(true);
        }
      });
  };

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
            Николаев
          </Button>
          <Button
            onClick={() => changeTab(2)}
            variant="secondary"
            className={tab === 2 ? 'active' : ''}
          >
            Не Николаев
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
              placeholder="Введите город"
              ref={refSearch}
            />
            <Button variant="primary" type="submit">
              Найти
            </Button>
          </Form>
        )}
        {!hasError && city !== '' && (
          <h2 className="text-center mb-0 mt-2">{city}</h2>
        )}
        <WeatherList weather_items={list} />
        {hasError && <p className="text-center mb-0 mt-2">Город не найден</p>}
      </Card.Body>
    </Card>
  );
};

export default WeatherComponent;
