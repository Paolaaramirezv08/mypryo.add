import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

const ver = document.getElementById("verpassword")
ver.addEventListener("change", vercontrasena )
function vercontrasena() {
    if (ver.checked === true) {
        document.getElementById("inppassword").type= "text"
        document.getElementById("inpconfirmar").type= "text"
    }else{
        document.getElementById("inppassword").type= "password"
        document.getElementById("inpconfirmar").type= "password"
    }
}

document.getElementById("btnregistrarse").addEventListener("click", async () => {
  const email = document.getElementById("inpemail").value;
  const pass1 = document.getElementById("inppassword").value;
  const pass2 = document.getElementById("inpconfirmar").value;

  if (pass1 !== pass2) {
    alert("Las contraseñas no coinciden");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass1);
    alert("Usuario registrado: " + userCredential.user.email);
  } catch (error) {
    alert("Error en el registro: " + error.code);
    console.error(error);
  }
});
/*const botoningresar = document.getElementById("btniniciar")
botoningresar.addEventListener("click", ingresar )
function ingresar() {
    let usuario = document.getElementById("inpemail").value
    let contrasena1 = document.getElementById("inppassword").value
    let contrasena2 = document.getElementById("inpconfirmar").value
    if (contrasena1 === contrasena2) {
        let arrayusuario = JSON.parse(localStorage.getItem("usuario"))
        if (arrayusuario === null) {
                arrayusuario = []
            }
        let usuarioregistrado = arrayusuario.find(u => u.nombre === usuario)
        if (usuarioregistrado) {
            alert("El usuario ya existe")
        } else {
            usuarionuevo={
                nombre: usuario,
                password: contrasena1,
            }
            arrayusuario.push(usuarionuevo)
            localStorage.setItem("usuario", JSON.stringify(arrayusuario) )
        }
    }else{
        alert("Las contraseñas no coinciden")
    }
}*/

const botonregistrar = document.getElementById("btnregistrarse")
botonregistrar.addEventListener("click", verregistrar )
function verregistrar() {
    document.getElementById("confirmar").style.display = "block"
    document.getElementById("inpconfirmar").style.display = "block"

}

  
 const firebaseConfig = {
  apiKey: "AIzaSyDtr6LfpEcBURf4TfYPlwEjS5w08K87Sdw",
  authDomain: "erbase-f5b9c.firebaseapp.com",
  projectId: "erbase-f5b9c",
  storageBucket: "erbase-f5b9c.firebasestorage.app",
  messagingSenderId: "140082194129",
  appId: "1:140082194129:web:d72c2e5bcc3cec1fe747f0"
};

    // Inicializar Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Capturar el formulario
const botoningresar = document.getElementById("btniniciar")
botoningresar.addEventListener("click", ingresar )
function ingresar() {
    const loginForm = document.getElementById("boxlogin");
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("inpemail").value;
      const password = document.getElementById("inppassword").value;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert(`Bienvenido ${user.email}`);
        // Podés redirigir a otra página
        window.location.href = "paneldecontrol.html";
      } catch (error) {
        alert("Error al iniciar sesión: " + error.message);
      }
    });
  }