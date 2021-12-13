//Los datos van a fluir desde este archivo al resto, no desde APP(que es el padre)

import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

//Crer el Context
export const CategoriasContext = createContext();

// Provider es donde se encuentran las funciones y el state

const CategoriasProvider = (props) => {
  //crear el State de context
  const [categorias, guardarCategorias] = useState([]);

  //llamada a la API
  useEffect(() => {
    const obtenerCategorias = async () => {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
      const categorias = await axios.get(url);
      guardarCategorias(categorias.data.drinks);
    };
    obtenerCategorias();
  }, []);

  //Aquí lo que va a fluirr
  //Los diferentes archivos (Formulario, App) estaran dentro de 'children'!! así se van a pasar los datos

  /* Lo que guarde en VALUE dentro estará disponible */

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
      }}
    >
      {props.children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasProvider;
