

document.addEventListener('DOMContentLoaded', function () {
    cargarViajes();
    
}, false);




const cargarViajes = () => {
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
                                <p class="text-gradient text-dark mb-2 text-sm">Planificador #${i+1}</p>
                                <a href="javascript:;">
                                    <h5>
                                        ${json[i].destino}
                                    </h5>
                                </a>
                                <p class="mb-4 text-sm">
                                    ${json[i].descripcion}
                                </p>
                                <div class="d-flex align-items-center justify-content-between">
                                    <a href=""  class="btn btn-outline-primary btn-sm mb-0" 
                                    onclick="getUsuarios()">Ver plan</a>
                                    
                                </div>
                            </div>
                        </div>
                    </div>`;
                    }
                    
                    
                }
                //document.getElementById('listadoViajes').innerHTML = listadoViajes;
                document.getElementById('listadoViajes').insertAdjacentHTML("beforeend", listadoViajes);
                console.log(json);
            }
        )
}

const registrarViaje = () => {
    var data = {
        correoElectronico : "gato1@gmail.com",
        nombre : "Isa",
        apellido1 : "Galeano",
        apellido2 : "Hernandez",
        contrasenna : "gato123",
        telefono : "+50684511935",
        estado : "inactivo"
    }

    fetch("http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/usuarioDef/",{
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json' 
        }
    })
    .then(
        response => {
            if(response.ok) {
                console.log('Usuario creado');
                

            } else {
                console.log('El usuario ya existe');
                
            }
            
            
            return response.json();
        }
    )
    .then(
        json => {


            console.log(json);
        }
    )
}
