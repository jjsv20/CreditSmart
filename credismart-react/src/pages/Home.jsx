import React from 'react'
import { Hero } from '../components/Hero';
import { credits } from '../data/credits';
import CreditCard from '../components/CreditCard';

export const Home = () => {

    console.log('Datos de créditos:', credits);
    
    return (
        <>
            <Hero/>

            <main className='container'>
                <section className='credits-section'>
                    <h2 className='credits-title'>Nuestros Créditos</h2>
            
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
        </>
    );
};
