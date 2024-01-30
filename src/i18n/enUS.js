export default {
    settings: {
        nav_settings: {
            title: "Settings",
            lang_conf_title: "Language",
            cancel_action: "Cancel",
            accept_action: "Accept",
            logout_button: "Logout"
        }
    },
    views: {
        home: {
            title: "Surveys",
            no_poll_message: "Start by creating a survey!",
            account_not_found: "Please log in to your account. Thank you for trusting us.",
            greetings_message: "Hello",

        },
        answers: {
            no_poll_message: "Start by creating a survey!",
        },
        create_poll: {
            title: "Poll Title: ",
            description: "Describe your poll: ",
            title_placeholder: "New poll",
            description_placeholder: "Did you know you can click on this element to edit it?",

        },
        login_view: {
            message: "Join us today and make your opinion count!",
            login: {
                title: "Log In",
                email: "Email",
                email_placeholder: "Email",
                password: "Password",
                password_placeholder: "Password",
                submit: "Log In",
                no_account: "Don't have an account yet?",
                already_account: "Already have an account?",
                create_account: "Create Account"

            },
            signup: {
                title: "Create Account",
                user: "User",
                user_placeholder: "Username",
                email: "Email",
                email_placeholder: "Email",
                password: "Password",
                password_placeholder: "8 to 12 characters",
                terms_conditions: "I accept the terms and conditions.",
                submit: "Create Account",
                already_account: "Already have an account?",
                enter: "Log In",
            }
        }
    },
    components: {
        poll_btn: "Survey",
        topnav_portrait: {
            poll: "Surveys",
            answers: "Answers",
            settings: "Settings",
            login_button: "Log In"
        },
        topnav: {
            poll: "Surveys",
            answers: "Answers",
            login_button: "Log In"
        }
    }
}
