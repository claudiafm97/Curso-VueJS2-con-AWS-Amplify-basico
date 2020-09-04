import Vue from "vue";
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import awsmobile from "../aws-exports";
Amplify.configure(awsmobile);
Vue.use(AmplifyPlugin, AmplifyModules);

const dict = {
  es: {
    "Sign In": "Acceder",
    "Sign Up": "Regístrate",
    "Sign In Account": "Accede con tu cuenta",
    "Sign Up Account": "Crea una nueva cuenta",
    "Reset your password": "Restablece tu contraseña",
    "Enter your username": "Introduce tu nombre de usuario",
    "Back to Sign In": "Volver al formulario de login",
    "Send Code": "Enviar código",
    "New Password ": "Nueva contraseña",
    Code: "Código",
    "Resend Code": "Reenviar código",
    submit: "Enviar",
    Username: "Nombre de usuario",
    Email: "Correo electrónico",
    Password: "Contraseña",
    "Phone Number": "Número de teléfono",
    "Forget your password? ": "¿Has olvidado tu contraseña?",
    "Reset password": "Restablece tu contraseña",
    "Have an account? ": "¿Tienes una cuenta?",
    "No account? ": "¿No tienes cuenta?",
    "Create account": "Crear cuenta",
    "Sign Out": "Cerrar sesión",
    "Enter your password": "Introduce tu contraseña",
  },
};

AmplifyModules.I18n.putVocabularies(dict);
AmplifyModules.I18n.setLanguage("es");
