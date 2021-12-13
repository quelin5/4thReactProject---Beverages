import React, { useContext, useState } from "react";
import Header from "./Header";

//importar el context para poder usarlo aquí:
import { CategoriasContext } from "../context/CategoriasContext";
import { RecetasContext } from "../context/RecetasContext";

const Formulario = () => {
  const [busqueda, guardarBusqueda] = useState({
    nombre: "",
    categoria: "",
  });

  //funcion para leer los contenidos de cada bebida:
  const obtenerDatosReceta = (e) => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  //Así ya tengo disponible lo que aparece en 'value' del CategoriasContext
  const { categorias } = useContext(CategoriasContext);
  const { buscarRecetas, guardarConsultar } = useContext(RecetasContext);

  return (
    <form
      className="col-12"
      onSubmit={(e) => {
        e.preventDefault();
        buscarRecetas(busqueda);
        guardarConsultar(true);
      }}
    >
      <fieldset className="text-center">
        <legend> Busca bebidas por categoría o ingrediente </legend>
      </fieldset>

      <div className="row mt-4">
        <div className="col-md-4">
          <input
            name="nombre"
            className="form-control"
            type="text"
            placeholder="Busca por ingrediente"
            onChange={obtenerDatosReceta}
          />
        </div>

        <div className="col-md-4">
          <select
            name="categoria"
            className="form-control"
            onChange={obtenerDatosReceta}
          >
            <option value="">Selecciona una categoría </option>
            {categorias.map((categoria) => (
              <option key={categoria.strCategory} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Buscar bebidas"
          />
        </div>
      </div>
    </form>
  );
};

export default Formulario;
