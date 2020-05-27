import React from 'react';
import { Table } from 'react-bootstrap';
import { ICurrencyTableProps } from '../../interfaces';

const CurrencyTable: React.FC<ICurrencyTableProps> = ({ table_items }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Валюта</th>
          <th>Покупка</th>
          <th>Продажа</th>
        </tr>
      </thead>
      <tbody>
        {table_items.map((item) => {
          return (
            <tr key={item.ccy}>
              <td>{item.ccy}</td>
              <td>{item.buy}</td>
              <td>{item.sale}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default CurrencyTable;
