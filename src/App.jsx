import { useState, useEffect } from "react";
import Header from "./components/Header";
import Filtros from "./components/Filtros";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { generarId } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem("gastos")) ?? []
  );
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      // Actualizamos gasto
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      // Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    console.log(gasto);
  };

  const elminarGasto = (id) => {
    const gastosActualizados = gastos.filter(
      (gastoState) => gastoState.id !== id
    );
    setGastos(gastosActualizados);
  };

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      // handleNuevoGasto()
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    if(filtro){
      // Mostrar Gastos por categorías
      const gastadoFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastadoFiltrados)
    }
  }, [filtro]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos = {setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro = { filtro }
              setFiltro = { setFiltro }
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              elminarGasto={elminarGasto}
              filtro = { filtro }
              gastosFiltrados = { gastosFiltrados }
            />
            <div className="nuevo-gasto">
              <img
                src={IconoNuevoGasto}
                alt="icono nuevo gasto"
                onClick={handleNuevoGasto}
              />
            </div>
          </main>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
        />
      )}
    </div>
  );
}

export default App;
