export default {
    settings: {
        nav_settings: {
            title: "Ajustes",
            lang_conf_title: "Idioma",
            logout_button: "Cerrar sesión",
            cancel_action: "Cancelar",
            accept_action: "Acceptar"
        }
    },
    views: {
        home: {
            title: "Encuestas",
            no_poll_message: "¡Empieza creando una encuesta!",
            account_not_found: "Por favor, entra en tu cuenta. Gracias por contar con nosotros.",
            greetings_message: "Hola",

        },
        metrics: {
            no_poll_message: "No se ha podido cargar la encuesta o no existe.",
        },
        create_poll: {
            title: "Título de la encuesta",
            description: "Describe tu encuesta",
            title_placeholder: "Nueva encuesta",
            description_placeholder: "¿Sabías que puedes hacer click en éste elemento para editarlo?"
        },
        login_view: {
            message: "¡Únete hoy y haz que tu opinión cuente!",
            login: {
                title: "Entrar",
                email: "Email",
                email_placeholder: "Correo",
                password: "Contraseña",
                password_placeholder: "Contraseña",
                submit: "Entrar",
                no_account: "¿Aun no tienes cuenta?",
                already_account: "¿Ya tienes cuenta?",
                create_account: "Crear cuenta"
            },  
            signup: {
                title: "Crear cuenta",
                user: "Usuario",
                user_placeholder: "Nombre de usuario",
                email: "Email",
                email_placeholder: "Correo",
                password: "Contraseña",
                password_placeholder: "8 a 12 carácteres",
                terms_conditions: "Acepto los términos y condiciones.",
                submit: "Crear cuenta",
                already_account: "¿Ya tienes cuenta?",
                enter: "Entrar",
            }
        }
    },
    components: {
        poll_btn: "Nueva",
        topnav_portrait: {
            poll: "Encuestas",
            metrics: "Métricas",
            settings: "Configuración",
            login_button: "Entrar"
        },
        topnav: {
            poll: "Encuestas",
            metrics: "Métricas",
            login_button: "Entrar"
        }
    }
}