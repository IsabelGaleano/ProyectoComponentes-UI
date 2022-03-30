
document.getElementById('success_msg').style.display = "none";
const registrarUsuario = () => {
    var data = {
        correoElectronico: document.getElementById("email").value,
        nombre: document.getElementById("nombre").value,
        apellido1: document.getElementById("apellido1").value,
        apellido2: document.getElementById("apellido2").value,
        contrasenna: document.getElementById("password").value,
        telefono: document.getElementById("telefono").value,
        estado: "inactivo"
    }
    sessionStorage.setItem('correoRegistrado', data.correoElectronico);
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
                document.getElementById('success_msg').style.display = "block";
                postCodigo(data.correoElectronico);
            } else {
                document.getElementById('success_msg').innerText = "Usuario ya existe";
                document.getElementById('success_msg').style.display = "block";
                document.getElementById('success_msg').style.color = "red";
                setTimeout(function () {
                    window.location.href = "../pages/sign-up";
                }, 3000);
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

const postCodigo = (correo) => {
    
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
                document.getElementById('success_msg').innerText = "Se le ha enviado un código por el correo registrado";
                document.getElementById('success_msg').style.display = "block";
                setTimeout(function () {
                    window.location.href = "../pages/verificar_codigo";
                }, 3000);
            } else {
                document.getElementById('success_msg').innerText = "Envío de código ha fallado";
                document.getElementById('success_msg').style.display = "block";
                document.getElementById('success_msg').style.color = "red";
                setTimeout(function () {
                    window.location.href = "../pages/sign-up";
                }, 3000);
            }
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