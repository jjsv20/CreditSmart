import React from 'react'
import { Hero } from '../components/Hero';
import { credits } from '../data/credits';
import CreditCard from '../components/CreditCard';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';



export const Home = () => {

    console.log('Datos de créditos:', credits);
    
    useEffect(() => {
        const counters = document.querySelectorAll('.stat-number');
        let statsStarted = false;

        function startCounting() {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const speed = 30;
                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }

        const section = document.querySelector('.stats-section');

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && !statsStarted) {
                startCounting();
                statsStarted = true;
            }
        },
        { threshold: 0.5 } 
    );

    if (section) observer.observe(section);

    return () => {
        if (section) observer.unobserve(section);
    };

}, []);

    return (
        <>
            <Hero/>

            <section className="beneficios">
                <div className="beneficio-card">
                    <i className="bi bi-graph-up-arrow icono"></i>
                    <h3>Tasas Competitivas</h3>
                    <p>Las mejores tasas del mercado financiero colombiano</p>
                </div>

                <div className="beneficio-card">
                    <i className="bi bi-shield-check icono"></i>
                    <h3>Proceso Seguro</h3>
                    <p>Tecnología de punta para proteger tu información</p>
                </div>

                <div className="beneficio-card">
                    <i className="bi bi-clock-history icono"></i>
                    <h3>Aprobación Rápida</h3>
                    <p>Respuesta en menos de 24 horas hábiles</p>
                </div>

                <div className="beneficio-card">
                    <i className="bi bi-award icono"></i>
                    <h3>Experiencia</h3>
                    <p>Más de 15 años en el sector financiero</p>
                </div>
            </section>

            <main className='container'>
                <section className='credits-section'>
                    <h2 className='credits-title'>Nuestros Productos Créditos</h2>
                    <p className='crdits-p'>
                        Encuentra la solución financiera que mejor se adapte a tus necesidades y objetivos
                    </p>

                    <div className='credits-grid'>
                        {credits.map((c) => (
                            <CreditCard 
                                key={c.id}
                                credits={c}
                                modo="simple"
                            />
                        ))}
                    </div>
                </section>
            </main>

            
            <section className="stats-section py-5">
                <div className="container-number">
                    <div className="row text-center">

                        <div className="col-md-3 mb-4">
                            <div className="stat-number" data-target="15">10</div>
                                <h5>Años de trayectoria</h5>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="stat-number" data-target="500">0</div>
                                <h5>Clientes</h5>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="stat-number" data-target="6">0</div>
                                <h5>Servicios</h5>      
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="stat-number" data-target="4">0</div>
                                <h5>Sucursales</h5>
                        </div>
                    </div>
                </div>
            </section>

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
