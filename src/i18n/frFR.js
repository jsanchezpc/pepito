export default {
    settings: {
        nav_settings: {
            title: "Paramètres",
            setting_title: "Langue",
            cancel_action: "Annuler",
            accept_action: "Accepter"
        }
    },
    views: {
        home: {
            title: "Sondages",
            no_poll_message: "Commencez par créer un sondage !",
            account_not_found: "Veuillez vous connecter à votre compte. Merci de nous faire confiance.",
            greetings_message: "Bonjour",

        },
        answers: {
            no_poll_message: "Commencez par créer un sondage !",
        },
        login_view: {
            message: "Rejoignez-nous aujourd'hui et faites entendre votre opinion !",
            login: {
                title: "Connexion",
                email: "E-mail",
                email_placeholder: "Courriel",
                password: "Mot de passe",
                password_placeholder: "Mot de passe",
                submit: "Se connecter",
                no_account: "Vous n'avez pas encore de compte ?",
                already_account: "Vous avez déjà un compte ?",
                create_account: "Créer un compte"

            },
            signup: {
                title: "Créer un compte",
                user: "Utilisateur",
                user_placeholder: "Nom d'utilisateur",
                email: "E-mail",
                email_placeholder: "Courriel",
                password: "Mot de passe",
                password_placeholder: "De 8 à 12 caractères",
                terms_conditions: "J'accepte les termes et conditions.",
                submit: "Créer un compte",
                already_account: "Vous avez déjà un compte ?",
                enter: "Se connecter",
            }
        }
    },
    components: {
        poll_btn: "Sonder",
        topnav_portrait: {
            poll: "Sondages",
            answers: "Réponses",
            settings: "Paramètres",
            login_button: "Se connecter"
        },
        topnav: {
            poll: "Sondages",
            answers: "Réponses",
            login_button: "Se connecter"
        }
    }
}