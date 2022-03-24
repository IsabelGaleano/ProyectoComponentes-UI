document.getElementById('success_msg').style.display = "none";
var correo = sessionStorage.getItem('correoRegistrado');
const verificarCodigo = () => {
    var codigoIngresado = document.getElementById('codigoIngresado').value
    let response;
    fetch("http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/codigoDef/getByCorreo/" + correo, {
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        }
    })
        .then(
            json => {
                for (var i = 0; i < Object.keys(json).length; i++){
                    if (codigoIngresado == json[i].codigo && json[i].estado == 'activo'){
                        console.log("Codio encontrado");
                        // activarUsuarios(correo);
                        // desactivarCodigo(json[i]);
                    }
                }
            }
        )
}
const desactivarCodigo = (codigo) => {

    var data = {
        idCodigo: codigo.idCodigo,
        codigo: codigo.codigo,
        estado: "inactivo",
        idUsuario: codigo.idUsuario
    }

    fetch("http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/codigoDef/",{
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json' 
        }
    })
    .then(
        response => {
            if(response.ok) {
                console.log('Usuario actualizado');
                

            } else {
                console.log('El usuario no existe');
                
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
const activarUsuarios = (correo) => {
    fetch('http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/usuarioDef/${"gato1@gmail.com"}', {
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


            console.log(json);
        }
    )
    var data = {
        correoElectronico : "gato1@gmail.com",
        nombre : "Isa",
        apellido1 : "Update",
        apellido2 : "Hernandez",
        contrasenna : "gato123",
        telefono : "+50684511935",
        estado : "inactivo"
    }

    fetch("http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/usuarioDef/",{
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json' 
        }
    })
    .then(
        response => {
            if(response.ok) {
                console.log('Usuario actualizado');
                

            } else {
                console.log('El usuario no existe');
                
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

function generateOTP() {
    var digitos = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digitos[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
const reenviarCodigo = () => {
    var data = {
        idCodigo: "0",
        codigo: generateOTP(),
        estado: "activo",
        idUsuario: correo
    }
    fetch("http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/codigoDef/",{
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
                document.getElementById('success_msg').style.display = "block";
                setTimeout(function () {
                    document.getElementById('success_msg').style.display = "none";
                }, 3000);
            } else {
                document.getElementById('success_msg').innerText = "Fallo al enviar el código";
                document.getElementById('success_msg').style.display = "block";
                document.getElementById('success_msg').style.color = "red";
                setTimeout(function () {
                    document.getElementById('success_msg').style.display = "none";
                }, 3000);
            }
        }
    )
}