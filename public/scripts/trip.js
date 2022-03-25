

let idViajeFinal = "";
document.addEventListener('DOMContentLoaded', async () => {

    var data = sessionStorage.getItem('idViaje');
    idViajeFinal = data;
    await cargarViaje(data);
    await cargarDias(data);


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
                                dias[i] = json[i];
                            }

                        }
                        let listadoDias = "";
                        for (let i = 0; i < dias.length; i++) {
                            let fecha = new Date(dias[i].fecha_dia);

                            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                            let dateCapitalize = fecha.toLocaleDateString('es-ES', options)[0].toUpperCase() + fecha.toLocaleDateString('es-ES', options).slice(1);

                            listadoDias += `<li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                           
                            <div class="d-flex flex-column lugar" id="${dias[i].id_dia}">
                                <h6 class="mb-3 text-sm">${dateCapitalize}</h6>
                                
                            </div>
                            <div class="ms-auto text-end">
                                <a class="btn btn-link text-danger text-gradient px-3 mb-0"
                                    href="javascript:;"><i class="far fa-trash-alt me-2"></i>Eliminar</a>
                                <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i
                                        class="fas fa-pencil-alt text-dark me-2"
                                        aria-hidden="true"></i>Editar</a>
                                <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i class="fas fa-plus text-dark me-2 addLugar" 
                                    id="${dias[i].id_dia}">
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


                                            }


                                        }

                                        document.getElementById(idDia).insertAdjacentHTML("beforeend", listadoLugares);
                                        listadoLugares = "";


                                    }
                                )




                        }



                    }

                    resolve();
                }
            ).catch(e => {
                reject(e);
            })
    });
}

document.getElementById('registrarDia').addEventListener("click", function () {
    registrarDia(idViajeFinal);

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
                registrarLugar(json.id_dia);

            }
        )

}

const registrarLugar = (idDia) => {
    var data = {
        id_lugar: "0",
        nombre: document.getElementById('nombreLugar').value,
        hora: document.getElementById('horaLugar').value,
        estado: "Sin comentarios",
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
                document.getElementById('cerrarModalDia').click();
            }
        )

}