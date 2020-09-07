import React from 'react';
import '../App.css';
import LayoutTemplate from '../components/LayoutTemplate';
import Intro from '../containers/main/Intro';
import Footer from '../components/Footer';
import Base from '../containers/Base';

function Main() {
  return (
    <LayoutTemplate maxWidth='xl'>
      <React.Fragment>
        <Intro />
        <Footer/>
        <Base />
      </React.Fragment>
    </LayoutTemplate>
  )
}

export default Main
