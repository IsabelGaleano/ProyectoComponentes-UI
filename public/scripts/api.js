
const getUsuarios = () => {
    let response;
    console.log("HOLAA");
    fetch("http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/usuarioDef/", {
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
            }
        )
}

const postUsuarios = () => {
    
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

const putUsuarios = () => {
    
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

const getUsuarioByID = () => {
    fetch(`http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/usuarioDef/${"gato1@gmail.com"}`, {
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
        
}

const deleteUsuarios = () => {
    
    fetch(`http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/usuarioDef/${"gato1@gmail.com"}`,{
        method: 'DELETE',
        headers: { 
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json' 
        }
    })
    .then(
        response => {
            if(response.ok) {
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
        }
    )

     
}


document.addEventListener('DOMContentLoaded', function () {
  deleteUsuarios();
}, false);