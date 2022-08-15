import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ICurrencyItem, ICurrencyDateItem } from '../types/interfaces';
import { ButtonGroup, Button, Spinner } from 'react-bootstrap';
import CurrencyTable from './tables/CurrencyTable';
import DatePicker from 'react-datepicker';
import { setDefaultLocale, registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import uk from 'date-fns/locale/uk';
import moment from 'moment';

enum tabType {
  today = 'today',
  date = 'for_date',
}

const CurrencyComponent: React.FC = () => {
  const [courses, setCourse] = useState<ICurrencyDateItem[]>([]);
  const [coursesCurrent, setCourseCurrent] = useState<ICurrencyItem[]>([]);
  const [type, setType] = useState<tabType>(tabType.today);
  const [date, setDate] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  registerLocale('uk', uk);
  setDefaultLocale('uk');

  const getData = async (isCurrent?: boolean, date?: string) => {
    try {
      setLoading(true);
      const result = await axios.get(
        !date
          ? `https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`
          : `https://api.privatbank.ua/p24api/exchange_rates?json&date=${date}`
      );
      setLoading(false);
      if (isCurrent) {
        setCourseCurrent(
          result.data.filter((item: ICurrencyItem) => item.base_ccy === 'UAH')
        );
      } else {
        setCourse(result.data.exchangeRate);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(true);
  }, []);

  const handleChange = (e: Date | null) => {
    setDate(moment(e).format('DD.MM.yyyy'));
    getData(false, moment(e).format('DD.MM.yyyy'));
  };

  const changeType = (type: tabType) => {
    setType(type);
  };

  return (
    <>
      <ButtonGroup className="mb-3" aria-label="Basic example">
        <Button
          variant="secondary"
          onClick={() => changeType(tabType.today)}
          className={type === tabType.today ? 'active' : ''}
        >
          Сьогодні
        </Button>
        <Button
          variant="secondary"
          onClick={() => changeType(tabType.date)}
          className={type === tabType.date ? 'active' : ''}
        >
          За дату
        </Button>
      </ButtonGroup>
      {type !== 'today' && (
        <div className="mt-3">
          <DatePicker
            onChange={(e) => handleChange(e)}
            value={date?.toString()}
            maxDate={moment().toDate()}
          />
        </div>
      )}
      {isLoading ? (
        <Spinner animation="border" role="status" />
      ) : (
        <CurrencyTable
          table_items={coursesCurrent}
          table_date_items={courses}
          isDate={type === tabType.date}
        />
      )}
    </>
  );
};

export default CurrencyComponent;
