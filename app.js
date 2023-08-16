//Variables

let $tarjeta = document.getElementById('tarjeta');
let $todos = document.getElementById('todos');
let $mujeres = document.getElementById('mujeres');
let $hombres = document.getElementById('hombres');
let $desconocido = document.getElementById('desconocido');
let $singenero = document.getElementById('singenero');
let $inicio = document.getElementById('inicio');
let $siguiente = document.getElementById('siguiente');
let $anterior = document.getElementById('anterior');
let $final = document.getElementById('final');
let $paginaActual = document.getElementById('paginaActual')
let $totalPersonajes = document.getElementById('totalPersonajes');
let personajes = [];
let pagina = 1;




// Mostrar cajas con personajes
function mostrar(array) {
    $tarjeta.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        $tarjeta.innerHTML += `<div class="tarjeta">
        <div class="imagenTarjeta">
        <img class="imagen" src=${array[i].image}>
        </div>
        <div class="contenidoTarjeta">
        <p>Nombre: ${array[i].name}</p>
        <p>Género: ${array[i].gender}</p>
        <p>Especies: ${array[i].species}</p>
        <p>Estado: ${array[i].status}</p>
        <p>Origen: ${array[i].origin.name}</p>
        <p>Locación: ${array[i].location.name}</p>
        </div>
        <div class="vermas">
        <p> VER MÁS...</p>
        </div>
    </div>`
    }
}

// Fech para Api de personajes
function usarFetch(numPagina) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${numPagina}`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            personajes = data.results;
            mostrar(personajes);
            $totalPersonajes.innerHTML = personajes.length;
        });

}

usarFetch(pagina);
$anterior.disabled = true;
$inicio.disabled = true;
$paginaActual.innerHTML = pagina;


//Filtros

function mostrarMujeres() {
    let resultado = personajes.filter((todosPersonajes) => {
        return todosPersonajes.gender === 'Female';
    })
    mostrar(resultado);
    $totalPersonajes.innerHTML = resultado.length;
}

$mujeres.addEventListener('click', mostrarMujeres);

function mostrarHombres() {
    let resultado = personajes.filter((todosPersonajes) => {
        return todosPersonajes.gender === 'Male';
    })
    mostrar(resultado);
    $totalPersonajes.innerHTML = resultado.length;
}

$hombres.addEventListener('click', mostrarHombres);

function mostrarDesconocidos() {
    let resultado = personajes.filter((todosPersonajes) => {
        return todosPersonajes.gender === 'unknown';
    })
    mostrar(resultado);
    $totalPersonajes.innerHTML = resultado.length;
}

$desconocido.addEventListener('click', mostrarDesconocidos);

function mostrarSingenero() {
    let resultado = personajes.filter((todosPersonajes) => {
        return todosPersonajes.gender === 'Genderless';
    })
    mostrar(resultado);
    $totalPersonajes.innerHTML = resultado.length;
}

$singenero.addEventListener('click', mostrarSingenero);

function mostrarTodos() {
    let resultado = personajes.filter((todosPersonajes) => {
        return todosPersonajes;
    })
    mostrar(resultado);
    $totalPersonajes.innerHTML = resultado.length;
}

$todos.addEventListener('click', mostrarTodos);



//Paginado

function primerPagina() {
    pagina = 1;
    usarFetch(1);
    $anterior.disabled = true;
    $inicio.disabled = true;
    $siguiente.disabled = false;
    $final.disabled = false;
    $paginaActual.innerHTML = pagina;
}

$inicio.addEventListener('click', primerPagina);

function anteriorPagina() {
    pagina--;
    if (pagina === 1) {
        $anterior.disabled = true;
        $inicio.disabled = true;
    } else if (pagina === 42) {
        $siguiente.disabled = true;
        $final.disabled = true;
    } else {
        $siguiente.disabled = false;
        $anterior.disabled = false;
        $final.disabled = false;
        $inicio.disabled = false;
    }
    usarFetch(pagina);
    $paginaActual.innerHTML = pagina;

}

$anterior.addEventListener('click', anteriorPagina);


function siguientePagina() {
    pagina++;
    if (pagina === 1) {
        $anterior.disabled = true;
        $inicio.disabled = true;
    } else if (pagina === 42) {
        $siguiente.disabled = true;
        $final.disabled = true;
    } else {
        $siguiente.disabled = false;
        $anterior.disabled = false;
        $final.disabled = false;
        $inicio.disabled = false;
    }
    usarFetch(pagina);
    $paginaActual.innerHTML = pagina;

}

$siguiente.addEventListener('click', siguientePagina);

function ultimaPagina() {
    pagina = 42;
    usarFetch(42);
    $siguiente.disabled = true;
    $final.disabled = true;
    $anterior.disabled = false;
    $inicio.disabled = false;
    $paginaActual.innerHTML = pagina;

}

$final.addEventListener('click', ultimaPagina)


// Botón buscar página

function apretar() {
    let numero = parseInt(prompt("Introduzca la página:", 1));

    if (numero < 1 || numero > 42 || isNaN(numero) === true) {
        alert('Has introducido un número inválido');
    } else if (numero === 1) {
        usarFetch(1);
        pagina = numero;
        $paginaActual.innerHTML = numero;
        $anterior.disabled = true;
        $inicio.disabled = true;
        $siguiente.disabled = false;
        $final.disabled = false;
    } else if (numero === 42) {
        usarFetch(42);
        pagina = numero;
        $siguiente.disabled = true;
        $final.disabled = true;
        $anterior.disabled = false;
        $inicio.disabled = false;
        $paginaActual.innerHTML = numero;

    } else {
        usarFetch(numero);
        pagina = numero;
        $paginaActual.innerHTML = numero;
        $siguiente.disabled = false;
        $anterior.disabled = false;
        $final.disabled = false;
        $inicio.disabled = false;
    }
}