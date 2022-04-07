
const getViajes = () => {
    let response;
    fetch("http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/viajeDef/", {
        method: 'GET',
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

const postViaje = (viaje) => {

    fetch("http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/viajeDef/",{
        method: 'POST',
        body: JSON.stringify(viaje),
        headers: { 
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json' 
        }
    })
    .then(
        response => {
            if(response.ok) {
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
        }
    )
}

const putViaje = (viaje) => {

    fetch("http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/viajeDef/",{
        method: 'PUT',
        body: JSON.stringify(viaje),
        headers: { 
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json' 
        }
    })
    .then(
        response => {
            if(response.ok) {
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
        }
    )
}

const getViajeByID = (viaje) => {
    fetch(`http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/viajeDef/${viaje}`, {
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        }
    })
    .then(
        response => {
            if(response.ok) {
                console.log('Viaje encontrado');
                

            } else {
                console.log('El viaje no existe');
                
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

const deleteViaje = (viaje) => {
    
    fetch(`http://tripnaryserver-env.eba-eqs8mgem.us-east-1.elasticbeanstalk.com/viajeDef/${viaje}`,{
        method: 'DELETE',
        headers: { 
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json' 
        }
    })
    .then(
        response => {
            if(response.ok) {
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
        }
    )

     
}

document.addEventListener('DOMContentLoaded', function () {
  deleteViaje();
}, false);