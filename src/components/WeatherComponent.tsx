import React, { useEffect, useState, useRef } from 'react';
import { Card, ButtonGroup, Button, Form, Spinner } from 'react-bootstrap';

import WeatherList from './lists/WeatherList';
import { IWeatherItem } from '../types/interfaces';
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
  const getInfo = async (params: string | undefined): Promise<void> => {
    resetData();
    const data = await getWeatherList(params);
    setLoading(false);
    if (!data) {
      toggleError(true);
      return;
    }
    if (params !== 'Mykolaiv,UA-48,UK') {
      setList(data.list);
      setCity(data.city.name);
    } else {
      setCity('');
      setListDefault(data.list);
    }
  };

  useEffect(() => {
    getInfo('Mykolaiv,UA-48,UK');
  }, []);

  const changeTab = (tab: number) => {
    setTab(tab);
    if (tab === 2) setList([]);
  };

  const handlerSearch = (event: React.FormEvent) => {
    event.preventDefault();
    getInfo(refSearch.current?.value);
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
              {isLoading ? (
        <Spinner data-testid="weather-loader" animation="border" role="status" style={{ display: 'block' }} className='mt-2' />
      ) : (
        <WeatherList weather_items={tab === 2 ? list : listDefault} />
      )}
        
        {hasError && <p className="text-center mb-0 mt-2">Місто не знайдено</p>}
      </Card.Body>
    </Card>
  );
};

export default WeatherComponent;
