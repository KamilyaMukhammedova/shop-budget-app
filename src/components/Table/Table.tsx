import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { MonthData, TableData, TableDataExpanded, TableInput, TotalMonths } from '../../types';
import styled from 'styled-components';

interface IProps {
  mockData: TableData[];
}

const TableContainer = styled.table`
  border-collapse: collapse;
  margin: 0 auto;
  table-layout: fixed;
  position: relative;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 15px 8px;
  text-align: left;
  color: #8dc6ff;
  background: #e4f1fe;
  position: sticky;
  top: 0;
  text-transform: uppercase;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
`;

const TableContent = styled.td<TableInput>`
  border: 1px solid #ddd;
  padding: 15px 8px;
  color: ${props => props.color};
  font-weight: ${props => props.weight};
  background-color: ${props => props.backgroundColor};
`;

const BottomTr = styled.tr`
  position: sticky;
  bottom: 0;
  font-size: 18px;
`;

const BudgetInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
`;

const Table: React.FC<IProps> = ({mockData}) => {
  const [totalOfTotalsSum, setTotalOfTotalsSum] = useState(0);
  const [storesData, setStoresData] = useState<TableDataExpanded[]>([]);
  const [totalMonthsSum, setTotalMonthsSum] = useState<TotalMonths>({});

  useEffect(() => {
    const data = mockData.map(store => {
      return {
        ...store,
        totalInShop: store.months.reduce((acc, month) => acc + month.value, 0),
      }
    });

    const totalOfTotalsSum = data.reduce((acc, store) => acc + store.totalInShop, 0);

    const monthsInitialObj = {
      JAN: 0,
      FEB: 0,
      MAR: 0,
      APR: 0,
      MAY: 0,
      JUN: 0,
      JUL: 0,
      AUG: 0,
      SEP: 0,
      OCT: 0,
      NOV: 0,
      DEC: 0
    };

    Object.keys(monthsInitialObj).forEach(month => {
      const monthsArray: MonthData[] = [];
      data.forEach(store => {
        const targetMonth = store.months.find(storeMonth => storeMonth.name === month);
        if (targetMonth) {
          monthsArray.push(targetMonth);
        }
      });
      monthsInitialObj[month as keyof typeof monthsInitialObj] =
        monthsArray.reduce((acc, month) => acc + month.value, 0)
      ;
    });

    setStoresData(data);
    setTotalMonthsSum(monthsInitialObj);
    setTotalOfTotalsSum(totalOfTotalsSum);
  }, [mockData]);

  const onBudgetChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, storeIndex: number, monthIndex: number) => {
    const storesDataCopy = storesData.map((store, sIndex) => {
      return {
        ...store,
        months: store.months.map((month, mIndex) => {
          if (sIndex === storeIndex && mIndex === monthIndex) {
            return {
              ...month,
              value: +event.target.value
            }
          }

          return month;
        })
      };
    });

    setStoresData(storesDataCopy);
  }, [storesData]);

  const onBlur = useCallback((event: React.FocusEvent<HTMLInputElement>, storeIndex: number) => {
    const storesDataCopy = storesData.map((store, sIndex) => {
      if (sIndex === storeIndex) {
        return {
          ...store,
          totalInShop: store.months.reduce((acc, month) => acc + month.value, 0)
        };
      }

      return store;
    });

    setStoresData(storesDataCopy);

    const totalOfTotalsSum = storesDataCopy.reduce((acc, store) => acc + store.totalInShop, 0);

    setTotalOfTotalsSum(totalOfTotalsSum);

    let monthsSum = 0;

    storesDataCopy.forEach(store => {
      const targetMonth = store.months.find(month => month.name === event.target.name);
      if (targetMonth) {
        monthsSum += targetMonth.value;
      }
    });

    setTotalMonthsSum(prevState => {
      return {
        ...prevState,
        [event.target.name]: monthsSum
      }
    });
  }, [storesData]);

  const renderHeader = useMemo(() => {
    return (
      <tr>
        <TableHeader>Store name</TableHeader>
        {mockData[0].months.map((month) => (
          <TableHeader key={month.id}>{month.name}</TableHeader>
        ))}
        <TableHeader>Total</TableHeader>
      </tr>
    );
  }, [mockData]);

  const renderRows = () => {
    return mockData.map((store, storeIndex) => (
      <tr key={store.store.id}>
        <TableContent color={'#8dc6ff'}>{store.store.name}</TableContent>
        {store.months.map((month, monthIndex) => (
          <TableContent key={month.id}>
            <BudgetInput
              type="number"
              min={0}
              value={storesData[storeIndex].months[monthIndex].value}
              name={month.name}
              onChange={(event) => onBudgetChange(event, storeIndex, monthIndex)}
              onBlur={(event) => onBlur(event, storeIndex)}
            />
          </TableContent>
        ))}
        <TableContent color={'#8dc6ff'}>{storesData[storeIndex].totalInShop}</TableContent>
      </tr>
    ));
  };

  const renderTotalRow = useMemo(() => {
    return (
      <BottomTr>
        <TableContent color={'#e4f1fe'} backgroundColor={'#34495e'}>
          Total Month
        </TableContent>
        {mockData[0].months.map((month) => (
          <TableContent key={'total' + month.name} color={'#e4f1fe'} backgroundColor={'#34495e'}>
            {totalMonthsSum[month.name as keyof typeof totalMonthsSum]}
          </TableContent>
        ))}
        <TableContent color={'#00fff5'} weight={'bold'} backgroundColor={'#34495e'}>
          {totalOfTotalsSum}
        </TableContent>
      </BottomTr>
    );
  }, [totalOfTotalsSum, totalMonthsSum, mockData]);

  return (
    <TableContainer>
      <thead>{renderHeader}</thead>
      <tbody>
      {storesData.length > 0 && renderRows()}
      {renderTotalRow}
      </tbody>
    </TableContainer>
  );
};

export default Table;

