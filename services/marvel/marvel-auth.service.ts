import md5 from "crypto-js/md5";

export const generateAuthenticationString = () => {
  const ts = new Date().getTime(); // Timestamp actual
  const publicKey = process.env.MARVEL_API_PUBLIC_KEY; // Clave pública desde el entorno
  const privateKey = process.env.MARVEL_API_PRIVATE_KEY; // Clave privada desde el entorno

  // Verifica que ambas claves estén definidas
  if (!publicKey || !privateKey) {
    throw new Error("Las claves API de Marvel no están definidas");
  }

  // Genera el hash utilizando la clave privada, la clave pública y el timestamp
  const hash = md5(`${ts}${privateKey}${publicKey}`).toString();

  // Retorna el string de autenticación con timestamp, apikey y hash
  return `ts=${ts}&apikey=${publicKey}&hash=${hash}`;
};
