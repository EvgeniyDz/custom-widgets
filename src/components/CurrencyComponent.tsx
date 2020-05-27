import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ICurrencyItem } from '../interfaces';
import { ButtonGroup, Button } from 'react-bootstrap';
import CurrencyTable from './tables/CurrencyTable';
import DatePicker from 'react-datepicker';
import { setDefaultLocale, registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import moment from 'moment';

const CurrencyComponent: React.FC = () => {
  const [courses, setCourse] = useState<ICurrencyItem[]>([]);
  const [type, setType] = useState<string>('today');

  registerLocale('ru', ru);
  setDefaultLocale('ru');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
      .then((response) => {
        console.log(response);
        setCourse(
          response.data.filter((item: ICurrencyItem) => item.base_ccy === 'UAH')
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = () => {
    console.log('huy');
  };

  const changeType = (type: string) => {
    setType(type);
    type !== 'today' ? setCourse([]) : getData();
  };

  return (
    <>
      <ButtonGroup className="mb-3" aria-label="Basic example">
        <Button
          variant="secondary"
          onClick={() => changeType('today')}
          className={type === 'today' ? 'active' : ''}
        >
          Сегодня
        </Button>
        <Button
          variant="secondary"
          onClick={() => changeType('for_date')}
          className={type === 'for_date' ? 'active' : ''}
        >
          За дату
        </Button>
        <Button
          variant="secondary"
          onClick={() => changeType('mean')}
          className={type === 'mean' ? 'active' : ''}
        >
          Средний за месяц
        </Button>
      </ButtonGroup>
      {type !== 'today' && (
        <div className="mt-3">
          <DatePicker onChange={handleChange} />
        </div>
      )}
      <CurrencyTable table_items={courses} />
    </>
  );
};

export default CurrencyComponent;
