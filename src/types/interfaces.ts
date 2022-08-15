export interface IWeatherItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  weather: [
    {
      description: string;
      main: string;
      id: number;
      icon: string;
    }
  ];
}
export interface IWeatherListProps {
  weather_items: IWeatherItem[];
}
export interface IWeatherResponse {
  list: IWeatherItem[];
  city: {
    name: string;
  };
}

export interface ICurrencyItem {
  base_ccy: string;
  ccy: string;
  buy: string;
  sale: string;
}
export interface ICurrencyDateItem {
  purchaseRate: string;
  saleRate: string;
  currency: string;
}
export interface ICurrencyTableProps {
  table_items: ICurrencyItem[];
  table_date_items: ICurrencyDateItem[];
  isDate: boolean;
}
