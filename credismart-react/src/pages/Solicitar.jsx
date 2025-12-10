import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const Solicitar = () => {
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const [credits, setCredits] = useState([]);
  const [selectedCredit, setSelectedCredit] = useState(null);

  // ------------------ ESTADOS DEL FORM ------------------
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipo, setTipo] = useState("");
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState("12");
  const [destino, setDestino] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [ingresos, setIngresos] = useState("");
  const [cuota, setCuota] = useState(null);
  const [errors, setErrors] = useState({});

  // ------------------ CARGAR CRÉDITOS ------------------
  useEffect(() => {
    const cargarCredits = async () => {
      try {
        const ref = collection(db, "credits");
        const snap = await getDocs(ref);
        const lista = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCredits(lista);

        // Seleccionar crédito según ID de URL o el primero
        const creditSeleccionado = id ? lista.find(c => c.id === id) : null;
        if (creditSeleccionado) {
          setSelectedCredit(creditSeleccionado);
          setTipo(creditSeleccionado.name);
        }
      } catch (error) {
        console.error("Error cargando créditos:", error);
      }
    };
    cargarCredits();

  }, [id]);

  // ------------------ CALCULAR CUOTA ------------------
  const calcularCuota = () => {
    if (!monto || !plazo || !selectedCredit) return null;
    const tasaEA = selectedCredit.tasaInteres / 100; // tasa anual
    const tasaMensual = Math.pow(1 + tasaEA, 1 / 12) - 1;
    const n = Number(plazo);
    const m = Number(monto);
    const cuotaCalc = (m * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -n));
    return cuotaCalc;
  };

  useEffect(() => {
    setCuota(calcularCuota());
  }, [monto, plazo, selectedCredit]);

  // ------------------ VALIDACIONES ------------------
  const validarCampo = (nombreCampo, valor) => {
    let errorMsg = "";
    if (!valor) errorMsg = "Este campo es obligatorio";
    if (nombreCampo === "email" && valor && !/\S+@\S+\.\S+/.test(valor))
      errorMsg = "Correo inválido";
    if ((nombreCampo === "monto" || nombreCampo === "cedula" || nombreCampo === "telefono") 
        && valor && isNaN(valor))
      errorMsg = "Debe ser numérico";
    setErrors(prev => ({ ...prev, [nombreCampo]: errorMsg }));
  };

  // ------------------ ENVIAR FORMULARIO ------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !cedula || !email || !telefono || !tipo || !monto || !plazo || !destino || !empresa || !cargo || !ingresos) {
      const modal = new window.bootstrap.Modal(document.getElementById("modalError"));
      modal.show();
      return;
    }

    console.log("Formulario enviado:", {
      nombre, cedula, email, telefono, tipo, monto, plazo, destino, empresa, cargo, ingresos
    });

    const modal = new window.bootstrap.Modal(document.getElementById("modalSuccess"));
    modal.show();
  };

  return (
    <div className="container py-3">
      <h2 className='credits-title'>Solicitar Crédito</h2>
      <p>Completa el formulario para solicitar tu crédito. Nuestro equipo evaluará tu solicitud y te contactará en las próximas 24 horas.</p>

      <form onSubmit={handleSubmit}>
        {/* DATOS PERSONALES */}
        <div className="section-box"><i className="bi bi-person"></i> Datos Personales</div>
        <div className="section-content">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Nombre Completo *</label>
              <input type="text" className="form-control" value={nombre} placeholder="Ingresa tu nombre completo"
                onChange={(e) => { setNombre(e.target.value); validarCampo("nombre", e.target.value); }} />
              {errors.nombre && <small className="text-danger">{errors.nombre}</small>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Cédula *</label>
              <input type="number" className="form-control" value={cedula} placeholder="Ingresa tu número de cédula"
                onChange={(e) => { setCedula(e.target.value); validarCampo("cedula", e.target.value); }} />
              {errors.cedula && <small className="text-danger">{errors.cedula}</small>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Correo *</label>
              <input type="email" className="form-control" value={email} placeholder="correo@gmail.com"
                onChange={(e) => { setEmail(e.target.value); validarCampo("email", e.target.value); }} />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Teléfono *</label>
              <input type="number" className="form-control" value={telefono} placeholder="300 1234567"
                onChange={(e) => { setTelefono(e.target.value); validarCampo("telefono", e.target.value); }} />
              {errors.telefono && <small className="text-danger">{errors.telefono}</small>}
            </div>
          </div>
        </div>

        {/* DATOS DEL CRÉDITO */}
        <div className="section-box mt-4"><i className="bi bi-cash-coin"></i> Datos del Crédito</div>
        <div className="section-content">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Tipo de Crédito *</label>
              <select className="form-select" value={tipo} onChange={(e) => {
                setTipo(e.target.value);
                const credit = credits.find(c => c.name === e.target.value);
                setSelectedCredit(credit);
              }}>
                <option value="">Selecciona un crédito</option>
                {credits.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
              {errors.tipo && <small className="text-danger">{errors.tipo}</small>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Monto Solicitado *</label>
              <input type="number" className="form-control" value={monto} placeholder="Ej: 1,000,000"
                onChange={(e) => { setMonto(Number(e.target.value)); validarCampo("monto", e.target.value); }} min={1000000} />
              {errors.monto && <small className="text-danger">{errors.monto}</small>}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Plazo *</label>
              <select className="form-select" value={plazo} onChange={(e) => setPlazo(Number(e.target.value))}>
                {selectedCredit &&
                  Array.from({ length: selectedCredit.maxTiempo / 12 }, (_, i) => (
                    <option key={i} value={(i + 1) * 12}>{(i + 1) * 12} meses</option>
                  ))
                }
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Destino *</label>
              <textarea className="form-control" rows={3} value={destino} placeholder="Describe brevemente el destino del crédito..."
                onChange={(e) => { setDestino(e.target.value); validarCampo("destino", e.target.value); }} />
              {errors.destino && <small className="text-danger">{errors.destino}</small>}
            </div>
          </div>

          {/* SIMULADOR */}
          <div className="simulator-box mt-4">
            <div className="simulator-header"><i className="bi bi-calculator"></i> Calculadora de Cuota Mensual</div>
            <div className="simulator-result">
              <div className="title">Cuota Mensual Estimada</div>
              {cuota ? (
                <>
                  <div className="cuota">${cuota.toLocaleString("es-CO")}</div>
                  <div className="simulator-detail">
                    Producto: <strong>{selectedCredit?.name}</strong><br />
                    Tasa: {selectedCredit?.tasaInteres}% anual<br />
                    Monto: ${monto.toLocaleString("es-CO")}
                  </div>
                </>
              ) : (
                <div className="text-muted">Completa los datos para simular.</div>
              )}
            </div>
            <div className="simulator-note"><strong>Nota:</strong> Este cálculo es solo una simulación.</div>
          </div>
        </div>

        {/* DATOS LABORALES */}
        <div className="section-box mt-4"><i className="bi bi-briefcase"></i> Datos Laborales</div>
        <div className="section-content">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Empresa donde Trabajas *</label>
              <input type="text" className="form-control" value={empresa} placeholder="Nombre de la empresa"
                onChange={(e) => { setEmpresa(e.target.value); validarCampo("empresa", e.target.value); }} />
              {errors.empresa && <small className="text-danger">{errors.empresa}</small>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Cargo *</label>
              <input type="text" className="form-control" value={cargo} placeholder="Tu cargo o profesión"
                onChange={(e) => { setCargo(e.target.value); validarCampo("cargo", e.target.value); }} />
              {errors.cargo && <small className="text-danger">{errors.cargo}</small>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Ingresos Mensuales *</label>
              <input type="number" className="form-control" value={ingresos} placeholder="Ej: 2,000,000"
                onChange={(e) => { setIngresos(e.target.value); validarCampo("ingresos", e.target.value); }} />
              {errors.ingresos && <small className="text-danger">{errors.ingresos}</small>}
            </div>
          </div>
        </div>
        <div className="mt-3">
            <button type="submit" className="btn btn-primary w-100">Enviar Solicitud</button>
          </div>
      </form>

      {/* MODALES */}
      <div className="modal fade" id="modalSuccess" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Solicitud Enviada</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">Tu solicitud fue enviada correctamente. Un asesor te contactará pronto.</div>
            <div className="modal-footer"><button className="btn btn-success" data-bs-dismiss="modal">Aceptar</button></div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modalError" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">Campos incompletos</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">Por favor completa todos los campos antes de continuar.</div>
            <div className="modal-footer"><button className="btn btn-danger" data-bs-dismiss="modal">Entendido</button></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solicitar;
