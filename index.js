const botonAgregarUsuario = document.getElementById("boton-submit");
const formularioNuevoUsuario = document.getElementById("formulario-nuevo-usuario");
const inputNombreUsuario = document.getElementById("user-name");
const inputEmailUsuario = document.getElementById("user-mail");
const inputDireccionUsuario = document.getElementById("user-address");
const inputTelefonoUsuario = document.getElementById("user-number");
const tablaDeUsuarios = document.getElementById("tabla-usuarios");



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
        <td><button class="botones-eliminar acciones" id="eliminar${element.id}">Eliminar</button>
          <button class="botones-editar acciones" id="editar${element.id}">Editar</button>
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
}



const crearNuevoUsuarioAPI = (user) => {
  fetch("https://601da02bbe5f340017a19d60.mockapi.io/users", {
    method: "POST", 
    body: JSON.stringify(user), 
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => res.json())
  .then ((data)=> {
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
  crearNuevoUsuarioAPI(nuevoUsuario)
}



const eliminarUsuarioEnLaApi = (id) => {
  fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`, {
  method: "DELETE", 
  headers: {
    "Content-Type": "application/json"
  }
}).then((res) => res.json())
.then((data) => {
  informacionApi()
})

}


const eliminarUsuario = () => {
  let listaBotonesEliminar = actualizarListaBotonesEliminar();
  listaBotonesEliminar.forEach((boton)=> {
    boton.onclick = () => {
      let cantidadLetrasPalabraEliminar = 8;
      let botonEliminarId = boton.id;
      let idLimpio = botonEliminarId.slice(cantidadLetrasPalabraEliminar)
      eliminarUsuarioEnLaApi(idLimpio)
    }
  })
}


informacionApi()