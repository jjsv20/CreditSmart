import React, { useState, useEffect } from "react";

const Solcitar = () => {
  // ------------------ ESTADOS ------------------
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

  // Estados para Validaciones
  const [errors, setErrors] = useState({});

  // Lista en memoria
  const [solicitudes, setSolicitudes] = useState([]);

  const [mensaje, setMensaje] = useState("");


  const tasas = {
    "Crédito Libre Inversión": 0.012,
    "Crédito Vehículo": 0.0095,
    "Crédito Vivienda": 0.0075,
    "Crédito Educativo": 0.0085,
    "Crédito Empresarial": 0.011,
    "Crédito para Viajes": 0.013,
  };


  // --------- VALIDACIONES ---------
  const validarCampo = (nombreCampo, valor) => {
    let errorMsg = "";

    if (!valor) errorMsg = "Este campo es obligatorio";
    if (nombreCampo === "email" && valor && !/\S+@\S+\.\S+/.test(valor))
      errorMsg = "Correo inválido";
    if ((nombreCampo === "monto" || nombreCampo === "cedula" || nombreCampo === "telefono") 
        && valor && isNaN(valor))
      errorMsg = "Debe ser numérico";

    setErrors((prev) => ({ ...prev, [nombreCampo]: errorMsg }));
  };


  // --------- Cálculo Automático ---------
  useEffect(() => {
    if (tipo && monto >= 1000000 && plazo) {
      const tasaEA = tasas[tipo];
      const tasaMensual = Math.pow(1 + tasaEA, 1 / 12) - 1;

      const cuotaCalc =
        (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));

      setCuota(cuotaCalc);
    } else {
      setCuota(null);
    }
  }, [tipo, monto, plazo]);

  const showModal = (id) => {
    const modalEl = document.getElementById(id);
    if (!modalEl) return;

    const modal = new window.bootstrap.Modal(modalEl);
    modal.show();
  };

  // --------- ENVIAR FORMULARIO ---------
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que todo esté lleno
    if (!nombre || !cedula || !email || !telefono || !tipo || !monto || !plazo || !destino || !empresa || !cargo || !ingresos) {
       const modal = new window.bootstrap.Modal(document.getElementById("modalError"));
      modal.show();
      return;
    }

    // Crear solicitud nueva
    const nuevaSolicitud = {
      id: Date.now(),
      nombre,
      cedula,
      email,
      telefono,
      tipo,
      monto,
      plazo,
      destino,
      cuota,
      empresa,
      cargo,
      ingresos,
    };

    // Guardar en array en memoria
    setSolicitudes([...solicitudes, nuevaSolicitud]);

    // Mensaje de éxito
    showModal("modalSuccess");

    // Limpiar el formulario
    setNombre("");
    setCedula("");
    setEmail("");
    setTelefono("");
    setTipo("");
    setMonto("");
    setPlazo("12");
    setDestino("");
    setCuota(null);
    setCargo("");
    setEmpresa("");
    setIngresos("");
    setErrors({});

    // Ocultar mensaje después de 3s
    setTimeout(() => setMensaje(""), 3000);
  };


  return (
    <div className="container py-3">
      <h2 className='credits-title'>Solicitar Crédito</h2>
      <p>Completa el formulario para solicitar tu crédito. Nuestro equipo evaluará tu solicitud y te contactará en las próximas 24 horas.</p>

      {/* Toda la forma está ENCERRADA en este form */}
      <form onSubmit={handleSubmit}>

        {/*  DATOS PERSONALES  */}
        <div className="section-box">
          <i className="bi bi-person"></i> Datos Personales
        </div>

        <div className="section-content">
            <div className="row">
              
              {/* Nombre */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Nombre Completo *</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  placeholder="Ingresa tu nombre completo"
                  onChange={(e) => {
                    setNombre(e.target.value);
                    validarCampo("nombre", e.target.value);
                  }}
                />
                {errors.nombre && <small className="text-danger">{errors.nombre}</small>}
              </div>

              {/* Cedula */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Cédula *</label>
                <input
                  type="number"
                  className="form-control"
                  value={cedula}
                  placeholder="Ingresa tu número de cédula"
                  onChange={(e) => {
                    setCedula(e.target.value);
                    validarCampo("cedula", e.target.value);
                  }}
                />
                {errors.cedula && <small className="text-danger">{errors.cedula}</small>}
              </div>

              {/* Email */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Correo *</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  placeholder="correo@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validarCampo("email", e.target.value);
                  }}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>

              {/* Teléfono */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Teléfono *</label>
                <input
                  type="number"
                  className="form-control"
                  value={telefono}
                  placeholder="300 1234567"
                  onChange={(e) => {
                    setTelefono(e.target.value);
                    validarCampo("telefono", e.target.value);
                  }}
                />
                {errors.telefono && <small className="text-danger">{errors.telefono}</small>}
              </div>
            </div>
        </div>
          
        {/*  DATOS DEL CRÉDITO  */}
        <div className="section-box mt-4">
          <i className="bi bi-cash-coin"></i> Datos del Crédito
        </div>

        <div className="section-content">
          <div className="row">
            {/* Tipo */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Tipo de Crédito *</label>
              <select
                className="form-select"
                value={tipo}
                onChange={(e) => {
                  setTipo(e.target.value);
                  validarCampo("tipo", e.target.value);
                }}
              >
                <option value="">Seleccione…</option>
                <option>Crédito Libre Inversión</option>
                <option>Crédito Vehículo</option>
                <option>Crédito Vivienda</option>
                <option>Crédito Educativo</option>
                <option>Crédito Empresarial</option>
                <option>Crédito Viajes</option>
              </select>
              {errors.tipo && <small className="text-danger">{errors.tipo}</small>}
            </div>

            {/* Monto */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Monto Solicitado *</label>
              <input
                type="number"
                className="form-control"
                value={monto}
                placeholder="Ej: 1,000,000"
                onChange={(e) => {
                  setMonto(Number(e.target.value));
                  validarCampo("monto", e.target.value);
                }}
                min={1000000}
              />
              {errors.monto && <small className="text-danger">{errors.monto}</small>}
            </div>
          </div>

          <div className="row">
            {/* Plazo */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Plazo *</label>
              <select
                className="form-select"
                value={plazo}
                onChange={(e) => setPlazo(Number(e.target.value))}
              >
                <option value="12">12 meses</option>
                <option value="24">24 meses</option>
                <option value="36">36 meses</option>
                <option value="48">48 meses</option>
                <option value="60">60 meses</option>
              </select>
            </div>

            {/* Destino */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Destino *</label>
              <textarea
                className="form-control"
                rows={3}
                value={destino}
                placeholder="Describe brevemente el destino del crédito..."
                onChange={(e) => {
                  setDestino(e.target.value);
                  validarCampo("destino", e.target.value);
                }}
              />
              {errors.destino && <small className="text-danger">{errors.destino}</small>}
            </div>
          </div>

          {/* SIMULADOR */}
          <div className="simulator-box mt-4">
            <div className="simulator-header">
              <i className="bi bi-calculator"></i> Calculadora de Cuota Mensual
            </div>

            <div className="simulator-result">
              <div className="title">Cuota Mensual Estimada</div>

              {cuota ? (
                <>
                  <div className="cuota">${cuota.toLocaleString("es-CO")}</div>

                  <div className="simulator-detail">
                    Producto: <strong>{tipo}</strong><br />
                    Tasa: {(tasas[tipo] * 100).toFixed(1)}% EA • Plazo: {plazo} meses<br />
                    Monto: ${monto.toLocaleString("es-CO")}
                  </div>
                </>
              ) : (
                <div className="text-muted">Completa los datos para simular.</div>
              )}
            </div>

            <div className="simulator-note">
              <strong>Nota:</strong> Este cálculo es solo una simulación.
            </div>
          </div>
        </div>

        {/*  DATOS LABORALES  */}
        <div className="section-box mt-4">
          <i className="bi bi-briefcase"></i> Datos Laborales
        </div>

        <div className="section-content">
          <div className="row">
            {/* Empresa */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Empresa donde Trabajas *</label>
              <input
                type="text"
                className="form-control"
                value={empresa}
                placeholder="Nombre de la empresa"
                onChange={(e) => {
                  setEmpresa(e.target.value);
                  validarCampo("empresa", e.target.value);
                }}
              />
              {errors.empresa && <small className="text-danger">{errors.empresa}</small>}
            </div>

            {/* Cargo */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Cargo *</label>
              <input
                type="text"
                className="form-control"
                value={cargo}
                placeholder="Tu cargo o profesión"
                onChange={(e) => {
                  setCargo(e.target.value);
                  validarCampo("cargo", e.target.value);
                }}
              />
              {errors.cargo && <small className="text-danger">{errors.cargo}</small>}
            </div>

            {/* Ingresos */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Ingresos Mensuales *</label>
              <input
                type="number"
                className="form-control"
                value={ingresos}
                placeholder="Ej: 2,000,000"
                onChange={(e) => {
                  setIngresos(e.target.value);
                  validarCampo("ingresos", e.target.value);
                }}
              />
              {errors.ingresos && <small className="text-danger">{errors.ingresos}</small>}
            </div>
          </div>

          {/* BOTÓN */}
          <div className="mt-3">
            <button type="submit" className="btn btn-primary w-100">Enviar Solicitud</button>
          </div>
        </div>

      </form>




      {/* MODAL ÉXITO */}
      <div className="modal fade" id="modalSuccess" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Solicitud Enviada</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              Tu solicitud fue enviada correctamente. Un asesor te contactará pronto.
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" data-bs-dismiss="modal">Aceptar</button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL ERROR */}
      <div className="modal fade" id="modalError" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">Campos incompletos</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              Por favor completa todos los campos antes de continuar.
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" data-bs-dismiss="modal">Entendido</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solcitar;
