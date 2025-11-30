import React from 'react'

const CreditCard = ({credits}) => {
    
    const {
        name,
        description,
        montoMin,
        montoMax,
        tasaInteres,
        maxTiempo,
        requirements,
        icon,
    }   = credits;
    
    return (
        <div className='credit-card'>
            <div className='card-header'>
                <span className='icon'>{icon}</span>
                <h4>{name}</h4>
            </div>

            <p className='description'>{description}</p>

            <div className='details'>
                <div className='detail-item'>
                    <span className='label'>Taza de Interes:</span>
                    <span className='value'>{tasaInteres} % mensual</span>
                </div>

                <div className='detail-item'>
                    <span className='label'>Monto:</span>
                    <span className='value'>
                        {formtCurrency(montoMin) - formtCurrency(montoMax)}
                    </span>
                </div>

                <div className='detail-item'>
                    <span className='label'>Plazo:</span>
                    <span className='value'>Hats {maxTiempo} meses.</span>
                </div>
            </div>

            <button className='btn-primary'>Solicitar Ahora</button>
        </div>
    )
}

export default CreditCard