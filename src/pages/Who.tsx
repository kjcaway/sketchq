import React from 'react';
import '../App.css';
import LayoutTemplate from '../components/LayoutTemplate';
import SetNameContainer from '../containers/who/SetNameContainer';
import Footer from '../components/Footer';

function Who() {
  return (
    <LayoutTemplate maxWidth='xl'>
      <React.Fragment>
        <SetNameContainer />
        <Footer/>
      </React.Fragment>
    </LayoutTemplate>
  )
}

export default Who
