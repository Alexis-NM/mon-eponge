const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../tables");

// Options de hachage (voir documentation : https://github.com/ranisalt/node-argon2/wiki/Options)
// Recommandations **minimales** de l'OWASP : https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    // Extraction du mot de passe de la requête
    const { password } = req.body;

    // Hachage du mot de passe avec les options spécifiées
    const hashedPassword = await argon2.hash(password, hashingOptions);

    // Ajout du mot de passe haché à l'objet req.body
    req.body.hashed_password = hashedPassword;

    // Suppression du mot de passe non haché de la requête par mesure de sécurité
    delete req.body.password;
    next();
  } catch (err) {
    console.error("Error in hashPassword middleware:", err);
    next(err);
  }
};

const verifyToken = (req, res, next) => {
  try {
    // Vérifier la présence de l'en-tête "Authorization" dans la requête
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    // Vérifier que l'en-tête a la forme "Bearer <token>"
    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    // Vérifier la validité du token (son authenticité et sa date d'expériation)
    // En cas de succès, le payload est extrait et décodé
    req.auth = jwt.verify(token, process.env.APP_SECRET);

    next();
  } catch (err) {
    console.error(err);

    res.sendStatus(401);
  }
};

// Middleware pour vérifier si l'utilisateur est administrateur
const checkIsAdmin = async (req, res, next) => {
  try {
    // Utiliser le token déjà vérifié par le middleware verifyToken
    const decodedToken = req.auth;

    // Utiliser l'ID du token pour obtenir les détails de l'utilisateur depuis la base de données
    const user = await tables.user.read(decodedToken.user_id);

    if (!user) {
      // Si l'utilisateur associé à l'ID n'est pas trouvé, renvoyer une réponse non autorisée
      throw new Error("User not found");
    }

    // Vérifier si l'utilisateur a le rôle d'administrateur
    if (Boolean(user.is_admin) !== true) {
      // Log temporaire pour afficher le résultat de la vérification
      console.info("User is not an admin");

      // Si l'utilisateur n'est pas un administrateur, renvoyer une réponse non autorisée
      throw new Error("User is not an admin");
    }

    req.auth = decodedToken;

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyToken,
  checkIsAdmin,
};
