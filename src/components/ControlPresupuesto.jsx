import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({ gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );

    const totalDisponible = presupuesto - totalGastado;
    const percentage = ((totalGastado * 100) / presupuesto).toFixed(2);

    setGastado(totalGastado);
    setDisponible(totalDisponible);
    setTimeout(() => {
      setPorcentaje(percentage);
    }, 1000);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  };

  const handleResetApp = () => {
    const resultado = confirm('¿Estás seguro de querer restear la App?')
    if(resultado){
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }

  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
          styles={buildStyles({
                pathColor: porcentaje > 100 ? '#dc2626' : '#3B82F6',
                trailColor:'#f5f5f5',
                textColor : porcentaje > 100 ? '#dc2626' : '#3e98c7'
          })}
        />
      </div>
      <div className="contenido-presupuesto">
      <button 
        className="reset-app" 
        type="button"
        onClick = { handleResetApp }
        >
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
