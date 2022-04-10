var correo = document.getElementById('idUserHidden').innerText.trim();
console.log(correo);
const getUsuarioByID = () => {
    let numberPhoto = Math.floor(Math.random() * (15 - 1)) + 1;
    document.getElementById("imgPerfil").src = `../assets/assetsTripnary/img/imgTrips/${numberPhoto}.jpg`;
    fetch('http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/usuarioDef/' + correo, {
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        }
    })
    .then(
        response => {
            if(response.ok) {
                console.log('Usuario encontrado');
                

            } else {
                console.log('El usuario no existe');
                
            }
            
            
            return response.json();
        }
    )
    .then(
        json => {
            
            document.getElementById('nombre').innerText = json.nombre + ' ' + json.apellido1;
            document.getElementById('nombreCompleto').insertAdjacentText('beforeend', json.nombre + ' ' + json.apellido1 +  ' ' + json.apellido2);
            document.getElementById('telefono').insertAdjacentText('beforeend', json.telefono.replace('+506', ''));
            document.getElementById('correo').insertAdjacentText('beforeend', json.idUsuario);
            getViajeByUsuario();
        }
    )
        
}
const getViajeByUsuario = () => {
    fetch('http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/viajeDef/getByUser/' + correo, {
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        }
    })
    .then(
        response => {
            if(response.ok) {
                console.log('Usuario encontrado');
                

            } else {
                console.log('El usuario no existe');
                
            }
            
            
            return response.json();
        }
    )
    .then(
        json => {
            for(var i = 0; i < json.length; i++){
                document.getElementById('listaViajes').insertAdjacentHTML('beforeend', '<li class="list-group-item border-0 d-flex align-items-center px-0 mb-2">' + 
                ' <div class="avatar me-3"> <img src="../assets/assetsDashboard/img/small-logos/icon-sun-cloud.png" alt="kal"class="border-radius-lg shadow">' + 
                '</div><div class="d-flex align-items-start flex-column justify-content-center"><h6 class="mb-0 text-sm">' + json[i].descripcion +'</h6>' + 
                '<p class="mb-0 text-xs">' + json[i].fechaInicio.split('-')[2] + '/' + json[i].fechaInicio.split('-')[1] + '/' + json[i].fechaInicio.split('-')[0] + 
                ' - ' + json[i].fechaFin.split('-')[2] + '/' + json[i].fechaFin.split('-')[1] + '/' + json[i].fechaFin.split('-')[0] + '</p></div><a class="btn btn-link pe-3 ps-0 mb-0 ms-auto" href="../pages/trip">Ver</a>')
            }
            console.log(json);
        }
    )
        
}
window.onload = getUsuarioByID;