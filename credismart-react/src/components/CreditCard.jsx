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

    const formatCurrency = (value) =>
    new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(value);

    return (
        <div className='credit-card'>
            <span className='credit-card-image'>
                <img src={icon} alt={name}/>
            </span>
                <div className='credit-card-content'>
                    <h3>{name}</h3>
                    <p className='description'>{description}</p>

                    <div className='details'>
                        <div className='detail-item'>
                            <span className='label'>Tasa de Interés:</span>
                            <span className='value'>{tasaInteres} % mensual</span>
                        </div>

                    <div className='detail-item'>
                        <span className='label'>Monto:</span>
                        <span className='value'>{formatCurrency(montoMin)} - {formatCurrency(montoMax)}</span>
                    </div>

                    <div className='detail-item'>
                        <span className='label'>Plazo:</span>
                        <span className='value'>Hasta {maxTiempo} meses</span>
                    </div>
                </div>

                <button className='btn-primary'>Solicitar Ahora</button>
            </div>
        </div>
    )
}

export default CreditCard;