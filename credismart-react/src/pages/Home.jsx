import React from 'react'
import { Hero } from '../components/Hero';
import { credits } from '../data/credits';
import CreditCard from '../components/CreditCard';
import { Link } from 'react-router-dom'


export const Home = () => {

    console.log('Datos de créditos:', credits);
    
    return (
        <>
            <Hero/>

            <section class="beneficios">
                <div class="beneficio-card">
                    <img src="/public/trend.png" class="icono" />
                    <h3>Tasas Competitivas</h3>
                    <p>Las mejores tasas del mercado financiero colombiano</p>
                </div>

                <div class="beneficio-card">
                    <img src="/public/shield.png" class="icono" />
                    <h3>Proceso Seguro</h3>
                    <p>Tecnología de punta para proteger tu información</p>
                </div>

                <div class="beneficio-card">
                    <img src="/public/shield.png" class="icono" />
                    <h3>Aprobación Rápida</h3>
                    <p>Respuesta en menos de 24 horas hábiles</p>
                </div>

                <div class="beneficio-card">
                    <img src="/public/shield.png" class="icono" />
                    <h3>Experiencia</h3>
                    <p>Más de 15 años en el sector financiero</p>
                </div>
            </section>

            <main className='container'>
                <section className='credits-section'>
                    <h2 className='credits-title'>Nuestros Productos Créditos</h2>
                    <p className='crdits-p'>Encuentra la solución financiera que mejor se adapte a tus necesidades y objetivos</p>
            
                    <div className='credits-grid'>
                        {credits.map((credits) => { 
                            return(
                                <CreditCard 
                                    key={credits.id} 
                                    credits={credits} 
                                />
                            );
                        })}
                    </div>
                </section>
            </main>

            <section className='endhero'>
                <div className="container-endhero">
                    <h2>¿Listo para solcitar tu Crédito?</h2>
                    <p>Simula tu crédito hoy mismo y descubre cómo podemos ayudarte a alcanzar tus metas.</p>
                    <div className="endhero-buttons">
                        <Link to="/simulador" className="btn-primary-endhero">
                            Solicitar Ahora
                        </Link> 
                        <Link to="/creditos" className="btn-secondary-endhero">
                            Usar Simulador
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};
