import React from 'react';

import { Container } from './styles';

const Calendar: React.FC = ( props:any ) => {
  return <Container>{ props.children}</Container>;;
}

export default Calendar;