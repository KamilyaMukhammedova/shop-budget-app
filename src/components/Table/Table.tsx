import React, {useEffect, useState} from 'react';
import {StoreData, TableData} from '../../../types';
import styled from 'styled-components';

interface Budget {
  store: StoreData;
  months: {
    name: string,
    value: number
  }[],
  totalInShop: number
}

interface IProps {
  data: TableData[];
}

const TableContainer = styled.table`
  border-collapse: collapse;
  max-width: 80%;
  margin: 0 auto;
  table-layout: fixed;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 15px 8px;
  text-align: left;
  color: red;
`;

const TableContent = styled.td<{ color?: string, weight?: string }>`
  border: 1px solid #ddd;
  padding: 15px 8px;
  color: ${props => props.color};
  font-weight: ${props => props.weight};
`;

const BudgetInput = styled.input`
  border: none;
  width: 100%;
`;

const Table: React.FC<IProps> = ({data}) => {
  const createBudgetState = () => {
    return data.map(item => {
      return {
        ...item,
        months: item.months.map(month => {
          return {
            name: month.id,
            value: month.value
          }
        }),
        totalInShop: 0
      }
    });
  };

  const [totalOfTotals, setTotalOfTotals] = useState(0);
  const [budget, setBudget] = useState<Budget[]>([]);

  useEffect(() => {
    setBudget(createBudgetState());
  }, []);

  const renderHeader = () => {
    return (
      <tr>
        <TableHeader>Store</TableHeader>
        {data[0].months.map((month) => (
          <TableHeader key={month.id}>{month.name}</TableHeader>
        ))}
        <TableHeader>Total in shop</TableHeader>
      </tr>
    );
  };

  const renderRows = () => {
    return data.map((store, storeIndex) => (
      <tr key={store.store.id}>
        <TableContent color={'green'}>{store.store.name}</TableContent>
        {store.months.map((month, index) => (
          <TableContent key={month.id}>
            <BudgetInput type="number" value={budget[storeIndex].months[index].value}/>
          </TableContent>
        ))}
        <TableContent color={'red'}>total 0</TableContent>
      </tr>
    ));
  };

  const renderTotalRow = () => {
    return (
      <tr>
        <TableContent color={'red'}>Total Month</TableContent>
        {data[0].months.map((month) => (
          <TableContent key={'total' + month.id} color={'red'}>0</TableContent>
        ))}
        <TableContent color={'red'} weight={'bold'}>total of totals</TableContent>
      </tr>
    );
  };

  return (
    <TableContainer>
      <thead>{renderHeader()}</thead>
      <tbody>
      {budget && renderRows()}
      {renderTotalRow()}
      </tbody>
    </TableContainer>
  );
};

export default Table;
