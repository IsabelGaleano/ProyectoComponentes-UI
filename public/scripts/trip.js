

let idViajeFinal = "";
let diaTemp = "";
document.addEventListener('DOMContentLoaded', async () => {

    var data = sessionStorage.getItem('idViaje');
    idViajeFinal = data;
    await cargarViaje(data);
    await cargarDias(data);

    document.querySelectorAll('.addLugar').forEach(item => {

        item.addEventListener('click', event => {
            document.getElementById("idViajeHidden").value = item.id;

        })
    });

    document.querySelectorAll('.actDiaL').forEach(item => {

        item.addEventListener('click', event => {
            cargarDiaActualizar(item.id);

        })
    });


}, false);

const cargarViaje = (idViaje) => {
    return new Promise((resolve, reject) => {

        fetch(`http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/viajeDef/${idViaje}`, {
            mode: "cors",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            }
        })
            .then(
                response => {
                    return response.json();
                }
            )
            .then(
                json => {

                    console.log(json);
                    document.getElementById("periodoViaje").innerHTML = json.fechaInicio + " - " + json.fechaFin;
                    document.getElementById("descripcionViaje").innerHTML = json.descripcion;
                    document.getElementById("destinoViaje").innerHTML = json.descripcion;

                    let numberPhoto = Math.floor(Math.random() * (15 - 1)) + 1;
                    document.getElementById("imgViaje").src = `../assets/assetsTripnary/img/imgTrips/${numberPhoto}.jpg`;

                    resolve();
                }
            ).catch(e => {
                reject(e);
            })
    });
}

const cargarDias = (idViaje) => {
    return new Promise((resolve, reject) => {

        fetch(`http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/dia_viajeDef/`, {
            mode: "cors",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            }
        })
            .then(
                response => {
                    return response.json();
                }
            )
            .then(
                json => {

                    console.log(json);
                    let dias = [];
                    if (json != undefined) {
                        for (let i = 0; i < json.length; i++) {
                            if (json[i].id_viaje == idViaje) {

                                dias.push(json[i]);
                            }

                        }
                        let listadoDias = "";
                        console.log(dias);
                        for (let i = 0; i < dias.length; i++) {
                            let fecha = new Date(dias[i].fecha_dia);

                            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                            let dateCapitalize = fecha.toLocaleDateString('es-ES', options)[0].toUpperCase() + fecha.toLocaleDateString('es-ES', options).slice(1);

                            listadoDias += `<li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                           
                            <div class="d-flex flex-column lugar" id="${dias[i].id_dia}">
                                <h6 class="mb-3 text-sm">${dateCapitalize}</h6>
                                
                            </div>
                            <div class="ms-auto text-end">
                                <a id="${dias[i].id_dia}" class="btn btn-link text-danger text-gradient px-3 mb-0 delDia"
                                    href="javascript:;"><i class="far fa-trash-alt me-2"></i>Eliminar</a>
                                <button class="btn btn-link text-dark px-3 mb-0 actDiaL" id="${dias[i].id_dia}" data-bs-toggle="modal" data-bs-target="#myModal"><i
                                        class="fas fa-pencil-alt text-dark me-2"
                                        aria-hidden="true"></i>Editar</button>
                                <a class="btn btn-link text-dark px-3 mb-0 addLugar" id="${dias[i].id_dia}" href="javascript:;" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                <i class="fas fa-plus text-dark me-2">
                                </i>Agregar</a>
                            </div>
                        </li>`;

                        }

                        document.getElementById('listadoDias').insertAdjacentHTML("beforeend", listadoDias);

                        var elementLugares = document.getElementsByClassName('lugar');
                        let listadoLugares = "";

                        for (var i = 0; i < elementLugares.length; i++) {
                            console.log(elementLugares[i].id);
                            let idDia = elementLugares[i].id;
                            fetch(`http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/lugarDef/`, {
                                mode: "cors",
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Content-type': 'application/json'
                                }
                            })
                                .then(
                                    response => {
                                        return response.json();
                                    }
                                )
                                .then(
                                    json => {

                                        console.log(json.length);
                                        for (let j = 0; j < json.length; j++) {

                                            if (idDia == json[j].id_dia) {
                                                let timeLugar = new Date(json[j].hora);

                                                listadoLugares += `<span class="mb-2 text-xs">${timeLugar.toLocaleTimeString(timeLugar)}<span
                                                class="text-dark font-weight-bold ms-sm-2">${json[j].nombre}</span></span>`;
                                                /*listadoLugares += `<div class="row">
                                                    <div class="col-md-8 d-flex align-items-center">
                                                        <span class="mb-2 text-xs">${timeLugar.toLocaleTimeString(timeLugar)}<span
                                                            class="text-dark font-weight-bold ms-sm-2">${json[j].nombre}</span></span>
                                                    </div>
                                                    <div class="col-md-1 d-flex align-items-center text-end">
                                                        <a href="javascript:;">
                                                            <i class="fas fa-trash-alt text-secondary text-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="" aria-hidden="true" data-bs-original-title="Edit Profile" aria-label="Edit Profile"></i><span class="sr-only">Edit Profile</span>
                                                        </a>
                                                        <a href="javascript:;">
                                                        <i class="fas fa-trash-alt text-secondary text-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="" aria-hidden="true" data-bs-original-title="Edit Profile" aria-label="Edit Profile"></i><span class="sr-only">Edit Profile</span>
                                                    </a>
                                                    </div>
                                                </div>`*/



                                            }


                                        }

                                        document.getElementById(idDia).insertAdjacentHTML("beforeend", listadoLugares);
                                        listadoLugares = "";


                                    }
                                )




                        }

                        document.querySelectorAll('.delDia').forEach(item => {

                            item.addEventListener('click', event => {
                                Swal.fire({
                                    title: 'Está seguro?',
                                    text: "No se puede revertir!",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Sí, eliminarlo!'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        eliminarDia(item.id);
                                        Swal.fire(
                                            'Eliminado!',
                                            'El dia fue eliminado.',
                                            'success'
                                        )
        
                            
                                        
                                    }
                                })
        
        
                            })
                        });

                        



                    }

                    resolve();
                }
            ).catch(e => {
                reject(e);
            })
    });
}

