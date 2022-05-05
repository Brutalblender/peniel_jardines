'use stirct'
window.addEventListener('load', function () {
    var a_theme = localStorage.getItem("theme");
    
    var dark = document.querySelector("#themed");
    if (dark) { dark.addEventListener("click", changeTheme) }
    var light = document.querySelector("#themec");
    if (light) { light.addEventListener("click", changeTheme) }
    if (!a_theme) {
        localStorage.setItem("theme", "l");   
        light.style.display = "none";    
        dark.style.display = "block";  
    }
 
    if (a_theme == "d") {
        document.querySelector("body").style.background = 'url("../img/skyd.jpg")';
        dark.style.display = "none";   
        light.style.display = "block";  
    }

    // //////////////////////////// ---------------------------DETENER ANIMACIONES DEL HEADER
    var contador = localStorage.getItem("contador");

    var log = document.querySelector("#logo a img");
    var wel = document.querySelector("#message #wlcm");
    var ccp = document.querySelector("#message #ccp");


    async function stop_a() {
        let cont = await contador;
        if (!cont) {
            localStorage.setItem("contador", "n");
            cont = localStorage.getItem("contador");
        }
        if (cont == "n") {
            setTimeout(() => {
                log.className = "";
                wel.className = "";
                ccp.className = "";
                localStorage.setItem("contador", "y");
            }, 2000);
        }

        if (cont == "y") {
            log.className = "";
            wel.className = "";
            ccp.className = "";
        }


    }

    stop_a();



    // //////////////////////////// --------------------------FIN DE -DETENER ANIMACIONES DEL HEADER
    //////////////////////////////////////////////////////////////////FORMULARIO REGISTER barra lateral
    // --------------------------------------variables
    var form_reg = document.querySelector('#form-register');
    if (form_reg) { listenReg(form_reg) }
    // --------------------------------------------funciones
    function listenReg(form_reg) {

        // --------------------------------------------event
        form_reg.addEventListener('submit', register);
    }
    // INGRESAR DATOS DEL USUARIO
    function register(event) {
        var namer = document.querySelector('#form-name').value;
        var lastnamer = document.querySelector('#form-lastname').value;
        var emailr = document.querySelector('#form-email').value;
        var passr = document.querySelector('#form-password').value;
        var new_user = new User;
        new_user.name = namer;
        new_user.lastname = lastnamer;
        new_user.email = emailr;
        new_user.password = passr;

        addUser(new_user);

        form_reg.reset()
        document.querySelector(".success-alt").innerHTML = `
            <div class="alert alert-success col-6" role="alert">
                Usuario creado exitosamente
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>    
            </div>`;
        window.scrollTo(-1000, 0);
        event.preventDefault();

    }
    //GUARDAR DATOS
    function addUser(user) {

        var users_ls = localStorage.getItem("users"); //REVISAR USUSARIOS REGISTRADOS
        console.log(users_ls);
        var users = new Array;
        if (!users_ls) {//---------------------------------------------condicion
            // CREAR ARRAY Y METER USUARIO
            users.push(user);
            var users_st = JSON.stringify(users);  //CONVERTIR ARRAY A STRING
            localStorage.setItem("users", users_st); //GUARDAR ARRAY STRING
        } else {
            users_ls = localStorage.getItem("users");//SACAR DATOS DEL L STORAGE EN STRING
            var users_js = JSON.parse(users_ls);  //CONVERTIR LOS DATOS A JSON
            users = users_js;      // pasar datos json a array
            users.push(user); //METER USUSARIO EN EL ARRAY
            var users_st = JSON.stringify(users);  //CONVERTIR ARRAY A STRING
            localStorage.setItem("users", users_st); //GUARDAR ARRAY STRING
            console.log(localStorage);
        }//----------------------------------------------------------fin de condicion
    }
    // --------------------------------------clases

    class User {
        constructor(name, lastname, email, password) {
            this.name = name;
            this.lastname = lastname;
            this.email = email;
            this.password = password;
        }
    }

    // /////////////////////////////////////////////_________FIN DE FORMULARIO
    //////////////////////////////////////////////////////////////////////////////LOGIN BARRA LATERAL
    // -------------------------------------------EVENTOS
    var form_log = document.querySelector("#form-login");
    if (form_log) { listenLogin(form_log) }
    if (!user_logged) {
        var user_logged;
    }
    function listenLogin(form_log) {

        form_log.addEventListener('submit', signin);
    }

    // -----------------------------------funcion
    function signin(event) {
        var email_r = document.querySelector("#form-email").value;
        var pass_r = document.querySelector("#form-pass").value;
        var userlog = {
            "email": email_r,
            "password": pass_r
        };
        //------OBTENER DATOS DE USUARIOS
        var users_ls = localStorage.getItem("users");
        var users = JSON.parse(users_ls);
        for (user of users) {
            if (user.email == userlog.email) {
                localStorage.setItem("user-logged", user.name);
                localStorage.setItem("logged", "y")
            }
        }
        location.replace("/")
        event.preventDefault();
    }
    /////////////////////////////////////////////////////FIN DE LOGIN
    // //////////////////////////////////////////////////////////////////LOGIN
    user_logged = localStorage.getItem("user-logged")
    var logged = localStorage.getItem("logged")
    if (logged == "y") {

        document.querySelector("#login-side").innerHTML = `
        <div class="logged" class="container" >
            <h3>Bienvenido ${user_logged}</h3>
            <a href="/">Cerrar Sesión</a>
        </div>`;
        document.querySelector("#login-side").style.border = "none"
        document.querySelector("#login-side").style.marginBottom = "0px"
        document.querySelector("#login-side h3").style.marginBottom = "0px"
        document.querySelector("#user-logged").innerHTML = `
        <div class="logged" class="container">
            <p style="color:darkblue;">Bienvenido <strong>${user_logged}</strong></p3>
            <a href="/">Cerrar Sesión</a>
        </div>`;
    }


    // ------------------------------cerrar sesion

    var loggedBox = document.querySelector(".logged");
    var logingout = document.querySelector(".logged a");
    if (loggedBox) {
        logingout.addEventListener("click", logout);
    }
    function logout() {
        localStorage.setItem("logged", "n")
        location.reload()
    }
    // /////////////////////////////////////////////////FIN DE LOGIN
    // ////////////////////////////////////////////////////////////////PETICION DE ORACION

    var pray_form = document.querySelector("#i_need")
    if (pray_form) {
        pray_form.addEventListener("submit", sendPray);
    }
    function sendPray(event) {
        var pray_r = document.querySelector("#pray").value;
        var prays = new Array;
        var prays_ls = localStorage.getItem("prays");
        if (!prays_ls) {
            prays.push(pray_r);
            var prays_st = JSON.stringify(prays);
            localStorage.setItem("prays", prays_st);
        } else {
            prays = JSON.parse(prays_ls);
            prays.push(pray_r);
            var prays_st = JSON.stringify(prays);
            localStorage.setItem("prays", prays_st);
        }
        pray_form.reset()
        document.querySelector(".success-alt").innerHTML = `
            <div class="alert alert-success col-6" role="alert">
                Peticion de oracion guardada exitosamente
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>    
            </div>`;



        event.preventDefault();
    }
    // //////////////////////////////////////////////////////////////////////////////////////////////////////


    var con_form = document.querySelector("#con-form")
    if (con_form) {
        con_form.addEventListener("submit", sendConSol);
    }
    function sendConSol(event) {
        var conSol_r = new ContactSol;
        conSol_r.name = document.querySelector('#con-form input[name="name"]').value;
        conSol_r.lastname = document.querySelector('#con-form input[name="lastname"]').value;
        conSol_r.email = document.querySelector('#con-form input[name="email"]').value;
        conSol_r.message = document.querySelector('#con-form textarea').value;
        console.log(conSol_r);
        var conSols = new Array;
        var conSols_ls = localStorage.getItem("Contact-Sols");
        if (!conSols_ls) {
            conSols.push(conSol_r);
            var conSols_st = JSON.stringify(conSols);
            localStorage.setItem("Contact-Sols", conSols_st);
        } else {
            conSols = JSON.parse(conSols_ls);
            conSols.push(conSol_r);
            var conSols_st = JSON.stringify(conSols);
            localStorage.setItem("Contact-Sols", conSols_st);
        }
        con_form.reset()
        document.querySelector(".success-alt").innerHTML = `
            <div class="alert alert-success col-6" role="alert">
                Solicitud de contacto guardada exitosamente<br>
                Revisa Tu correo electronico en las siguientes 24 horas para dar seguimiento a tu solicitud
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>    
            </div>`;



        event.preventDefault();
    }
    class ContactSol {
        constructor(name, lastname, email, message) {
            this.name = name;
            this.lastname = lastname;
            this.email = email;
            this.message = message;

        }
    }

    // //////////////////////////////////SELECTOR DE TEMAS



    function changeTheme() {
        a_theme = localStorage.getItem("theme");
        if (a_theme == "l") {
            localStorage.setItem("theme", "d")
            document.querySelector("body").style.background = 'url("../img/skyd.jpg")';
            document.querySelector("body").style.backgroundAttachment = "fixed";
            document.querySelector("body").style.backgroundSize = "cover";
            dark.style.display = "none";
            light.style.display = "block";     

        }
        else {
            localStorage.setItem("theme", "l");
            document.querySelector("body").style.background = 'url("../img/sky.jpg")';
            document.querySelector("body").style.backgroundAttachment = "fixed";
            document.querySelector("body").style.backgroundSize = "cover";
            dark.style.display = "block";
            light.style.display = "none";     
        }
    }





});