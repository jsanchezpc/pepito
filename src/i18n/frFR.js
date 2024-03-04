export default {
  settings: {
    nav_settings: {
      title: "Paramètres",
      lang_conf_title: "Langue",
      logout_button: "Déconnexion",
      cancel_action: "Annuler",
      accept_action: "Accepter",
    },
  },
  views: {
    home: {
      title: "Sondages",
      no_poll_message: "Commencez par créer un sondage !",
      account_not_found:
        "Veuillez vous connecter à votre compte. Merci de nous faire confiance.",
      greetings_message: "Bonjour",
    },
    metrics: {
      no_poll_message: "Le sondage n'a pas pu être chargé ou n'existe pas.",
    },
    create_poll: {
      title: "Titre du sondage",
      description: "Décrivez votre sondage",
      title_placeholder: "Nouveau sondage",
      description_placeholder:
        "Saviez-vous que vous pouvez cliquer sur cet élément pour le modifier ?",
    },
    login_view: {
      message: "Rejoignez-nous dès aujourd'hui et faites compter votre voix !",
      login: {
        title: "Connexion",
        email: "E-mail",
        email_placeholder: "E-mail",
        password: "Mot de passe",
        password_placeholder: "Mot de passe",
        submit: "Connexion",
        no_account: "Vous n'avez pas encore de compte ?",
        already_account: "Vous avez déjà un compte ?",
        create_account: "Créer un compte",
      },
      signup: {
        title: "Créer un compte",
        user: "Utilisateur",
        user_placeholder: "Nom d'utilisateur",
        email: "E-mail",
        email_placeholder: "E-mail",
        password: "Mot de passe",
        password_placeholder: "De 8 à 12 caractères",
        terms_conditions: "J'accepte les conditions d'utilisation.",
        submit: "Créer un compte",
        already_account: "Vous avez déjà un compte ?",
        enter: "Connexion",
      },
    },
  },
  components: {
    poll_btn: "Nouveau",
    topnav_portrait: {
      poll: "Sondages",
      metrics: "Métriques",
      settings: "Paramètres",
      login_button: "Connexion",
    },
    topnav: {
      poll: "Sondages",
      metrics: "Métriques",
      login_button: "Connexion",
    },
  },
};
