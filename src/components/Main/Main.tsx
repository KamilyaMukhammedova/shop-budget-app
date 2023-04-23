import React from 'react';
import Table from "../Table/Table";
import data from '../../data.json';

const Main: React.FC = () => {
  return (
    <div>
      <h1>Budget Distribution by Store and Month</h1>
      <Table data={data}/>
    </div>
  );
};

export default Main;