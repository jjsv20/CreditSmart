import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const Solicitudes = () => {
    const [emailBusqueda, setEmailBusqueda] = useState("");
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const buscarSolicitudes = async () => {
        if (!emailBusqueda) return setError("Ingresa un correo para buscar");

        try {
            setLoading(true);
            setError("");

            const ref = collection(db, "solicitudes");

            const q = query(
                ref,
                where("email", "==", emailBusqueda),
            );

            const snap = await getDocs(q);

            const lista = snap.docs.map((doc) => ({
                id: doc.id,
                showMore: false,
                ...doc.data(),
            }));
        

            lista.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            setSolicitudes(lista);
        } catch (err) {
            console.error(err);
            setError("Error consultando solicitudes. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const VerMas = (id) => {
        setSolicitudes((prev) =>
            prev.map((s) =>
                s.id === id ? { ...s, showMore: !s.showMore } : s
            )
        );
    };

    return (
        <div className="container py-4">
            <h2 className='credits-title'>Mis Solicitudes</h2>

            <div className="mb-3">
                <label className="form-label">Buscar por correo</label>
                <input
                    className="form-control"
                    type="email"
                    placeholder="correo@gmail.com"
                    value={emailBusqueda}
                    onChange={(e) => setEmailBusqueda(e.target.value)}
                />
            </div>

            <button onClick={buscarSolicitudes} className="btn btn-primary mb-3" disabled={!emailBusqueda}>
                Buscar
            </button>

            {loading && <p>Cargando solicitudes...</p>}
            {error && <p className="text-danger">{error}</p>}

            {solicitudes.length > 0 ? (
                solicitudes.map((s) => (
                <div key={s.id} className="card mb-3 p-3">
                    <h5>{s.tipo}</h5>
                    <p><strong>Monto:</strong> {s.monto}</p>
                    <p><strong>Plazo:</strong> {s.plazo} meses</p>
                    <p><strong>Fecha:</strong> {s.fecha?.toDate().toLocaleString()}</p>
                    <button 
                            className="btn btn-outline-primary mt-2"
                            onClick={() => VerMas(s.id)}
                        >
                            {s.showMore ? "Ver menos" : "Ver más"}
                        </button>

                        {s.showMore && (
                            <div className="mt-3">
                                <p><strong>Nombre:</strong> {s.nombre}</p>
                                <p><strong>Cédula:</strong> {s.cedula}</p>
                                <p><strong>Email:</strong> {s.email}</p>
                                <p><strong>Teléfono:</strong> {s.telefono}</p>
                                <p><strong>Destino:</strong> {s.destino}</p>
                                <p><strong>Empresa:</strong> {s.empresa}</p>
                                <p><strong>Cargo:</strong> {s.cargo}</p>
                                <p><strong>Ingresos:</strong> {Intl.NumberFormat("es-CO").format(s.ingresos)} COP</p>
                                <p><strong>Cuota estimada:</strong> {Intl.NumberFormat("es-CO").format(s.cuota)} COP</p>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                !loading && <p>No hay solicitudes para mostrar</p>
            )}
        </div>
    );
};

export default Solicitudes;
