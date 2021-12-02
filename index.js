const botonAgregarUsuario = document.getElementById("boton-submit");
const formularioNuevoUsuario = document.getElementById("formulario-nuevo-usuario");
const inputNombreUsuario = document.getElementById("user-name");
const inputEmailUsuario = document.getElementById("user-mail");
const inputDireccionUsuario = document.getElementById("user-address");
const inputTelefonoUsuario = document.getElementById("user-number");
const tablaDeUsuarios = document.getElementById("tabla-usuarios");



fetch("https://601da02bbe5f340017a19d60.mockapi.io/users")
.then((res) => res.json())
.then((data) => {
  tablaEnHTML(data)
})

const tablaEnHTML = (data) => {
    let tabla = data.reduce((acc,element) => {
        return acc + ` 
      <tr>
        <td>${element.fullname}</td>
        <td>${element.email}</td>
        <td>${element.address}</td>
        <td>${element.phone}</td>
        <td><button id="${element.id}">Editar usuario</button></td>
      </tr>
      `
    },`
      <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>Direccion</th>
        <th>Telefono</th>
        <th>Acciones</th>
      </tr>
      `)

    tablaDeUsuarios.innerHTML = tabla;
}

botonAgregarUsuario.onclick = (e) => {
    e.preventDefault();
    let nuevoUsuario = {
        fullname: inputNombreUsuario,
        email: inputEmailUsuario,
        address: inputDireccionUsuario,
        phone: inputNombreUsuario,
    }
    crearNuevoUsuarioAPI(nuevoUsuario)
}

const crearNuevoUsuarioAPI = (user) => {
  fetch("https://601da02bbe5f340017a19d60.mockapi.io/users", {
    method: "POST", 
    body: JSON.stringify(user), 
    headers: {
      "Content-Type": "application/json"
    }
  }).then((res) => res.json())
  .then((data) => {
    console.log(data)
  })
}