document.getElementById('registrarDia').addEventListener("click", () => {
    registrarDia(idViajeFinal);

});

document.getElementById('registrarLugar').addEventListener("click", () => {
    let idDia = document.getElementById("idViajeHidden").value;
    let nombre = document.getElementById('nombreLugarR').value;
    let hora = document.getElementById('horaRlugar').value;
    registrarLugar(idDia, nombre, hora);


});

document.getElementById('cerrarAct').addEventListener("click", () => {
    var div = document.getElementById('div');
    document.getElementById('idDiaHidden').value = "";
    diaTemp = ""
    if (div !== null) {
        while (div.hasChildNodes()) {
            div.removeChild(div.lastChild);
        }
    }


});

document.getElementById('actualizarDiaLugar').addEventListener("click", async () => {

    document.querySelectorAll('.datosAct').forEach(async (item) => {

        console.log(item);
        console.log(diaTemp);
        let divHorario = item.firstElementChild;
        let valueHora = divHorario.lastElementChild.value;

        let divNombreLugar = item.lastElementChild;
        let valueNombre = divNombreLugar.lastElementChild.value;
        console.log(valueNombre);
        await actualizarLugares(item.id, valueNombre, valueHora);


    });

    diaTemp.fecha_dia = document.getElementById('fechaDiaAct').value;
    await actualizarDia(diaTemp);





});


const registrarDia = (idViaje) => {
    var data = {
        id_dia: "0",
        fecha_dia: document.getElementById('fechaDia').value,
        comentarios: document.getElementById('comentariosDia').value,
        id_viaje: idViaje,
        estado: "activo"
    }

    console.log(data);

    fetch("http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/dia_viajeDef/", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        }
    })
        .then(
            response => {
                if (response.ok) {
                    console.log('Dia creado');


                } else {
                    console.log('El dia ya existe');

                }


                return response.json();

            }
        )
        .then(
            json => {

                console.log(json);
                let nombre = document.getElementById('nombreLugar').value;
                let hora = document.getElementById('horaLugar').value;
                registrarLugar(json.id_dia, nombre, hora);

            }
        )

}

const registrarLugar = (idDia, vnombre, vhora) => {
    var data = {
        id_lugar: "0",
        nombre: vnombre,
        hora: vhora,
        comentarios: "Sin comentarios",
        id_dia: idDia,
        estado: "activo"
    }

    fetch("http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/lugarDef/", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        }
    })
        .then(
            response => {
                if (response.ok) {
                    console.log('Dia creado');


                } else {
                    console.log('El dia ya existe');

                }


                return response.json();
            }
        )
        .then(
            json => {

                console.log(json);
                location.reload();

            }
        )

}

const cargarDiaActualizar = (idDia) => {
    let response;
    fetch(`http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/dia_viajeDef/${idDia}`, {
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        }
    })
        .then(
            response => {
                return response.json();
            }
        )
        .then(
            json => {

                document.getElementById('fechaDiaAct').value = formatDate(json.fecha_dia);
                document.getElementById('idDiaHidden').value = idDia;
                diaTemp = json;
                cargarLugarActualizar(idDia);




            }
        )


}

