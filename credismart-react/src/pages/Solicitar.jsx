import React, { useState } from "react";

const Solicitar = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    email: "",
    telefono: "",
    tipoCredito: "",
    monto: "",
    plazo: "",
    destino: "",
    empresa: "",
    cargo: "",
    ingresos: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "Nombre requerido";
    if (!formData.cedula.trim()) newErrors.cedula = "Cédula requerida";
    if (!formData.email.includes("@")) newErrors.email = "Email inválido";
    if (formData.telefono.length < 7) newErrors.telefono = "Número incorrecto";
    if (!formData.tipoCredito) newErrors.tipoCredito = "Seleccione un crédito";
    if (formData.monto < 1000000) newErrors.monto = "Monto mínimo $1.000.000";
    if (!formData.plazo) newErrors.plazo = "Seleccione un plazo";
    if (!formData.destino.trim()) newErrors.destino = "Describa el destino";
    if (!formData.cargo.trim()) newErrors.cargo = "Cargo requerido";
    if (formData.ingresos < 0) newErrors.ingresos = "Valor inválido";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; 
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    alert("Solicitud enviada con éxito");
    console.log("Datos enviados:", formData);
  };

  return (
    <div className="container py-4" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Solicitud de Crédito</h2>

      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
        {/* DATOS PERSONALES */}
        <h5 className="mb-3">Datos Personales</h5>

        <input
          type="text"
          name="nombre"
          className="form-control mb-2"
          placeholder="Nombre completo"
          onChange={handleChange}
        />
        {errors.nombre && <p className="text-danger">{errors.nombre}</p>}

        <input
          type="number"
          name="cedula"
          className="form-control mb-2"
          placeholder="Cédula"
          onChange={handleChange}
        />
        {errors.cedula && <p className="text-danger">{errors.cedula}</p>}

        <input
          type="email"
          name="email"
          className="form-control mb-2"
          placeholder="Correo electrónico"
          onChange={handleChange}
        />
        {errors.email && <p className="text-danger">{errors.email}</p>}

        <input
          type="number"
          name="telefono"
          className="form-control mb-2"
          placeholder="Teléfono"
          onChange={handleChange}
        />
        {errors.telefono && <p className="text-danger">{errors.telefono}</p>}

        {/* DATOS DEL CRÉDITO */}
        <h5 className="mt-4 mb-3">Datos del Crédito</h5>

        <select
          name="tipoCredito"
          className="form-select mb-2"
          onChange={handleChange}
        >
          <option value="">Tipo de crédito</option>
          <option>Crédito Libre Inversión</option>
          <option>Crédito Vehículo</option>
          <option>Crédito Vivienda</option>
          <option>Crédito Educativo</option>
          <option>Crédito Empresarial</option>
        </select>
        {errors.tipoCredito && (
          <p className="text-danger">{errors.tipoCredito}</p>
        )}

        <input
          type="number"
          name="monto"
          className="form-control mb-2"
          placeholder="Monto solicitado"
          onChange={handleChange}
        />
        {errors.monto && <p className="text-danger">{errors.monto}</p>}

        <select
          name="plazo"
          className="form-select mb-2"
          onChange={handleChange}
        >
          <option value="">Plazo en meses</option>
          <option>12</option>
          <option>24</option>
          <option>36</option>
          <option>48</option>
          <option>60</option>
        </select>
        {errors.plazo && <p className="text-danger">{errors.plazo}</p>}

        <textarea
          name="destino"
          className="form-control mb-2"
          placeholder="Destino del crédito"
          rows={3}
          onChange={handleChange}
        ></textarea>
        {errors.destino && <p className="text-danger">{errors.destino}</p>}

        {/* DATOS LABORALES */}
        <h5 className="mt-4 mb-3">Datos Laborales</h5>

        <input
          type="text"
          name="empresa"
          className="form-control mb-2"
          placeholder="Empresa donde trabaja"
          onChange={handleChange}
        />

        <input
          type="text"
          name="cargo"
          className="form-control mb-2"
          placeholder="Cargo"
          onChange={handleChange}
        />
        {errors.cargo && <p className="text-danger">{errors.cargo}</p>}

        <input
          type="number"
          name="ingresos"
          className="form-control mb-3"
          placeholder="Ingresos mensuales"
          onChange={handleChange}
        />
        {errors.ingresos && <p className="text-danger">{errors.ingresos}</p>}

        <div className="d-flex justify-content-between mt-3">
          <button type="submit" className="btn btn-primary">
            Enviar Solicitud
          </button>

          <button type="reset" className="btn btn-secondary">
            Limpiar Formulario
          </button>
        </div>
      </form>
    </div>
  );
};

export default Solicitar;
