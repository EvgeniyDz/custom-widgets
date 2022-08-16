export const weatherResponse = { 
    data: {
        list: {
            dt: 1660651200,
            dt_txt: "2022-08-16 12:00:00",
            wind: {
                deg: 202,
                gust: 4.72,
                speed: 5.57
            },
            weather: [
                {
                    description: "уривчасті хмари",
                    icon: "03d",
                    id: 802,
                    main: "Clouds"
                }
            ],
            main: {
                feels_like: 29.06,
                grnd_level: 1006,
                humidity: 43,
                pressure: 1008,
                sea_level: 1008,
                temp: 29.16,
                temp_kf: -1.04,
                temp_max: 30.2,
                temp_min: 29.16
            }
        },
        city: {
            name: 'test'
        }
    }
};

export const currencyDefaultResponse = { 
    data: [
        {
            ccy: "USD",
            base_ccy: "UAH",
            buy: "38.80000",
            sale: "39.10000"
        },
        {
            ccy: "EUR",
            base_ccy: "UAH",
            buy: "39.80000",
            sale: "40.80000"
        },
        {
            ccy: "BTC",
            base_ccy: "USD",
            buy: "22554.4686",
            sale: "24928.6232"
        }
    ]
};

export const currencyDateResponse = { 
    data: { 
        exchangeRate: [
            {
                baseCurrency: "UAH",
                currency: "AZN",
                purchaseRateNB: 21.568,
                saleRateNB: 21.568
            }, 
            {
                baseCurrency: "UAH",
                currency: "BYN",
                purchaseRateNB: 13.2919,
                saleRateNB: 13.2919,
            },
            {
                baseCurrency: "UAH",
                currency: "CAD",
                purchaseRateNB: 28.4647,
                saleRateNB: 28.4647
            }
        ]
    }
};