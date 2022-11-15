## React TIPS - CREACIÓN DE UNA APP 📘

<br />

---

## **TRAER ELEMENTOS DE LA APPI Y MAPEARLOS**

- Importamos ` import { useState, UseEffect} from 'React';`

- Importamos Axios ` import axios from 'axios';` (No te olvides de npm i axios)

- Creamos un estado para almacenar los personajes
  `const [personajes, setPersonajes] = useState([])`

- Creamos el `useEffect`.

```js
useEffect(() => {
  // AQUI IRÁ LA LLAMADA A LA PROMESA
}, []);
```

- Luego creemos una variable `const url = ' URL de la api'` e insertemos la llamada a la api en el useEffect.

```js
const url = `https://jsonplaceholder.typicode.com/users`;

useEffect(() => {
  // AQUI IRÁ LA LLAMADA A LA PROMESA
  axios.get(url).then((res) => {
    const persons = res.data;
    this.setState({ persons });
  });
}, []);
```

- Ahora tendremos en nuestro estado `personajes` un arreglo de objetos con todos los personajes traidos de la api.

### Mapeado

Vamos a suponer que tenemos el componente `<Cards/>`, nos traeremos por props el estado con los datos de la api.

```js
// COMPONENTE CARDS

export default function Cards(props) {
  return (
    <div>
      {props.characters.map((card) => (
        <Card
          key={card.name}
          name={card.name}
          species={card.species}
          gender={card.gender}
          image={card.image}
          onClose={props.onClose}
          id={card.id}
        />
      ))}
    </div>
  );
}
```

<br />

---

## **FUNCION (X) CERRAR O ELIMINAR TARJETA**

Lo que hará la función es usar el método filter que crea un nuevo array con los elementos filtrados, en este caso vamos a filtrar todos menos el que coicida con el ID pasado por parámetro.

- personajeId = (Parámetro que va a recibir el id del personaje)

- character = (El estado que contiene el objeto de todos los personajes)

### Estructura

```js
// Desde App.js

const onClose = (personajeId) => {
  console.log(personajeId);

  let filtroArreglo = character.filter(function (i) {
    return i.id !== personajeId;
  }); // filtramos

  console.log(filtroArreglo);

  setCharacters(filtroArreglo);
};
```

Aquí está el botón que tendremos en nuestra card, traeremos por props la función onClose; también tendremos a mano el id, ya que nos traeremos el estado para poder llenar nuestra card.

```js
<button onClick={() => props.onClose(props.id)}>X</button>
```

<br />

---

## **TRAER UN ELEMENTO ESPECIFICO CON UN BUSCADOR INPUT**

- Creamos una funcion que será la handle del boton de buscar del input .

- Creearemos la llamada a la api filtrando el id del personaje desde app.js

- Crearemos un estado para almacenar las caracteristicas de ese personaje.

```js
// En App.js

const [character, setCharacters] = useState([]);

const onSearch = (personajeID) => {
  axios
    .get(`https://rickandmortyapi.com/api/character/${personajeID}`)
    .then((res) => {
      const persons = res.data;

      if (res.data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        window.alert("No hay personajes con ese ID");
      }
    });
};
```

Ahora tendremos un estado aparte con las caracteristicas del personaje con ese ID especificado por parametro en la función, que será enviada al botón del input.

### NUESTRO SEARCHBAR INPUT

Lo que haremos aquí será crear un input de ´type='search´ y un ´onChange´ en donde a este le daremos la función de escuchar los cambios que se vallan haciendo a medida que escribamos.

También crearemos un boton, con el atributo onClick, en este le pasaremos nuestra función creada anteriormente, por props. La funcion era ´onSearch()´.

Crearemos un estado interno para almacenar lo que el usuario escriba en el input, y luego usar ese estado para pasarle como parametro a la función onSearch el ID escrito por el usuario.

```js
export default function SearchBar(props) {
  const [character, setcharacter] = useState("");

  const handleNames = (e) => setcharacter(e.target.value);

  return (
    <div>
      <input type="search" onChange={handleNames} />

      <button onClick={() => props.onSearch(character)}>Agregar</button>
    </div>
  );
}
```

<br />

---

## **Tips para condicional explicito**

- Usamos el Hooks ´useLocation()´ que nos dirá la ubicación de donde estamos parados actualmente.

```js
import { useLocation } from "react-router-dom";

