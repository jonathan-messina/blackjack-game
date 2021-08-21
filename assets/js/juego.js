//--Manipulacion del DOM(Document Object Model)--

//document.querySelector('elementodeseado')
//selecciona solo el 1er elem deseado , ex: 'button', 'img' etc.

//document.querySelectorAll('elementodeseado')
//selecciona todos los elem deseados

//se puede cambiar el valor del elemento, asignandole uno nuevo.
//ej:document.querySelector('small').innerhtml = '<b>Hola Mundo</b>;

// document.getElementById('computadora-cartas');
//permite obtener un elemento por su id.

//Con querySelector tambien se puede buscar por id y clase,
//agregando # al inicio del elemento se buscara por id.
//agregando . al inicio del elemento, se buscara por clase

//Almacenar en variables//

//si se manipulara varias veces un elemento,
//lo ideal seria almacenar el objeto en una vairable.
//el objeto se creara luego de recargar el navegador

// const divBotones = document.querySelector('#divBotones');

//Crear elementos//

// document.createElement('button');
//se crea pero no sabemos en que lugar de la memoria esta

//const botonNuevo = document.createElement('button');
// le asignamos un lugar conocido en memoria.

//divBotones.append(botonNuevo);
//lo agregamos al final de la fila de botones, ahora sera visible.

//botonNuevo.innerHTML = 'Hola Nekoki';
//le agregamos un contenido al boton.

//botonNuevo.classList.add('btn-success')
//le agregamos una clase lo que le dara un estilo al usar boostrap
//o ya tener un estilo definido en css

//recordar que al actualizar la pagina,
//todo esto se perdera a menos que sea guardado.

//------Juego Blackjack------//
// 2C = Two of Clubs
// 2H = Two of Hearts
// 2D = Two of Diamonds
// 2S = Two of Spades

//---------Patron Modulo---------//

//encapsula y protege el codigo, es decir vuelve su scope privado
//evita que se llamen o consulten variables o funciones en el navegador.
//y permite separar que queremos que sea publico de lo que no.

//funcion anonima autoinvocada, es anonima porque no posee nombre
//y al estar entre () e invocarse asi misma, es autoinvocada
//crea un scope(ambito) imposible de llamar directamente ya que no posee nombre

