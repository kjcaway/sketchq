import React, { ReactChild } from 'react'
import { Container, CssBaseline } from '@material-ui/core';


interface Props {
  children: ReactChild,
  maxWidth: "xs" | "sm" | "md" | "lg" | "xl"
}

const LayoutTemplate = ({ children, maxWidth }: Props) => {
  return (
    <Container
      maxWidth="xl"
      style={{ paddingLeft: 0, paddingRight: 0}}
    >
      <CssBaseline />
      <React.Fragment>
        {children}
      </React.Fragment>
    </Container>
  )
}

export default LayoutTemplate
