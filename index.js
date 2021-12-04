const botonAgregarUsuario = document.getElementById("boton-submit");
const inputNombreUsuario = document.getElementById("user-name");
const inputEmailUsuario = document.getElementById("user-mail");
const inputDireccionUsuario = document.getElementById("user-address");
const inputTelefonoUsuario = document.getElementById("user-number");
const tablaDeUsuarios = document.getElementById("tabla-usuarios");
const textoAdvertencia = document.querySelector(".texto-advertencia");
const camposRequeridos = document.querySelectorAll(".requerido");
const body = document.querySelector("body");
const contenedorFormulario = document.querySelector(".contenedor-formulario")

//variables Auxiliares 
let camposEnBlanco = false;
let valoresPreviosAEditar = []

const actualizarListaBotonesEliminar = () => {
  let listaBotonesEliminar = document.querySelectorAll(".botones-eliminar");
  return listaBotonesEliminar
}


const informacionApi = () => {
  fetch("https://601da02bbe5f340017a19d60.mockapi.io/users")
    .then((res) => res.json())
    .then((data) => {
      tablaEnHTML(data)
    })
}



const tablaEnHTML = (data) => {
  let tabla = data.reduce((acc, element) => {
    return acc + ` 
      <tr>
        <td>${element.fullname}</td>
        <td>${element.email}</td>
        <td>${element.address}</td>
        <td>${element.phone}</td>
        <td><button class="botones-eliminar acciones" data-id="${element.id}">Eliminar</button>
          <button class="botones-editar acciones" data-id="${element.id}">Editar</button>
        </td>
      </tr>
      `
  }, `
      <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>Direccion</th>
        <th>Telefono</th>
        <th>Acciones</th>
      </tr>
      `)

  tablaDeUsuarios.innerHTML = tabla;
  eliminarUsuario()
  editarUsuario()
}



const crearNuevoUsuarioAPI = (user) => {
  fetch("https://601da02bbe5f340017a19d60.mockapi.io/users", {
    method: "POST", 
    body: JSON.stringify(user), 
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => res.json())
  .then (()=> {
    informacionApi()
  })
}


botonAgregarUsuario.onclick = (e) => {
  e.preventDefault();
  
  let nuevoUsuario = {
    fullname: inputNombreUsuario.value,
    email: inputEmailUsuario.value,
    address: inputDireccionUsuario.value,
    phone: inputTelefonoUsuario.value,
  }

  camposRequeridos.forEach((input)=> {
    if (input.value.length == 0) {
      camposEnBlanco = true
      textoAdvertencia.classList.remove("ocultar")
    }
  })

  if(!camposEnBlanco) {
    crearNuevoUsuarioAPI(nuevoUsuario)
  }
  
}



const eliminarUsuarioEnLaApi = (id) => {
  fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`, {
    method: "DELETE",
  }).then((res) => res.json())
    .then(() => {
      informacionApi()
    })
}


const eliminarUsuario = () => {
  let listaBotonesEliminar = actualizarListaBotonesEliminar();
  listaBotonesEliminar.forEach((boton)=> {
    boton.onclick = () => {
      let idElemento = boton.dataset.id
      eliminarUsuarioEnLaApi(idElemento)
    }
  })
}


const obtenerUsuarioAEditar = (id) => {
  fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`)
  .then((res) => res.json())
    .then((data) => {
      let guardar = data
      return guardar
    })
}


const editarUsuario = () => {
  let listaBotonesEditar = document.querySelectorAll(".botones-editar")
  listaBotonesEditar.forEach((boton)=> {
    boton.onclick = () => {
      let idElemento = boton.dataset.id

      tablaDeUsuarios.classList.add("oscurecer");
      contenedorFormulario.classList.add("posicion");
      let prueba = obtenerUsuarioAEditar(idElemento)
      console.log(prueba)
      

    }
  })
}






camposRequeridos.forEach ((input)=> {
  input.oninput = () => {
    textoAdvertencia.classList.add("ocultar")
    camposEnBlanco = false;
  }
})






informacionApi()

//cambiar id por data-id:${element.id}
//dataset.id

//