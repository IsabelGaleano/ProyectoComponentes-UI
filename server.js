const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const {PORT = 3000} = process.env
const path = require('path');
const folder = path.join(__dirname, 'public');
app.use(express.static(folder))

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.render('about-us');
 });

 /* prueba
 app.post('/clicked', (req, res) => {
    console.log(req.body.a);
    console.log(req.body.b);
    console.log(req.body);
    res.sendStatus(201);
  })*/


//MANEJO DE VISTAS ÚNICAMENTE
app.get('/', (req, res) => res.sendFile(path.join(__dirname+ '/public/pages/about-us.html')))

app.get('/pages/sign-in', function (req, res) {
    res.sendFile(path.join(__dirname+ '/public/pages/sign-in.html'))
  });

//MANEJO LOGIN
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//RUTA PARA EL LOGIN Y CREAR LA SESSION CON DATOS
app.post('/login', async function(request, response, next) {
	var username = request.body.username;
	var password = request.body.password;
    //res.send(JSON.stringify(req.body));
    const usuario = request.body.usuario;
    
	//console.log(request.body);
    //PROBAR
	if (username && password) {
		//console.log(usuario);
		if (usuario.idUsuario === username && usuario.contrasenna === password) {
            request.session.loggedin = true;
            request.session.username = username;
            console.log("sesion creada");
            //response.redirect('/home');
			//response.end(window.location.href = "home");
        } else {
            console.log("incorrecto");
            response.send('Incorrect Username and/or Password!');
			//document.getElementById("#errorMessage").show();
        }			
        response.end();
	} else {
        
		response.send('Please enter Username and Password!');
		response.end();
	}
	return false;
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		
		//response.send('Welcome back, ' + request.session.username + '!');
		response.send(`
		<h3>Welcome back ${request.session.username}! </h3>
		<a href='/logout'>Logout</a>
		`);
	} else {
		//response.send('Please login to view this page!');
		
	}
	response.end();
});

app.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            //res.send("logout Successfully...!");
			res.send(`
		<h3>Logout successfully...!</h3>
		<a href='/pages/sign-in'>Go back to login</a>
		`);
        }
    })
})

//--------------------------

app.listen(PORT, () => console.log("SERVIDOR LEVANTADO"))

