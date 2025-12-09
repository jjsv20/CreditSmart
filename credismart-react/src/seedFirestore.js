/*/import { db } from "./firebase/config";
import { collection, addDoc } from "firebase/firestore";

const creditsData = [ 

    {
        name: "Credito de libre inversión",
        description: "Un crédito que puedes usar para cualquier propósito personal.",
        montoMin: 1000000,
        montoMax: 50000000,
        tasaInteres: 1.2,
        maxTiempo: 60,
        requirements: "Ser mayor de 18 años, Tener ingresos comprobables. No tener deudas pendientes, Ingresos mínimos de $1,000,000 mensuales",
        icon: "/public/img1.png"
    },
    {
        name: "Crédito de Vehículo",
        description: "Financia la compra de tu vehículo nuevo o usado con tasas competitivas.",
        montoMin: 5000000,
        montoMax: 80000000,
        tasaInteres: 0.95,
        maxTiempo: 72,
        requirements: "Ser mayor de 18 años, Tener ingresos comprobables. No tener deudas pendientes, Ingresos mínimos de $1,000,000 mensuales",
        icon: "/public/img2.png"
    },
    {
        name: "Crédito de Vivienda",
        description: "Obtén el financiamiento que necesitas para comprar la casa de tus sueños.",
        montoMin: 20000000,
        montoMax: 500000000,
        tasaInteres: 0.75,
        maxTiempo: 240,
        requirements: "Ser mayor de 18 años, Tener ingresos comprobables. No tener deudas pendientes, Ingresos mínimos de $1,000,000 mensuales",
        icon: "/public/img3.png"
    },
    {
        name: "Crédito Educativo",
        description: "Financia tus estudios y alcanza tus metas académicas y profesionales",
        montoMin: 2000000,
        montoMax: 30000000,
        tasaInteres: 0.85,
        maxTiempo: 48,
        requirements: "Ser mayor de 18 años, Tener ingresos comprobables. No tener deudas pendientes, Ingresos mínimos de $1,000,000 mensuales",
        icon: "/public/img4.png"
    },
    {
        name: "Crédito Empresarial",
        description: "Impulsa el crecimiento de tu pequeña o mediana empresa.",
        montoMin: 5000000,
        montoMax: 100000000,
        tasaInteres: 1.1,
        maxTiempo: 84,
        requirements: "Ser mayor de 18 años, Tener ingresos comprobables. No tener deudas pendientes, Ingresos mínimos de $1,000,000 mensuales",
        icon: "/public/img5.png"
    },
    {
        name: "Crédito para Viajes",
        description: "Haz realidad el viaje de tus sueños con nuestro crédito para viajes.",
        montoMin: 1000000,
        montoMax: 20000000,
        tasaInteres: 1.3,
        maxTiempo: 36,
        requirements: "Ser mayor de 18 años, Tener ingresos comprobables. No tener deudas pendientes, Ingresos mínimos de $1,000,000 mensuales",
        icon: "/public/img6.png"
    }
]

const seedFirestore = async () => {
    try {
        console.log("Iniciando la siembra de Firestore...");
        for (const credit of creditsData) {
            const docRef = await addDoc(collection(db, "credits"), credit);
            console.log("Documento agregado con ID: ", docRef.id);
        }   
        console.log("Siembra de Firestore completada.");
        console.log("b")
    } catch (error) {
        console.error("Error al agregar documento: ", error);
    }
}

seedFirestore();/*/