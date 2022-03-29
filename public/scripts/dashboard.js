
document.addEventListener('DOMContentLoaded', async () => {
    await cargarViajes();

    document.querySelectorAll('.plan').forEach(item => {

        item.addEventListener('click', event => {
            console.log(item.id);
            window.location.replace("../pages/trip.html");
            sessionStorage.setItem('idViaje', item.id);


        })
    });

    document.querySelectorAll('.actViaje').forEach(item => {

        item.addEventListener('click', event => {

            cargarViajeActualizar(item.id);

        })
    });

    document.querySelectorAll('.delViaje').forEach(elem => {

        elem.addEventListener('click', event => {

            advertenciaDelViaje(elem.id);

        })
    });

}, false);

document.getElementById('registrarViaje').addEventListener("click", function () {
    let valueButton = document.getElementById('registrarViaje').value;
    if (valueButton == "actualizar") {
        actualizarViaje();
    } else {
        registrarViaje();
    }

    document.getElementById('cerrarModal').click();

});

document.getElementById('cerrarModal').addEventListener("click", function () {
    document.getElementById('idViajeHidden').value = "";
    document.getElementById('descripcionViaje').value = "";
    document.getElementById('fechaInicio').value = "";
    document.getElementById('fechaFin').value = "";
    document.getElementById('destinoViaje').value = "";

});



const cargarViajes = () => {
    return new Promise((resolve, reject) => {


        let idUsuario = "2"; //Es temporal
        fetch(`http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/viajeDef/getByUser/${idUsuario}`, {
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

                    let listadoViajes = "";


                    if (json[0] != undefined) {
                        for (let i = 0; i < json.length; i++) {
                            let numberPhoto = Math.floor(Math.random() * (15 - 1)) + 1;

                            listadoViajes += `<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 "style="padding-bottom: 60px;">
                        <div class="card card-blog card-plain">
                            <div class="ms-auto text-end">
                                <button type="button" class="btn btn-link text-dark px-1 mb-0 actViaje" id="${json[i].idViaje}"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <i class="fas fa-pencil-alt text-dark me-2"
                                        aria-hidden="true"></i>
                                </button>
                                <a class="btn btn-link text-danger text-gradient px-1 mb-0 delViaje" id="${json[i].idViaje}" 
                                href="javascript:;"><i class="far fa-trash-alt me-2"></i></a>
                            </div>
                            <div class="position-relative">
                                <a class="d-block shadow-xl border-radius-xl">
                                    <img src="../assets/assetsTripnary/img/imgTrips/${numberPhoto}.jpg" alt="img-blur-shadow"
                                        class="img-fluid shadow border-radius-xl" width="1920" height="1095">
                                </a>
                            </div>
                            <div class="card-body px-1 pb-0">
                                <p class="text-gradient text-dark mb-2 text-sm">Planificador #${i + 1}</p>
                                <a href="javascript:;">
                                    <h5>
                                        ${json[i].destino}
                                    </h5>
                                </a>
                                <p class="mb-4 text-sm">
                                    ${json[i].descripcion}
                                </p>
                                <div class="d-flex align-items-center justify-content-between">
                                
                                    <button type="button" class="btn btn-outline-primary btn-sm mb-0 plan w-100" 
                                    id="${json[i].idViaje}">
                                        Ver plan
                                    </button>
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>`;
                        }


                    }
                    //document.getElementById('listadoViajes').innerHTML = listadoViajes;
                    document.getElementById('listadoViajes').insertAdjacentHTML("beforeend", listadoViajes);
                    console.log(json);
                    resolve();
                }
            ).catch(e => {
                reject(e);
            })
    });
}

const registrarViaje = () => {
    var data = {
        idViaje: "0",
        descripcion: document.getElementById('descripcionViaje').value,
        fechaInicio: document.getElementById('fechaInicio').value,
        fechaFin: document.getElementById('fechaFin').value,
        destino: document.getElementById('destinoViaje').value,
        idUsuario: "2",
        estado: "activo"
    }

    fetch("http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/viajeDef", {
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
                    console.log('Viaje creado');


                } else {
                    console.log('El viaje ya existe');

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

const actualizarViaje = () => {
    var data = {
        idViaje: document.getElementById('idViajeHidden').value,
        descripcion: document.getElementById('descripcionViaje').value,
        fechaInicio: document.getElementById('fechaInicio').value,
        fechaFin: document.getElementById('fechaFin').value,
        destino: document.getElementById('destinoViaje').value,
        idUsuario: "2",
        estado: "activo"
    }

    fetch("http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/viajeDef/", {
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
                    console.log('Viaje actualizado');


                } else {
                    console.log('El viaje no existe');

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

const cargarViajeActualizar = (idViaje) => {
    let response;
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
                document.getElementById('registrarViaje').innerText = 'Actualizar';
                document.getElementById('idViajeHidden').value = idViaje;
                document.getElementById('descripcionViaje').value = json.descripcion;
                document.getElementById('fechaInicio').value = json.fechaInicio;
                document.getElementById('fechaFin').value = json.fechaFin;
                document.getElementById('destinoViaje').value = json.destino;
                document.getElementById('registrarViaje').value = 'actualizar';


            }
        )


}

const advertenciaDelViaje = (idViaje) => {
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
            eliminarViaje(idViaje);
            Swal.fire(
                'Eliminado!',
                'Su viaje fue eliminado.',
                'success'
            )

            
        }
    })

}

const eliminarViaje = (idViaje) => {
    fetch(`http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/viajeDef/${idViaje}`, {
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        }
    })
        .then(
            response => {
                if (response.ok) {
                    console.log('Viaje eliminado');


                } else {
                    console.log('El viaje no existe');

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