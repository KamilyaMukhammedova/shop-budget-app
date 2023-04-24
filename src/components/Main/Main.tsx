import React, { Component } from 'react';
import Table from "../Table/Table";
import data from '../../data.json';
import styled from 'styled-components';

const MainContainer = styled.div`
  max-width: 95%;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #22313f;
`;

class Main extends Component {
  render() {
    return (
      <MainContainer>
        <Title>Budget Distribution by Store and Month</Title>
        <Table mockData={data}/>
      </MainContainer>
    );
  }
}

export default Main;