const location = useLocation();
```

Ahora podremos condicionar que sucede si estamos parados en cierta ubicación, miremos el siguiente ejemplo:

" ESTO ES PARA QUE EL NAV NO SE MUESTRE EN EL COMPONENTE FORMS, PERO SI EN EL RESTO DE COMPONENTES"

```js
if (location.pathname === "/") {
  return (
    <div className={styles.contenedor}>
      <Routes>
        <Route path="/" element={<Forms login={login} />} />
      </Routes>
    </div>
  );
} else {
  return (
    <div className={styles.contenedor}>
      <Nav onSearch={onSearch} logout={logout} />

      <Routes>
        <Route
          path="/home"
          element={
            <div className={styles.containerCards}>
              <Cards characters={character} onClose={onClose} />
            </div>
          }
        />

        <Route path="/about" element={<About />} />

        <Route path="/detail/:detailId" element={<Detail />} />
      </Routes>
    </div>
  );
}
```

<br />

---

## **Detalle de tarjeta -- SUPER IMPORTANTE**

Como bien sabemos para trabajar con rutas debemos utilizar REACT-ROUTER-DOM, primero envolveremos a app de la siguiente manera..

```js
//index.js

import { BrowserRouter } from "react-router-dom";

<BrowserRouter>
  <App />
</BrowserRouter>;
```

Luego en App.js empezaremos a trabajar con las rutas..

```js
import { Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Forms />} />

  <Route
    path="/home"
    element={
      <div className={styles.containerCards}>
        <Cards characters={character} onClose={onClose} />
      </div>
    }
  />

  <Route path="/about" element={<About />} />

  <Route path="/detail/:detailId" element={<Detail />} />
</Routes>;
```

El que va a recibir el ID sera la ruta que se dirije a "/detail/:detailId" , que contiene al elemento ´<Detail />´

ATENCIÓN AHORA :

- Importaremos en el componente CARD `import { Link } from "react-router-dom";`

- En el componente CARD envolveremos al tag h2 o a la props nombre lo siguiente:

```js
<Link to={`/detail/${props.id}`}>
  <h2>{props.name}</h2>
