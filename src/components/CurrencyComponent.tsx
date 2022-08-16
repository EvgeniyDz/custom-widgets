import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { setDefaultLocale, registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import uk from 'date-fns/locale/uk';
import moment from 'moment';

import { ICurrencyItem, ICurrencyDateItem } from '../types/interfaces';
import CurrencyTable from './tables/CurrencyTable';
import { getCurrencyDefaultList, getCurrencyDateList } from '../services/apiCalls';

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

  const getData = async (date?: string) => {
    setLoading(true);
    if (date) {
      const data = await getCurrencyDateList(date);
      setCourse(data?.exchangeRate || []);
    } else {
      const data = await getCurrencyDefaultList();
        setCourseCurrent(
          data ? data.filter((item: ICurrencyItem) => item.base_ccy === 'UAH') : []
        );
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e: Date | null) => {
    setDate(moment(e).format('DD.MM.yyyy'));
    getData(moment(e).format('DD.MM.yyyy'));
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
