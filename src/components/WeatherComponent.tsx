import React, { useEffect, useState, useRef } from 'react';
import { Card, ButtonGroup, Button, Form, Spinner } from 'react-bootstrap';

import WeatherList from './lists/WeatherList';
import { IWeatherItem, IWeatherResponse } from '../types/interfaces';
import { getWeatherList } from '../services/apiCalls';

const WeatherComponent: React.FC = () => {
  const [list, setList] = useState<IWeatherItem[]>([]);
  const [listDefault, setListDefault] = useState<IWeatherItem[]>([]);
  const [tab, setTab] = useState<number>(1);
  const [hasError, toggleError] = useState<boolean>(false);
  const [city, setCity] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  const refSearch = useRef<HTMLInputElement>(null);

  const resetData = (): void => {
    setLoading(true);
    toggleError(false);
    setListDefault([]);
    setList([]);
    setCity('');
  };
  const getInfo = async (params: string | undefined): Promise<IWeatherResponse | null> => {
    const data = await getWeatherList(params);
    return data;
  };

  useEffect(() => {
    let isCanceled = false;
    const getData = async () => {
      if (!isCanceled) resetData();
      const data = await getInfo('Mykolaiv,UA-48,UK');
      if (!isCanceled) {
        setLoading(false);
        if (!data) {
          toggleError(true);
          return;
        }
        setCity('');
        setListDefault(data.list);
      }
    }
    getData();
    return (() => {
      isCanceled = true;
    });
  }, []);

  const changeTab = (tab: number) => {
    setTab(tab);
    setCity('');
    if (tab === 2) setList([]);
  };

  const handlerSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    toggleError(false);
    const data = await getInfo(refSearch.current?.value);
    setLoading(false);
    if (!data) {
      toggleError(true);
      return;
    }
    setList(data.list);
    setCity(data.city.name);
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
            data-testid="form-btn"
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
              data-testid="weather-input"
            />
            <Button variant="primary" type="submit" data-testid="search-btn">
              Знайти
            </Button>
          </Form>
        )}
        {!hasError && city !== '' && (
          <h2 className="text-center mb-0 mt-2" data-testid="city-title">{city}</h2>
        )}
        {isLoading ? (
          <Spinner data-testid="weather-loader" animation="border" role="status" style={{ display: 'block' }} className='mt-2' />
        ) : (
          !hasError && <WeatherList weather_items={tab === 2 ? list : listDefault} />
        )}
        
        {hasError && <p className="text-center mb-0 mt-2" data-testid="error-message">Місто не знайдено</p>}
      </Card.Body>
    </Card>
  );
};

export default WeatherComponent;