</Link>
```

Con esto lograremos que al hacer click en el nombre de nuestro personaje en la card, nos lleve a el detalle.

### Detalles de card

En nuestro componente `<Details/>`

Vamos a importarnos el Hooks UseParams que nos traerá el detalle que tengamos en nuestra URL (osea el id del personaje).

```js
import { useParams } from "react-router-dom";
```

En el componente `<Details/>` crearemos un nuevo estado interno en donde almacenaremos datos de nuestro personaje, haremos un nuevo llamado a la api.

```js
export default function Detail() {
  const { detailId } = useParams(); // Se llama la constante asi ya que llame así al path del Route...

  const [character, setCharacter] = useState([]);
}
```

Ahora haremos el llamado a la api.

```js
export default function Detail() {
  const { detailId } = useParams(); // Se llama la constante asi ya que llame así al path del Route...

  const [character, setCharacter] = useState([]);

  useEffect(() => {
    // AQUI IRÁ LA LLAMADA A LA PROMESA
    axios
      .get(`https://rickandmortyapi.com/api/character/${detailId}`)
      .then((res) => {
        if (res.name) {
          setCharacter(res);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      });
  }, []);
}
```

Listo tenemos nuestro llamado, si todo salio okey, cuando demos click en algun nombre de algun personaje, nos dirijira a el id de ese personaje en la url lo veras.... la pantalla estara en blanco porque aun no hemos llenado los datos del personaje, pero vamos hacerlo....

- En nuestro return (de nuestro componente DETAIL) comenzaremos a rellenar etiquetas con los datos que almacenamos en nuestro estado.

```js
return (
  <div className={style.containerDetail}>
    <div className={style.containerDetailData}>
      <h1>NOMBRE: {character.name}</h1>
      <p>STATUS: {character.status}</p>
      <p>ESPECIE: {character.species}</p>
      <p>GÉNERO: {character.gender}</p>
    </div>

    <img src={character.image} alt={character.name} />
  </div>
);
```

<br />

---

## ** FORMULARIO DE LOGIN **

Tendremos en un archivo Js aparte, las validaciones REGEX de los campos que querramos chequear, ej: 'username', 'password'.

```js
// validaciones.js

// VALIDAR USUARIO => DEBE INGRESAR UN EMAIL

export function validationUserName(input) {
  const validacion =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

  if (input.length > 35) return false;
  return validacion.test(input);
}

// VALIDAR PASSWORD

export function validationPass(input) {
  var strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  return strongRegex.test(input);
}

// El password debe tener una letra Mayuscula, un caracter especial, un numero y minimo 8 caracteres
```

Dentro de nuestro componente Form crearemos el formulario.

```js
export default function Forms() {
  return (
    <form>
      <label>UserName</label>
      <input type="text" name="username" />

      <label>UserName</label>
      <input type="text" name="username" />

      <button type="submit">Ingresar</button>
    </form>
  );
}
```

Luego crearemos el estado para almacenar de forma dinamica lo que se ingrese en algun input, lo haremos a travez de una funcion que llamaremos `handleInputChange `.

```js
const [userDate, setUserDate] = useState({
  username: "",
  password: "",
});

const handleInputChange = (e) => {
  setUserDate({ ...userDate, [e.target.name]: e.target.value });
};
```

Lo que hacemos aquí es traernos una copia del estado anterior, y le agregaremos según el input que estemos manejando una propiedad que será el nombre de nuestro target y su valor... por ejemplo:
username : 'Ezequiel'.

Ahora y MUY IMPORTANTE, agregemos esta función a cada uno de nuestros inputs a travez del evento onChange, también tendremos que agregarle a nuestros inputs un `value = userDate.username`. o el nombre segun su respectivo inputs, veamos ejemplos.

```js
<form>
  <label>UserName</label>
  <input
    type="text"
    name="username"
    onChange={handleInputChange}
    value={userDate.username}
  />

  <label>password</label>
  <input
    type="password"
    name="password"
    onChange={handleInputChange}
    value={userDate.password}
  />

  <button type="submit">Ingresar</button>
</form>
```

Ya tenemos los valores de los inputs almacenados en nuestro estado, ahora creemos un nuevo estado para los errores...

```js
const [errors, setErrors] = useState({
  username: "",
  password: "",
});
```

Es momento de importarnos nuestras validaciones que habiamos creado en nuestro archivo aparte, importemos esas funciones.

```js
import { validationUserName, validationPass } from "./validation.js";
```

Fuera de nuestro componente, creemos una funcion validadora que recibira por PARAMETRO NUESTRO ESTADO DE INPUTS Y chequeara si alguno de nuestros inputs no cumple con lo que piden nuestras funciones validadoras...

Dentro de ella creemos un objeto vacio que luego retornaremos....

```js
function validate(inputs) {
  let errors = {};

  if (!validationUserName(inputs.username)) {
    errors.username = "Debe ingresar un correo electronico válido";
  } else if (!validationPass(inputs.password)) {
    errors.password =
      "El password debe tener una letra Mayuscula, un caracter especial, un numero y minimo 8 caracteres";
  }

  return errors;
}
```

En nuestra primera condicion, preguntamos si la validacion UserName pasandole como parametro el INPUT USERNAME NO ES TRUE.... osea si NO SE ESTA CUMPLIENDO, de ser así, almacenaremos en nuestro objeto errors la propiedad username con un texto de error.... los mismo aremos para el password... al finalizar retornaremos un objeto con los errores que tengamos...

En nuestra funcion `handleInputChange` setearemos el estado de error pasandole la funcion validadora creada recientemente y de forma dinamica para que chequee el input que estamos queriendo modificar.

- Quedaría de esta manera:

```js
const handleInputChange = (e) => {
  setUserDate({ ...userDate, [e.target.name]: e.target.value });

  setErrors(validate({ ...userDate, [e.target.name]: e.target.value }));
};
```

GENIAL.... POR ULTIMO NOS QUEDARÍA AVISARLE DE CIERTA FORMA AL USUARIO QUE ESTA TENIENDO ALGUN TIPO DE ERROR, PARA ESO HAREMOS LO SIGUIENTE...

Le daremos a cada input una className (acuerdate de importar style de module.css).

Dentro de la className condicionaremos diciendo si hay un error que muestre cierto estilo.. vamos al ejemplo.

errors.username && style.warning (dice si errors.username es igual a true osea si existe un error en username, va a hacer que el estilo sea warnign).

También mostraremos al usuario un texto que muestre el error.

```js
<form>
  <label>UserName</label>

  <input
    type="text"
    name="username"
    onChange={handleInputChange}
    value={userDate.username}
    className={errors.userName && style.warning}
  />

  {errors.username && <p>{errors.username}</p>}

  <label>password</label>

  <input
    type="password"
    name="password"
    onChange={handleInputChange}
    value={userDate.password}
    className={errors.password && style.warning}
  />

  {errors.password && <p>{errors.password}</p>}

  <button type="submit">Ingresar</button>
</form>
```

Solo nos quedaría agregarle a la etiqueta form el evento onSubmit y una funcion que maneje ese evento, en este caso queremos que nos logee y nos lleve algun lado.

entonces...

```js
const handleSubmit = (e) => {
  e.preventDefault();

  // Aqui va que HARÁ CUANDO LE DEMOS CLICK A ENVIAR FORMULARIO O LOGIN...
};
```

<br />

---

## ** VALIDAR FORMULARIO **

En nuestro componente App.js crearemos dos variables simulando una base de datos que este registrado nuestro usario y contraseña.. e importaremos `useNavigate` de react-router-dom

```js
import { useNavigate } from "react-router-dom";

const username = "ezequielresipa45@gmail.com";
const password = "Eze1554!";
```

Crearemos un estado inicializado en falso, donde chequearemos si el user y pass coinciden, si es asi.. el estado sera true sino segura siendo falso.

También guardaremos en una variable a useNavigate, lo usaremos mas adelante para redireccionarnos al Home.

```js
const navigate = useNavigate();

const [access, setAccess] = useState(false);
```

Creamos la funcion que condicionara si el usuario tiene acceso o no...

La función será enviada como PROPS a la funcion `handleSubmit` del form...

Pasandole como parametro el estado (del componente FORM) el que almacena a username y password (userData);

Esta comparará si el username de nuestra DB fictisia es igual al username que le estamos pasando al input, lo mismo hará con la pass..

Si todo da true, setearemos el estado de acceso a true, y nuestro navigate del hooks setNavigate, nos redirigira al home de nuestra web.

En caso de no ser así dentremos un alert que diga que algo salio mal...

```js
function login(userData) {
  if (username === userData.username && password === userData.password) {
    setAccess(true);
    navigate("/home");
  } else {
    alert("Usuario o contraseña invalida");
  }
}
```

<br />

---

**SUPER IMPORTANTE**

Dentro de app.js para que el usuario evite navegar por la pagina si no tiene acceso... haremos esto..

```js
// app.js

useEffect(() => {
  !access && navigate("/");
}, [access, navigate]);
```

Por ultimo, pasemos como props la funcion LOGIN hacia FORMS y llamemosla en la funcion handleSubmit.

```js
const handleSubmit = (e) => {
  e.preventDefault();
  login(userDate);
};
```

Si queremos deslogearnos crearemos un boton en el nav que recibira una funcion, que la haremos en app.js y luego pasaremos como props.

```js
const logout = () => access && setAccess(false);
```

Le diremos que si el acceso es verdadero entonces setee el acceso a falso, esto hará que nos redirija al login nuevamente.

<br />

---

## **Redux** -

**Gramática:**

Instalamos `npm i redux@4.0.5`

```js

const redux  = require('redux'); // Requerimos redux


// Inicializamos el estado de objetos.
const initialState = {

    num:0,
    visibility: true,
    name: '',
    friends: []
}

// El encargado de enviarle al state nuestros pedidos o cambios que querramos hacer.
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'CAMBIAR_NOMBRE':
          return{
              ...state,
            name: action.payload
          };

          case 'ADD_FRIEND':
            return{
                ...state,
                friends: [...state.friends, action.payload]
            }

            case 'AUMENTAR':
                return{
                    ...state,
                    num: state.num + 1
                }

          default:
            return{
                ...state
            }

}


