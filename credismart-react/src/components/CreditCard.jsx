import React from 'react'
import { Link } from 'react-router-dom';

const CreditCard = ({ credits, modo = "simple" }) => {
    const { 
        id, name, description, montoMin, montoMax, 
        tasaInteres, maxTiempo, icon 
    } = credits;

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
                <p className='description'>
                    {modo === "simple" ? description.slice(0, 70) + "..." : description}
                </p>

                {modo === "completo" && (
                <div className='details'>
                    <div className='detail-item'>
                        <span className='label'>Tasa de Interés:</span>
                        <span className='value'>{tasaInteres} % mensual</span>
                    </div>

                    <div className='detail-item'>
                        <span className='label'>Monto:</span>
                        <span className='value'>
                            {formatCurrency(montoMin)} - {formatCurrency(montoMax)}
                        </span>
                    </div>

                    <div className='detail-item'>
                        <span className='label'>Plazo:</span>
                        <span className='value'>Hasta {maxTiempo} meses</span>
                    </div>
                </div>
            )}

            <Link to={'/solicitar/${id}'} className="btn-primary">
                Solicitar Ahora
            </Link>
        </div>
    </div>
  );
};

export default CreditCard;
