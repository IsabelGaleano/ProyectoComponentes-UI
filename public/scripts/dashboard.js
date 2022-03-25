
document.addEventListener('DOMContentLoaded', async () => {
    await cargarViajes();

    document.querySelectorAll('.plan').forEach(item => {
     
        item.addEventListener('click', event => {
            console.log(item.id);
            window.location.replace("http://192.168.0.183:5500/public/pages/trip.html");
            sessionStorage.setItem('idViaje', item.id);


        })
    });

}, false);

document.getElementById('registrarViaje').addEventListener("click", function () {
    registrarViaje();
    document.getElementById('cerrarModal').click();
    
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

                        listadoViajes += `<div class="col-xl-3 col-md-6 mb-xl-0 mb-4" style="padding-bottom: 60px;">
                        <div class="card card-blog card-plain">
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
                                
                                    <button type="button" class="btn btn-outline-primary btn-sm mb-0 plan"
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
        estado: "Activo"
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