api = 'https://62ab4127bd0e5d29af0bd51d.mockapi.io/mascota'

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

/** Eliminar un registro */
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
            col2.innerHTML = element.nombre;
            var col3 = document.createElement("TD");
            col3.innerHTML = element.raza;
            var col4 = document.createElement("TD");
            col4.innerHTML = element.edad;
            var col5 = document.createElement("TD");
            col5.innerHTML = element.sexo;
            var col6 = document.createElement("TD");
            col6.innerHTML = `<a class="btn me-1 px-4" id="btnEditar" id="modificar" href="#" onclick="">
                                    Editar
                               </a>
                               <a class="btn px-3" id="paint" id="modificar" href="#" onclick="eliminar(${element.id})">  
                                    Eliminar
                               </a>`;
            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);
            row.appendChild(col5);
            row.appendChild(col6);
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
    document.getElementById("nombre").value = "";
    document.getElementById("raza").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("sexo").value = "";
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
        nombre: document.getElementById("nombre").value,
        raza: document.getElementById("raza").value,
        edad: document.getElementById("edad").value,
        sexo: document.getElementById("sexo").value,
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
            col2.innerHTML = data.nombre;
            var col3 = document.createElement("TD");
            col3.innerHTML = data.raza;
            var col4 = document.createElement("TD");
            col4.innerHTML = data.edad;
            var col5 = document.createElement("TD");
            col5.innerHTML = data.sexo;
            var col6 = document.createElement("TD");
            col6.innerHTML = `<a class="btn me-1 my1 px-4" id="btnEditar" href="#" onclick="">
                                    Editar
                               </a>
                               <a class="btn mt-1 px-3" id="paint" id="modificar" href="#" onclick="eliminar(${data.id})">  
                                    Eliminar
                               </a>`;
            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);
            row.appendChild(col5);
            row.appendChild(col6);
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