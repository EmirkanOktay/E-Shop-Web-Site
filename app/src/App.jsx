import { useState } from 'react'
import './App.css'
import { Container } from '@mui/joy'
import Header from './compenents/Header'
import RouterConfing from './Config/RouterConfing'
import Loading from './compenents/Loading'


function App() {
  return (
    <div>
      <Container>
        <Header />
        <RouterConfing />
        <Loading />
      </Container>
    </div>
  )
}

export default App
