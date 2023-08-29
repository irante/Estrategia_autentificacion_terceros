const passport = require("passport");
const userManager = require("../managers/user.manager");

const { LocalStrategy, signup, login } = require("./passport.local.config.js");
const { GithubStrategy, GitHubAccessConfig, profileGithubController, strategyName} = require("./passport.github.js");

const init = () => {
    /// options por default
    /// { usernamField: 'username', passwordField: 'password' }
    passport.use(
        "local-signup",
        new LocalStrategy(
            { usernameField: "email", passReqToCallback: true },
            signup
        )
    );
    passport.use(
        "local-login",
        new LocalStrategy({ usernameField: "email" }, login)
    );

    
     
     // Estrategia con github
     

    passport.use(
        strategyName,
        new GithubStrategy(GitHubAccessConfig, profileGithubController)
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await userManager.getById(id);

        // TODO: borrar el password
        done(null, user);
    });
};

module.exports = init;
