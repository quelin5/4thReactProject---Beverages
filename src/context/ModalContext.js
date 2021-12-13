import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el context
export const ModalContext = createContext();

const ModalProvider = (props) => {
  // state del provider para tener la receta que ha seleccionado el usuario :
  const [idReceta, guardarIdReceta] = useState(null);
  const [informacion, guardarReceta] = useState({});

  //una vez que tenemos la receta en específico, hacer otra llamada a la API
  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idReceta) return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

      const resultado = await axios.get(url);
      guardarReceta(resultado.data.drinks[0]);
    };
    obtenerReceta();
  }, [idReceta]);

  return (
    <ModalContext.Provider
      value={{
        informacion,
        guardarIdReceta,
        guardarReceta,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
