// generar nuestra estrategia de passport

const passport = require('passport')
const local = require('passport-local')                     // importamos estrategia de passport
const userManager = require('../managers/user.manager')
const { hashPassword, isValidPassword } = require('../utils/password.utils')


const LocalStrategy = local.Strategy


// call para cuando el usuario se Regsitre:

const signup = async (req, email, password, done) => {
  const { email: _email, password: _password, password2: _password2, ...user } = req.body     // obtengo el objeto user libre de las propiedades email, password, etc...

  const _user = await userManager.getByEmail(email)

  if (_user) {
    console.log('usuario ya existe')
    return done(null, false)
  }

  try {
    const newUser = await userManager.create({
      ...user,
      email,                                          /// Modificado
      password: hashPassword(password)
    })

   
    return done(null, {
      name: newUser.firstname,
      id: newUser._id,
      ...newUser._doc
    })

  } catch(e) {
    console.log('ha ocurrido un error')
    done(e, false)
  }
}




//Callbak para Inicio de sesion:

const login = async (email, password, done) => {
  try {
    const _user = await userManager.getByEmail(email)

    if (!_user) {
      console.log('usuario no existe')
      return done(null, false)
    }

    if (!password) {
      return done(null, false)
    }

    if(!isValidPassword(password, _user.password)) {
      console.log('credenciales no coinciden')
      return done(null, false)
    }

    
    done(null, _user)

  } catch(e) {
    console.log('ha ocurrido un error')
    done(e, false)
  }
}





module.exports = {
  LocalStrategy,
  signup,
  login,
};
