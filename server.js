const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const { PORT = 3000 } = process.env
const path = require('path');
const { json } = require('express/lib/response')
const folder = path.join(__dirname, 'public');
app.use(express.static(folder))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, '/public/pages'));
app.set('view engine', 'ejs');


//MANEJO DE VISTAS ÚNICAMENTE
/*
app.get('/', (req, res) => res.sendFile(path.join(__dirname+ '/public/pages/about-us.html')))

Login
app.get('/pages/sign-in', function (req, res) {
	res.sendFile(path.join(__dirname+ '/public/pages/sign-in.html'))
  });

Dashboard
app.get('/pages/dashboard', function (req, res) {
	res.sendFile(path.join(__dirname+ '/public/pages/dashboard.html'))
  });
*/


//MANEJO LOGIN
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.use((req, res, next) => {
	const { user } = req.session;
	//res.locals.user = req.session.user;
	if (user) {
		//res.locals.user = user;
		res.locals.username = req.session.username;
		res.locals.name = req.session.name;
	} else {
		//console.log("No usuario");
	}
	next()
});


//RUTA PARA EL LOGIN Y CREAR LA SESSION CON DATOS
app.post('/login', async function (request, response, next) {
	var username = request.body.username;
	var password = request.body.password;
	//res.send(JSON.stringify(req.body));
	const usuario = request.body.usuario;

	//PROBAR
	if (username && password) {
		//console.log(usuario);
		if (usuario.idUsuario === username && usuario.contrasenna === password) {
			request.session.loggedin = true;
			request.session.username = username;
			request.session.name = usuario.nombre;
			request.session.user = JSON.stringify(usuario);

			console.log("sesion creada");
			//response.render('/dashboard');
		} else {
			console.log("incorrecto");
			response.send('Incorrect Username and/or Password!');
		}
		response.end();
	} else {

		response.send('Please enter Username and Password!');
		response.end();
	}
	response.end();
});

//Pagina de prueba unicamente
app.get('/home', function (request, response) {
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

//Cierra sesión
app.get("/pages/logout", function (req, res) {
    req.session.destroy(console.log("destruye sesion"));
    res.redirect('sign-in');
	res.end();
});


//Configuraciones de rutas estandar del app

app.get('/', function (req, res) {
	res.render('about-us');
});

app.get('/pages/sign-in', function (req, res) {
	//Está logeado
	if (req.session.loggedin) {
		//redirige al dash
		res.redirect('dashboard');
	} else {
		res.render('sign-in');
	}
});
app.get('/pages/dashboard', function (req, res) {
	//Está logeado
	if (req.session.loggedin) {
		//redirige al dash
		res.render('dashboard');
	} else {
		res.redirect('sign-in');
	}
});
app.get('/pages/sign-up', function (req, res) {
	//Está logeado
	if (req.session.loggedin) {
		//redirige al dash
		res.redirect('dashboard');
	} else {
		res.render('sign-up');
	}
	
});

app.get('/pages/verificar_codigo', function (req, res) {
	res.render('verificar_codigo');
});

app.get('/pages/trip', function (req, res) {
	//Está logeado
	if (req.session.loggedin) {
		//redirige al trip
		res.render('trip');
	} else {
		res.redirect('sign-in');
	}
	
});

app.get('/pages/perfil', function (req, res) {
	//Está logeado
	if (req.session.loggedin) {
		//redirige al perfil
		res.render('perfil');
	} else {
		res.redirect('sign-in');
	}
});




//--------------------------

app.listen(PORT, () => console.log("SERVIDOR LEVANTADO"))

