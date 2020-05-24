export interface IWeatherItem {
  dt_txt: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
}

export interface IWeatherListProps {
  weather_items: IWeatherItem[];
}
