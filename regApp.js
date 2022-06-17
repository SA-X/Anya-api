//API de MockAPI
api = 'https://62ab4127bd0e5d29af0bd51d.mockapi.io/usuario';

getAll = async function () {
    try {
        const respuesta = await fetch(this.api);
        //const data = await respuesta.json();
        if (respuesta.status == 200) {
            let json = await respuesta.json(); // (3)
            //console.log(json);
            return json;
        }
    } catch (error) {
        console.log("ERROR: " + error)
    }
};

/** Eliminar un registro de una pizza */
eliminar = async function (id) {
    try {
        const respuesta = await fetch(api + '/' + id, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        const data = await respuesta.json();
        if (respuesta.status == 200) {
            console.log("Registro eliminado: " + data)
            var item = document.getElementById("row-" + id);
            item.parentNode.removeChild(item);
            alert("Registro eliminado!")
        }
    } catch (error) {
        console.log("ERROR: " + error)
    }
};

/** Crear un nuevo registro de usuario */
guardar = async function (usuario) {
    try {
        const respuesta = await fetch(api, {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        const data = await respuesta.json();
        if (respuesta.status == 201) {
            console.log("Registro creado!")
            return data;
        }
    } catch (error) {
        console.log("ERROR: " + error)
    }
};

/** METODOS PARA LA INTERFAZ GRÁFICA */
/** Función que carga los datos del Api una vez se termina de cargar la
página*/
function cargarDatos() {
    var tablaDatos = document.getElementById("tblDatos");
    var tBodyDatos = document.getElementById("tbdDatos");
    const todos = getAll()
    .then(data => {
        //console.log(data);
        //Varible global
        datosJson = data;
        data.forEach((element, index) => {
            //Por cada registro obtenido se crea una nueva fila y se agrega al Body de la tabla
            var row = document.createElement("TR");
            var col1 = document.createElement("TD");
            col1.innerHTML = element.id;
            var col2 = document.createElement("TD");
            col2.innerHTML = element.cc;
            var col3 = document.createElement("TD");
            col3.innerHTML = element.nombre;
            var col4 = document.createElement("TD");
            col4.innerHTML = element.apellido;
            var col5 = document.createElement("TD");
            col5.innerHTML = element.correo;
            var col6 = document.createElement("TD");
            col6.innerHTML = element.passwd;
            var col7 = document.createElement("TD");
            col7.innerHTML = element.user;
            var col8 = document.createElement("TD");
            col8.innerHTML = element.sexo;
            var col9 = document.createElement("TD");
            col9.innerHTML = element.telefono;
            var col10 = document.createElement("TD");
            col10.innerHTML = `<a class="btn me-1 my1" id="modificar" href="#" onclick="">
                                    Modificar
                               </a>
                               <a class="r btn mt-1 px-3" id="paint" id="modificar" href="#" onclick="eliminar(${element.id})">  
                                    Eliminar
                               </a>`;
            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);
            row.appendChild(col5);
            row.appendChild(col6);
            row.appendChild(col7);
            row.appendChild(col8);
            row.appendChild(col9);
            row.appendChild(col10);
            row.id = "row-" + element.id
            tBodyDatos.appendChild(row);
        });
    });
}

/** Función para ver formulario para agregar pizza */
document.getElementById("btnAgregar").addEventListener("click", (e) => {
    seccion = document.getElementById("seccionFormulario");
    seccion.classList.remove("d-none");
    e.preventDefault();
});

/** Función que sirve para limpiar los datos del formulario */
function limpiarFormulario() {
    /** Limpiar datos del formulario */
    document.getElementById("cc").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("passwd").value = "";
    document.getElementById("user").value = "";
    document.getElementById("sexo").value = "";
    document.getElementById("telefono").value = "";
}

/** Función para ocultar formulario */
document.getElementById("btnCancelar").addEventListener("click", (e) => {
    seccion = document.getElementById("seccionFormulario");
    seccion.classList.add("d-none");
    /** Limpiar datos del formulario */
    limpiarFormulario()
    e.preventDefault();
});

/** Función para ver formulario para agregar pizza */
document.getElementById("btnGuardar").addEventListener("click", (e) => {
    usuario = {
        //Creamos el objeto a partir de los datos ingresados en el formulario
        cc: document.getElementById("cc").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        correo: document.getElementById("correo").value,
        passwd: document.getElementById("passwd").value,
        user: document.getElementById("user").value,
        sexo: document.getElementById("sexo").value,
        telefono: document.getElementById("telefono").value
    }

    guardar(usuario)
        .then(response => {
            console.log(response)
            return response
        })
        .then(data => {
            console.log(data)
            alert("Registro creado con éxito!")
            //Se agrega nueva fila y se agrega al Body de la tabla
            var tBodyDatos = document.getElementById("tbdDatos");
            var row = document.createElement("TR");
            var col1 = document.createElement("TD");
            col1.innerHTML = data.id;
            var col2 = document.createElement("TD");
            col2.innerHTML = data.cc;
            var col3 = document.createElement("TD");
            col3.innerHTML = data.nombre;
            var col4 = document.createElement("TD");
            col4.innerHTML = data.apellido;
            var col5 = document.createElement("TD");
            col5.innerHTML = data.correo;
            var col6 = document.createElement("TD");
            col6.innerHTML = data.passwd;
            var col7 = document.createElement("TD");
            col7.innerHTML = data.user;
            var col8 = document.createElement("TD");
            col8.innerHTML = data.sexo;
            var col9 = document.createElement("TD");
            col9.innerHTML = data.telefono;
            var col10 = document.createElement("TD");
            col10.innerHTML = `<a class="btn me-1 my1" id="modificar" href="#" onclick="">
                                    Modificar
                               </a>
                               <a class="r btn mt-1 px-3" id="modificar" href="#" onclick="eliminar(${element.id})">  
                                    Eliminar
                               </a>`;
            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);
            row.appendChild(col5);
            row.appendChild(col6);
            row.appendChild(col7);
            row.appendChild(col8);
            row.appendChild(col9);
            row.appendChild(col10);
            row.id = "row-" + data.id
            tBodyDatos.appendChild(row);
            /** Limpiar datos del formulario */
            limpiarFormulario()
        })
        .catch(function (err) {
            console.log("Se presento un error en la petición");
            console.error(err);
        });
    e.preventDefault();
});
/** METODOS PARA COMUNICARSE CON LA API CREADA */
// Obtención datos de API
// getAll = async function () {
//     try {
//         const respuesta = await fetch(this.api);

//         if (respuesta.status = 200) {
//             let json = await respuesta.json();
//             return json;
//         }

//     } catch (error) {
//         console.log("¡ERROR! : " + error);
//     }
// };

// Eliminar datos
// eliminar = async function (id) {
//     try {

//         const respuesta = await fetch(api + '/' + id, {
//             method: 'DELET',
//             headers: { "Content-type": "application/json; charset=UTF=-8" }
//         });

//         const data = await respuesta.json();

//         if (respuesta.status == 200) {
//             console.log("Registro eliminado: " + data)
//             var item = document.getElementById("row- " + id);
//             item.parentNode.removeChild(item);
//             alert("Registro eliminado!")
//         }

//     } catch (error) {
//         console.log("ERROR: " + error)
//     }
// };

/**Crear un nuevo registro */
// gurdar = async function (usuario) {
//     try {

//         const respuesta = await fetch(api, {
//             method: "POST",
//             body: JSON.stringify(usuario),
//             headers: { "Content-type": "applicatioon/json; charset=UTF-8" }
//         });

//         const data = await respuesta.json();

//         if (respuesta.status == 201) {
//             console.log("Registro creado!")
//             return data;
//         }
//     } catch (error) {
//         console.log("ERROR:" + error)
//     }
// };

/** funcion que carga los datos del API */
// function cargarDatos() {

//     var tablaDatos = document.getElementById("tblDatos");
//     var tBodyDatos = document.getElementById("tbdDatos");

//     const todos = getAll()
//         .then(data => {
//             //console.log(data);
//             //Varible global
//             datosJson = data;

//             data.forEach((element, index) => {

//                 //Por cada registro obtenido se crea una nueva fila y se agrega al Body de la tabla

//                 var row = document.createElement("TR");
//                 var col1 = document.createElement("TD");
//                 col1.innerHTML = element.id;
//                 var col2 = document.createElement("TD");
//                 col2.innerHTML = element.nombre;
//                 var col3 = document.createElement("TD");
//                 col3.innerHTML = element.apellido;
//                 var col4 = document.createElement("TD");
//                 col4.innerHTML = element.correo;
//                 var col5 = document.createElement("TD");
//                 col5.innerHTML = element.contrasena;
//                 var col6 = document.createElement("TD");
//                 col6.innerHTML = element.nomUser;
//                 var col7 = document.createElement("TD");
//                 col7.innerHTML = element.sexo;
//                 var col8 = document.createElement("TD");
//                 col8.innerHTML = element.telefono;
//                 var col9 = document.createElement("TD");
//                 col9.innerHTML = `<a class="btn btn-success me-1 my1" id="modificar" href="#" onclick="">Modificar</a>
//                                       <a class="btn btn-danger"
//                                       id="modificar" href="#"
//                                       onclick="eliminar(${element.id})">Eliminar</a>`;

//                 row.appendChild(col1);
//                 row.appendChild(col2);
//                 row.appendChild(col3);
//                 row.appendChild(col4);
//                 row.appendChild(col5);
//                 row.appendChild(col6);
//                 row.appendChild(col7);
//                 row.appendChild(col8);
//                 row.appendChild(col9);
//                 row.id = "row-" + element.id
//                 tBodyDatos.appendChild(row);
//             });
//         });
// }

/** Funcion para ver formulario para agregar */
// document.getElementById("btnGuardar").addEventListener("click", (e) => {
//     seccion = document.getElementById("formSection");
//     seccion.classList.remove("d-none");
//     e.preventDefault();
// });


/** Funcion para limpiar datos de Formulario */
// function limpiarFormulario() {
//     document.getElementById("Docuemto").value = "";
//     document.getElementById("Nombre").value = "";
//     document.getElementById("Apellido").value = "";
//     document.getElementById("Correo").value = "";
//     document.getElementById("Contraseña").value = "";
//     document.getElementById("Usuario").value = "";
//     document.getElementById("Sexo").value = "";
//     document.getElementById("Telefono").value = "";
// }

/** Funcion para ocultar formulario */
// document.getElementById("btnCancelar").addEventListener("click", (e) => {
//     seccion = document.getElementById("formSection");
//     seccion.classList.add("d-none");
//     limpiarFormulario()
//     e.preventDefault();
//  });

/** Funcion para ver formulario para agregar usuario */
// document.getElementById("btnGuardar").addEventListener("click", (e) => {
//     usuario = {

//         id: document.getElementById("Documento").value = "",
//         nombre: document.getElementById("Nombre").value = "",
//         apellido: document.getElementById("Apellido").value = "",
//         correo: document.getElementById("Correo").value = "",
//         contrasena: document.getElementById("Contraseña").value = "",
//         nomUser: document.getElementById("Usuario").value = "",
//         sexo: document.getElementById("Sexo").value = "",
//         teléfono: document.getElementById("Telefono").value = ""
//     }

//     guardar(usuario)
//         .then(response => {
//             console.log(response)
//             return response
//         })

//         .then(data => {
//             console.log(data)
//             alert("Registro creado con éxito!")

//             var tBodyDatos = document.getElementById("tbdDatos");
//             var row = document.createElement("TR");
//             var col1 = document.createElement("TD");
//             col1.innerHTML = data.id;
//             var col2 = document.createElement("TD");
//             col2.innerHTML = data.nombre;
//             var col3 = document.createElement("TD");
//             col3.innerHTML = data.apellido;
//             var col4 = document.createElement("TD");
//             col4.innerHTML = data.correo;
//             var col5 = document.createElement("TD");
//             col5.innerHTML = data.contrasena;
//             var col6 = document.createElement("TD");
//             col6.innerHTML = data.nomUser;
//             var col7 = document.createElement("TD");
//             col7.innerHTML = data.sexo;
//             var col8 = document.createElement("TD");
//             col8.innerHTML = data.telefono;
//             var col9 = document.createElement("TD");
//             col9.innerHTML = `<a class="btn btn-success me-1 my-1" id="modificar" href="#"
//             onclick="">Modificar</a> <a class="btn btn-danger" id="modificar"
//             href="#" onclick="eliminar(${data.id})">Eliminar</a>`;

//             row.appendChild(col1);
//             row.appendChild(col2);
//             row.appendChild(col3);
//             row.appendChild(col4);
//             row.appendChild(col5);
//             row.appendChild(col6);
//             row.appendChild(col7);
//             row.appendChild(col8);
//             row.appendChild(col9);
//             row.id = "row-" + data.id
//             tBodyDatos.appendChild(row);


//             /** Limpiar datos del formulario */

//             limpiarFormulario()
//         })

//         .catch(function (err) {
//             console.log("Se presento un error en la petición");
//             console.error(err);
//         });

//     e.preventDefault();

// });

