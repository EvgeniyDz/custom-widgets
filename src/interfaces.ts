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