// Creamos el store
const store = redux.createStore(reducer);


// dispatch() => va a despachar nuestra accion (el mensajito) al reducer y el se encargara de pasarlo al state.

// getState() => Nos muestra el state actual.



// Action Creator

const cambiarNombre = (name)=>{
    return{
        type: 'CAMBIAR_NOMBRE',
        payload: name
    }
}

const addFriend = (friend)=>{
    return{
        type: 'ADD_FRIEND',
        payload: friend
    }
}

const action = {
    type: 'AUMENTAR'
}


// Ahora debemos hacer el dispatch para que las actions llegen al reducer.


store.dispatch(cambiarNombre('Ezequiel'));

store.dispatch(addFriend('Luis'));
store.dispatch(addFriend('Pedro'));
store.dispatch(addFriend('Mateo'));

store.dispatch(action);


```

<br />

---

## **Redux-React ----- CON CLASE** -

Tendremos una carpeta Redux, que contendrá:

- Actions => (Esta contendrá los accions creator y otro archivo con las const accions, también haremos el llamado a la api desde aqui)
- Reducer => (Aquí tendremos a nuestro reducer encargado de enviarle al store nuestro 'mensaito')
- Store = > (Aquí inicializaremos nuestro store, en caso de querer llamar a una api se le agregan algunas cosas)

En el archivo index.js vamos a envolver al componente App con un componente de react-redux llamado Provider, lo importaremos y también a store de redux.

```js
import { Provider } from "react-redux";
import store from "./redux/store";

