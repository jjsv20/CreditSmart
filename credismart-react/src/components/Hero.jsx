import React from 'react'
import { Link } from 'react-router-dom'

export const Hero = () => {
  return (
    <header className="hero">
        <div className="container">
            <h1>
              Encuentra el <span className="highlight">Crédito Perfecto</span> para Ti
            </h1>
            <p>Compara opciones, simula tu crédito y solicita en línea de forma segura</p>
            
             <div className="hero-buttons">
                <Link to="/simulador" className="btn-primary-hero">
                  Simular Crédito
                </Link> 

                <Link to="/creditos" className="btn-secondary-hero">
                  Ver Créditos
                </Link>
              </div>
        </div>
    </header>
  )
}
