import React from 'react'
import { Link } from 'react-router-dom'

export const Hero = () => {
  return (
    <header className="hero">
        <div className="container">
            <h1>Bienvenido a CreditSmart</h1>
            <p>La manera más fácil y rápida de simular y solicitar tus créditos.</p>
            <Link href="simulador.html" class="btn-hero">Comenzar</Link>
        </div>
    </header>
  )
}