const cargarLugarActualizar = (idDia) => {
    let response;
    fetch(`http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/lugarDef`, {
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        }
    })
        .then(
            response => {
                return response.json();
            }
        )
        .then(
            json => {

                let lugares = [];
                if (json != undefined) {
                    for (let i = 0; i < json.length; i++) {
                        if (json[i].id_dia == idDia) {

                            lugares.push(json[i]);
                        }

                    }

                }
                let listadoLugares = "";
                if (lugares != undefined) {
                    for (let i = 0; i < lugares.length; i++) {
                        let d = new Date(lugares[i].hora);
                        let dateTimeLocalValue = (new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);

                        listadoLugares += `<div class="row datosAct" id="${lugares[i].id_lugar}">
                        <div class="col">
                            <label for="validationCustom01" class="form-label">Horario
                            </label>
                            <input type="datetime-local" class="form-control" id="horaLugarAct" value="${dateTimeLocalValue}"
                                placeholder="">
                        </div>
                        <div class="col">

                            <div class="row">
                                <div class="col-md-8 d-flex align-items-center">
                                    <label for="validationCustom01" class="form-label">Nombre
                                        del lugar </label>
                                </div>
                                <div class="col-md-1 d-flex align-items-center text-end">
                                    <a id="${lugares[i].id_lugar}" class="lugarDel" href="javascript:;">
                                        <i class="fas fa-trash-alt text-secondary text-sm"
                                            data-bs-toggle="tooltip" data-bs-placement="top"
                                            title="" aria-hidden="true"
                                            data-bs-original-title="Eliminar lugar"
                                            aria-label="Eliminar lugar"></i><span
                                            class="sr-only">Eliminar lugar</span>
                                    </a>

                                    </a>
                                </div>
                            </div>

                            <input type="text" class="form-control" id="nombreLugarAct" value="${lugares[i].nombre}" 
                                required>


                        </div>

                    </div>`;
                    }

                }



                document.getElementById("listadoLugaresAct").insertAdjacentHTML("beforeend", listadoLugares);

                console.log(lugares);
                document.querySelectorAll('.lugarDel').forEach(item => {

                    item.addEventListener('click', event => {
                        Swal.fire({
                            title: 'Está seguro?',
                            text: "No se puede revertir!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí, eliminarlo!'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                eliminarLugares(item.id);
                                Swal.fire(
                                    'Eliminado!',
                                    'El lugar fue eliminado.',
                                    'success'
                                )

                    
                                
                            }
                        })

                    })
                });



            }
        )


}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


const actualizarDia = (data) => {
    return new Promise((resolve, reject) => {


        fetch("http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/dia_viajeDef/", {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            }
        })
            .then(
                response => {
                    if (response.ok) {
                        console.log('Dia actualizado');


                    } else {
                        console.log('El dia no existe');

                    }


                    return response.json();
                }
            )
            .then(
                json => {


                    console.log(json);
                    location.reload();
                    resolve();
                }
            ).catch(e => {
                reject(e);
            })
    });

}

const actualizarLugares = (idLugar, vnombre, vhora) => {
    return new Promise((resolve, reject) => {

        var data = {
            id_lugar: idLugar,
            nombre: vnombre,
            hora: vhora,
            comentarios: "Sin comentarios",
            id_dia: document.getElementById('idDiaHidden').value,
            estado: "activo"
        }

        fetch("http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/lugarDef/", {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            }
        })
            .then(
                response => {
                    if (response.ok) {
                        console.log('Lugar actualizado');


                    } else {
                        console.log('El lugar no existe');

                    }


                    return response.json();
                }
            )
            .then(
                json => {


                    console.log(json);
                    resolve();
                }
            ).catch(e => {
                reject(e);
            })
    });

}

const eliminarLugares = (idLugar) => {
    fetch(`http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/lugarDef/${idLugar}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json'
                }
            })
                .then(
                    response => {
                        if (response.ok) {
                            console.log('Usuario eliminado');
    
    
                        } else {
                            console.log('El usuario no existe');
    
                        }
    
    
                        return response.json();
                    }
                )
                .then(
                    json => {
    
    
                        console.log(json);
                        setTimeout(function(){
                            location.reload();
                        }, 1000);
                        
                
                    }
                )
}


const eliminarDia = (idDia) => {
    fetch(`http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/dia_viajeDef/${idDia}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json'
                }
            })
                .then(
                    response => {
                        if (response.ok) {
                            console.log('Usuario eliminado');
    
    
                        } else {
                            console.log('El usuario no existe');
    
                        }
    
    
                        return response.json();
                    }
                )
                .then(
                    json => {
    
    
                        console.log(json);
                        setTimeout(function(){
                            location.reload();
                        }, 1000);
                        
                
                    }
                )
}