<Provider store={store}>
  <App />
</Provider>;
```

Esta será la sintaxis si queremos trabar con una appi en react-redux, modificaremos el store.js de la siguiente manera:

```js
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "/reducer";
import thunkMiddleware from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;
```

Supongamos que querramos traer usuarios de una API, en las accions usariamos lo siguiente:

```js

export const getUser = () => {
  return function (dispatch) {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) =>response.json())
    .then((data) => dispatch({type: 'GET_USERS', payload: data})) 
  };
};

```



En nuestro reducers, en el switch haremos lo siguiente:


```js

//Nos guardamos los datos de la appi en el estado, en la propiedad users.

case GET_USERS:
  return {
    ...state,
    users: action.payload,
  }


```


Ahora para poder tener acceso a estos datos, poder modificarlos o simplemete traer algo a nuestro componente haremos lo siguiente:


```js

import React from 'react';
import { connect } from 'react-redux';
import { 'ACA VAN LAS ACCIONS QUE QUERRAMOS USAR, ej: decrement, inrement, getUsers'} from '../redux/actions';

class Contador extends React.Component {

      constructor(props){
        super(props);
      }


    render(){

      return(

        <>

            <h1>{this.props.contador}</h1>

            <button onClick = {this.props.decrement}>-</button>

            <button onClick = {this.props.increment}>+</button>


        </>


      )
    }  
}

// Con mapStateToProps nos traeremos por props el estado global, utilizando users como nombre para la props.

const mapStateToProps = (state) => {

  return{
    users : state.users,
    contador: state.contador
  }
}



// Con mapDispatchToProps nos traeremos por props la función getUsers que será la encargada de traernos la appi a nuestro componente.

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers : ()=>{dispatch(getUsers())},
    increment : ()=>{dispatch(increment())},
    decrement : ()=>{dispatch(decrement())},

  }
}


// Exportamos de esta manera todo, "RECORDÁ QUE TAMBIÉN AQUÍ ESTAS EXPORTANDO TU COMPONENTE, ASI QUE NO HACE FALTA QUE LO EXPORTES APARTE"

export default connect(mapStateToProps, mapDispatchToProps)(Contador)





```

Para traernos nuestra api y consumirla en el componente, haremos simplemente esto:



```js

// Dentro del componente usamos:



componentDidMount() {
  this.props.getUsers()
}



```
