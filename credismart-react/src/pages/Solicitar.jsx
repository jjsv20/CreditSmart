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




}