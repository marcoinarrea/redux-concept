// Ejemplo sencillo de cómo implementar Redux sin hacer uso de librerías de terceros.

// Principios básicos:
//  - El store es la única fuente de la verdad.
//  - El estado es de solo lectura.
//  - Los cambios de estado se hacen a través de funciones puras (los reducers).

// Me creo dos interfaces: Action y Reducer, que me ayudarán a crear actions y reducers.

// Las acciones tienen que tener, al menos, un tipo (type), que no es más que una cadena que 
// mantiene información descriptiva sobre el cambio que queremos realizar en el estado de nuestra
// aplicación. Opcionalmente, una acción puede tener un payload, que son datos auxiliares que influyen
// en cómo se realiza el cambio en el estado.
interface Action {
  type: string;
  payload?: any;
}

// Los reducers son funciones puras que se encargan de cambiar el estado de la aplicación. 
// Un reducer siempre recibe dos parámetros, el estado anterior de la aplicación y la acción que
// se desea realizar. En base a la acción, se modificará el estado de una forma u otra.
interface Reducer<T> {
  (state: T, action: Action): T;
}

// Redux sólo contempla una única fuente de la verdad, el store, que es una clase que ayuda a manejar todo
// el estado de la aplicación. Nótese que el patrón de arquitectura de datos Flux contemplaba más de un store.

// El store almacenará referencias a uno o varios reducers y cada uno de estos se encargará de modificar una 
// parte concreta del estado de la aplicación. 
class Store<T> {
  
  // En este ejemplo sencillo, el estado será una variable numérica. En los ejemplos reales, 
  // el estado es un árbol de datos complejo.
  private state: T;

  // El store recibe el estado inicial de la aplicación y los reducers que lo van a modificar. En la práctica,
  // puesto que a los reducers ya se les pasa el estado inicial de la aplicación, el store conoce el estado
  // inicial a través de los reducers. En este ejemplo sólo se va a guardar un reducer.
  constructor(private reducer: Reducer<T>, initState: T) {
    this.state = initState;
  }

  // Siempre dispondremos de un método que nos permitirá acceder al estado actual de la aplicación.
  getState(): T {
    return this.state;
  }

  // Los reducers no se ejecutan explícitamente, es el método dispatch quien los invoca indirectamente en 
  // base a una acción determinada. El store conoce a todos los reducers, por lo que el método dispatch podrá
  // ejecutar un reducer u otro según sea conveniente.
  dispatch(action: Action): void {
    this.state = this.reducer(this.state, action);
  }
}

// Ejemplo de reducer.
// Si un reducer no reconoce una acción determina debe devolver el mismo estado que ha recibido sin alterarlo.
let reducer: Reducer<number> = (state: number = 0, action: Action) => {
  if (action === null) return state;
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "PLUS":
      return state + action.payload;
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

const plusAction: Action = {
  type: "PLUS",
  payload: 5
};

// Se crea un nuevo store al que se le pasa el reducer creado y el estado inicial.
let store = new Store<number>(reducer, 5);

// Se consulta el estado de la aplicación.
console.log("init", store.getState()); // 5

// Se ejecuta una acción para modificar el estado de la aplicación.
store.dispatch(incrementAction);
console.log("incrementAction", store.getState()); // 6

store.dispatch(decrementAction);
console.log("decrementAction", store.getState()); // 5

store.dispatch(plusAction);
console.log("plusAction", store.getState()); // 10
