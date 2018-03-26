// Ejemplo de cómo emplear la librería oficial de Redux para hacer el mismo ejemplo que en ./index.ts.

// Se va a utilizar la librería oficial Redux para JS y el patrón observador para detectar cambios en el estado
// de la aplicación.

// En Angular, en lugar de utilizar la librería oficial, se utiliza el módulo @ngrx que ya viene adaptado
// para trabajar con el framework.

import { Action, Reducer, createStore, Store } from "redux";

// Se extiende la interfaz Action para poder crear acciones con payload.
interface PlusAction extends Action {
  payload: number;
}

const reducer: Reducer<number> = (state: number = 0, action: Action) => {
  if (action === null) return state;
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "PLUS":
      // Se hace un cast para poder acceder a la propiedad payload de una PlusAction.
      return state + (<PlusAction>action).payload;
    default:
      return state;
  }
};

// Ejemplos de acciones.
const incrementAction: Action = {
  type: "INCREMENT"
};

const decrementAction: Action = {
  type: "DECREMENT"
};

// Nótese que esta acción es de tipo PlusAction.
const plusAction: PlusAction = {
  type: "PLUS",
  payload: 5
};

// Al contratio que en ./index.ts, esta vez no indicamos el estado inicial para crear el store. Por 
// defecto se emplea el estado que se pasa por defecto al reducer.
const store: Store<number> = createStore<number>(reducer);

console.log("init", store.getState()); // 0

// Hacemos uso del patrón observador para consultar el cambio del estado de la aplicación. Cada vez que se 
// modifique el store, se mostrará el estado. 
store.subscribe(() => {
  console.log("subscribe", store.getState()); // 1 -> 6 -> 5
});

store.dispatch(incrementAction); 
store.dispatch(plusAction); 
store.dispatch(decrementAction); 
