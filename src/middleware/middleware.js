const jwt = require("jsonwebtoken");

const authentication = async function (req, res, next) {
    try {
  const token = req.headers["x-api-key"];

  if (!token) {
    return res
      .status(400)
      .send({ msg: "please provide token" });
  }
  

    const decodedToken = jwt.verify(token, "Blogging-Mini-Site(Project1)");
    console.log(decodedToken)

    if (!decodedToken)
      return res
        .status(401)
        .send({ status: false, msg: "invalid token" });

    //adding a decodedToken as a property inside request object so that could be accessed in other handler and middleware of same api

    req.decodedToken = decodedToken.authorId
     
    next();
  } 
catch (error) {

    res
      .status(500)
      .send({ error: error.message })

  }

};



const authorization = async function (req, res, next) {
  try {

    //const blogId = req.headers["x-api-key"];
    const token = req.headers["x-api-key"];

    if (!token) res.send({ msg: "token is reqd" })
     
    const decodedToken = jwt.verify(token, "Blogging-Mini-Site(Project1)")

    if (!decodedToken) res.send({ msg: "token is invalid" })

   let userTobeModified =req.query.authorId||req.params.authorId
    let userLoggedIn = decodedToken.authorId
  

    if (!decodedToken) res.send({ msg: "token is invalid" })

    if ( userTobeModified != userLoggedIn) {  
      return res
        .status(403)
        .send({ status: false, message: "unauthorize access" });
    }

    next();

  }  catch (error) {

      res
        .status(500)
        .send({ error: error.message })
  
    }


}

 module.exports.authentication = authentication
 module.exports.authorization = authorization