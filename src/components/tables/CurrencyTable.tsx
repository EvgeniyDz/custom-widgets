import React from 'react';
import { Table } from 'react-bootstrap';
import { ICurrencyTableProps, ICurrencyDateItem } from '../../types/interfaces';

const CurrencyTable: React.FC<ICurrencyTableProps> = ({
  table_items,
  table_date_items,
  isDate,
}) => {
  const renderDateItems = (items: ICurrencyDateItem[]) => {
    const result = items.filter((el: ICurrencyDateItem) => {
      return el.purchaseRate && el.saleRate && el.currency;
    });
    return result;
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Валюта</th>
          <th>Купівля</th>
          <th>Продаж</th>
        </tr>
      </thead>
      <tbody>
        {!isDate
          ? table_items.map((item) => {
              return (
                <tr key={item.ccy}>
                  <td>{item.ccy}</td>
                  <td>{item.buy}</td>
                  <td>{item.sale}</td>
                </tr>
              );
            })
          : renderDateItems(table_date_items).map((item: ICurrencyDateItem) => {
              return (
                <tr key={item.currency}>
                  <td>{item.currency}</td>
                  <td>{item.purchaseRate || '-'}</td>
                  <td>{item.saleRate || '-'}</td>
                </tr>
              );
            })}
      </tbody>
    </Table>
  );
};

export default CurrencyTable;