const miModulo = (() => {
  "use strict";

  let deck = [];
  const tipos = ["C", "D", "H", "S"], // no es necesario repetir la constante, con poner una coma
    especiales = ["A", "J", "Q", "K"]; // js entiende que ambas son constantes

  let puntosJugadores = [];

  //Referencias del HTML
  //se colocan aparte y no dentro de las funciones, para ahorrar poder de computo.
  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevo = document.querySelector("#btnNuevo"),
    nombre = document.querySelector("b");
  const divCartasJugadores = document.querySelectorAll(".divCartas"),
    puntosHTML = document.querySelectorAll("small");

  // Esta funcion crea un nuevo Deck
  const crearDeck = () => {
    deck = []; // se reinicia el deck cada vez que se crea uno nuevo.
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo); //ingresa las cartas numeradas
      }
    }
    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo); //ingresa las cartas especiales
      }
    }
    return _.shuffle(deck); //mezcla las cartas, utilizamos la libreria underscore.js
  };

  //Esta funcion inicializa el juego.
  const inicializarJuego = (numJugadores = 2) => {
    // el valor por defecto sera 1.
    deck = crearDeck();
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      //segun el nº de jugadores, se agrega un contador al array que acumula los puntos.
      puntosJugadores.push(0); //cada jugador empieza con sus puntos en 0, por lo que se añade una posicion con valor 0.
    }

    puntosHTML.forEach(elem => elem.innerText = 0);
    divCartasJugadores.forEach(elem => elem.innerHTML = '');

     btnPedir.disabled = false;
     btnDetener.disabled = false;

  }; // las llamadas de funcion idealmente deberian ir dentro de otra funcion.

  inicializarJuego();

  const obtenerNombre = () => {
    //obtenemos el nombre del jugador
    let nombreJugador = prompt("Bienvenido! ¿Cual es tu nombre?");
    if (nombre != "Jugador 1") {
      nombre.innerText = nombreJugador;
    } else if (nombre == "Jugador 1") {
      nombre.innerText = "Jugador 1";
    }
    return nombre;
  };

  obtenerNombre(); // llamar funcion



  //Esta funcion me permite tomar una carta.

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }
    return deck.shift();
    //remueve el primer item de un array y lo devuelve
  };



  //Esta funcion sirve para obtener el valor de la carta.

  const valorCarta = (carta) => {
    //en js todos los strings pueden ser trabajados como si fueran arreglos.
    const valor = carta.substring(0, carta.length - 1);
     // le restamos 1 al length para quedarnos siempre con el numero y borrar el tipo.
    return isNaN(valor)
    //isNan = is not a number, regresa un false
      ? valor === "A"
        ? 11
        : 10 // K,Q,j Valen 10 en Blackjack, A vale 11.
      : valor * 1; //convertimos el string en un numero, importante!
    //se utilizo un ternario anidado para simplificar el codigo
  };
  // const valor = valorCarta(pedirCarta());

  //Turno: 0 = primer jugador y el ultimo sera la computadora.

  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta); // se cuantifica el valor
    puntosHTML[turno].innerText = puntosJugadores[turno]; // se muestra el valor sumado en pantalla
    return puntosJugadores[turno];
  };

  //Esta funcion crea las cartas
  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement("img"); //se crea la imagen
    imgCarta.src = `assets/cartas/${carta}.png`; // se elige la imagen
    imgCarta.classList.add("carta"); // se le da estilo a la imagen
    divCartasJugadores[turno].append(imgCarta); // se inserta en el div donde debe ir.
  };

  const determinarGanador = () => {

    const [puntosMinimos, puntosComputadora] = puntosJugadores

    setTimeout(() => {
      //para que el alert aparezca luego de que aparecen las cartas
      if (puntosComputadora === puntosMinimos) {
        alert("Es un empate!");
      } else if (puntosMinimos > 21) {
        alert("Computadora gana!");
      } else if (puntosComputadora > 21) {
        alert("Jugador gana!");
      } else {
        alert("Computadora gana!");
      }
    }, 20);
  };

  // Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {

    let puntosComputadora = 0;

    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
    //se busca pasar los puntos del jugador y verificar si son menores que 21.
    determinarGanador();
  };

  //Eventos

  //addEventListener monitorea los eventos,
  //como argumento se especifica el tipo de evento y un callback.
  //la funcion callback se define por ser usada
  //como argumento de otra funcion.

  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    let puntosComputadora = 0;
    const puntosMinimos = acumularPuntos(carta, 0);
    crearCarta(carta, 0);
    if (puntosMinimos > 21) {

      btnPedir.disabled = true;
      turnoComputadora(puntosMinimos);
      } else if ((puntosMinimos === 21) && (puntosComputadora === 21)) {

           btnPedir.disabled = true;
           turnoComputadora(puntosMinimos);
       } else if ((puntosMinimos === 21) && (puntosComputadora !== 21  )) {

           btnPedir.disabled = true;
           turnoComputadora(puntosMinimos);
    }
  });

  btnDetener.addEventListener("click", () => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    
    turnoComputadora(puntosJugadores[0]);
  });

  btnNuevo.addEventListener("click", () => {

    inicializarJuego();

  });

  return {
    nuevoJuego: inicializarJuego
  };

})();

// use strict
//al en un scope escribir 'use strict', le pedimos a javascript que no deje pasar
//errores o ambiguedades, lo que hace el codigo mas limpio.
//ej: si ponemos personajes = ['ana'];, nos tirara error porque no hemos declarado
//personajes dentro de una variables, nos pedira poner
// const personajes = ['Ana'];
//es bastante util combinado con el Patron Modulo, ya que elimina errores comunes.
