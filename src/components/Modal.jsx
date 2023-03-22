import { useState, useEffect } from "react";
import CerrarBtn from "../img/cerrar.svg";
import Mensaje from "./Mensaje";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
}) => {
  const [mensaje, setMensaje] = useState("");

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [id, setId] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, []);


  const ocultarModal = () => {
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todo los campos son obligatorios");

      setTimeout(() => {
        setMensaje("");
      }, 3000);
      return;
    }
    guardarGasto({ nombre, cantidad, categoria, id, fecha });
    ocultarModal();
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} onClick={ocultarModal} />
      </div>
      <form
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el Nombre del Gasto"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade la cantidad del Gasto: ej. 300"
            value={cantidad}
            onChange={(e) => {
              setCantidad(Number(e.target.value));
            }}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
            }}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscirpciones">Suscripciones</option>
          </select>
        </div>
        <input type="submit" value={gastoEditar.nombre ? 'Gaurdar cambios' : 'Añadir gasto'} />
      </form>
    </div>
  );
};

export default Modal;
