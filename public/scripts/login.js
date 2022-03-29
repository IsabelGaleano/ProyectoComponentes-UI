//Obtener el usuario desde el API
const getUsuario = async (id) => {
    let ob;
    await fetch(`http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/usuarioDef/${id}`, {
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        }
    })
        .then(
            response => {
                if (response.ok) {
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
                obj = json;
            }
        )
    return obj;
}


//Funcion para validar el inicio de sesion
async function validarLogin() {
    const email = document.getElementById('email-inp');
    const pwd = document.getElementById('pwd-inp');
    const usuario = await getUsuario(email.value);

    //Validar vacios unicamente
    if (email.value === "") {
        email.classList.add('is-invalid');
    } else {
        email.classList.remove('is-invalid');
    }
    if (pwd.value === "") {
        pwd.classList.add('is-invalid');
    } else {
        pwd.classList.remove('is-invalid');
    }
    
    //if(email.value !== "" && pwd.value !== "") {}
    
    if(usuario.value === false  && email.value !== "" && pwd.value !== "") {
        $("#errorMessage").show();
    } else if(usuario.idUsuario === email.value && usuario.contrasenna !== pwd.value && pwd.value !== "" ) {
        $("#errorMessage").show();
    } 
    else if(usuario.idUsuario === email.value && usuario.contrasenna === pwd.value) {
        //console.log('here')
        $("#errorMessage").hide();
        $("#successMessage").show();
        
        
        setTimeout(async function () {
            await postLogin(email.value, pwd.value);

            window.location.href = "/home";
         }, 1500);
    }
    
}

//ENVIAR EL FORM POR EL ENRUTAMIENTO DE EXPRESS A /login
async function postLogin(id, pwd){
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({usuario: await getUsuario(id), username: id, password: pwd })
    })
      .then(function(response){
        if(response.ok){
          console.log('POST loginsuccess.');
          return;
        }
        throw new Error('POST login failed.');
      })
      .catch(function(error){
        console.log(error);
      });
  }


//Accion de boton de login en el html
document.getElementById('btn-login').addEventListener('click', async(e) => {
    e.preventDefault();
    await validarLogin();
    //post();
});

//NOTA: CAMBIAR LOS HTML POR EJS PARA PODER ACCEDER A LOS DATOS DE SESION