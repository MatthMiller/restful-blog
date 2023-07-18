import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers;
    console.log(token);
    // Pegar o token que o client colocou
    // no Authentication no header
    // ler com jwt verify
    // passar o payload decodado
    // no data da request pra ser usado
    // no handler que vier no next
    // (seja post, user, comment, qualquer coisa)

    // Executa a função do controller
    // (próximo passo do >middle<ware)
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleware;
