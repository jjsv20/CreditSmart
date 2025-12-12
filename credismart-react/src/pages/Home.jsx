import { Hero } from '../components/Hero';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import  CreditCard  from '../components/CreditCard';
import { Link } from 'react-router-dom'




export const Home = () => {

    //console.log('Datos de créditos:', credits);

    const [credits, setCredits] = useState([]);

    useEffect(() => { 
       const cargarCredits = async () => {
      try {
        console.log("Cargando créditos...");
        const ref = collection(db, "credits");
        const snap = await getDocs(ref);

        const lista = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("Créditos encontrados:", lista);

        setCredits(lista);

      } catch (error) {
        console.error("Error cargando créditos:", error);
      }
    };

    cargarCredits();
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
