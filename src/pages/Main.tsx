import React from 'react';
import '../App.css';
import LayoutTemplate from '../components/LayoutTemplate';
import Intro from '../containers/main/Intro';
import Footer from '../components/Footer';

function Main() {
  return (
    <LayoutTemplate maxWidth='xl'>
      <React.Fragment>
        <Intro />
        <Footer/>
      </React.Fragment>
    </LayoutTemplate>
  )
}

export default Main
