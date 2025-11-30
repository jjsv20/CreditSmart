import React from 'react'
import { credits } from '../data/credits';
import CreditCard from '../components/CreditCard';

const Simulador = () => {

    const [busqueda, setBusqueda] = React.useState('');
    const [filtroMonto, setFiltroMonto] = React.useState('');
    const [filtroTasa, setFiltroTasa] = React.useState('');

    const creditosFiltrados = credits.filter(c => {
      
      const nombresCoinciden = c.name.toLowerCase().includes(busqueda.toLowerCase());
      let montoCoincide = true;

      if (filtroMonto === '1') {
        montoCoincide = c.montoMax <= 10000000;
      } else if (filtroMonto === '2') {
        montoCoincide = c.montoMax <= 50000000;
      } else if (filtroMonto === '3') {
        montoCoincide = c.montoMax <= 200000000;
      }


      return nombresCoinciden && montoCoincide;
    })
    .sort((a, b) => {
      if (filtroTasa === 'asc') return a.tasaInteres - b.tasaInteres;
      if (filtroTasa === 'desc') return b.tasaInteres - a.tasaInteres;
      return 0;
    });
  
  return (
    <>
      <main className='container'>
        <section className='credits-section'>
          <h2 className='credits-title'>Catálogo de Créditos</h2>
          
            <div class="row mb-4">
              <div class="col-md-6">
                <input type="text" 
                  class="form-control" 
                  placeholder="Buscar crédito por nombre" 
                  value={busqueda} onChange={(e) => setBusqueda(e.target.value)}>
                </input>
              </div>

              <div class="col-md-4">
                <select class="form-select"
                  value={filtroMonto}
                  onChange={(e) => setFiltroMonto(e.target.value)}
                >
                  <option value="">Filtrar por monto</option>
                  <option value="1">Hasta $10.000.000</option>
                  <option value="2">Hasta $50.000.000</option>
                  <option value="3">Hasta $200.000.000</option>
                </select>
              </div>

              <div class="col-md-4">
                <select class="form-select"
                    value={filtroTasa}
                    onChange={(e) => setFiltroTasa(e.target.value)}
                  >
                  <option value="">Filtrar por tasa de interes</option>
                  <option value="asc">Tasa: menor a mayor</option>
                  <option value="desc">Tasa: mayor a menor</option>
                </select>
              </div>
          </div>

          <div className="credits-grid">
            {creditosFiltrados.length > 0 ? (
              creditosFiltrados.map((c) => (
                <CreditCard key={c.id} credits={c} />
              ))
            ) : (
              <p className="text-center mt-4 fs-5 fw-bold text-danger">
                No hay créditos disponibles.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default Simulador;

