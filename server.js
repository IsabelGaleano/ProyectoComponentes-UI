const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const {PORT = 3000} = process.env
const path = require('path');
const { json } = require('express/lib/response')
const folder = path.join(__dirname, 'public');
app.use(express.static(folder))

app.use(bodyParser.urlencoded({extended : true}));
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


//Para manejar datos de sesion
/*
const verifyLogin = () => {
	return (req,res,next) => {
		const {user} = req.session;
	if(user) {
		res.locals.user = user;
		console.log("Pasa sesion: "+req.session.username);
	} else{
		console.log("No usuario");
	}
	next()
	}
}*/

app.use((req, res, next) => {
	//console.log(req.session);
	const {user} = req.session;
	//res.locals.user = req.session.user;
	if(user) {
		//res.locals.user = user;
		res.locals.username = req.session.username;
		res.locals.name = req.session.name;
		console.log("Pasa sesion: "+req.session.username);
		//console.log("usuario pasa: "+req.session.user);
	} else{
		console.log("No usuario");
	}
	next()
});


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
			request.session.name = usuario.nombre;
			request.session.user = JSON.stringify(usuario);

            console.log("sesion creada");
            //response.render('/dashboard');
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
	response.end();
});

const redirectLogin = (req, res, next) => {
	if(req.session.user) {
		res.redirect('/sign-in')
	} else {
		next()
	}
}

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

app.get('/', function(req, res){
	res.render('about-us');
 });
 app.get('/pages/sign-in', function(req, res){
	res.render('sign-in');
 });
 app.get('/pages/dashboard', function(req, res){
	console.log("Dashboard: "+req.session.user);
	res.render('dashboard');
 });
 app.get('/pages/sign-up', function(req, res){
	res.render('sign-up');
 });

 app.get('/pages/verificar_codigo', function(req, res){
	res.render('verificar_codigo');
 });

 app.get('/pages/trip', function(req, res){
	res.render('trip');
 });

 app.get('/pages/perfil', function(req, res){
	res.render('perfil');
 });




//--------------------------

app.listen(PORT, () => console.log("SERVIDOR LEVANTADO"))

