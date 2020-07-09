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
      style={{ paddingLeft: 0, paddingRight: 0, height: "100%", position: "absolute"}}
    >
      <CssBaseline />
      <Container component="main" maxWidth={maxWidth} style={{ height: "100%"}}>
        {children}
      </Container>
    </Container>
  )
}

export default LayoutTemplate
