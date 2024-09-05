import md5 from "crypto-js/md5";

export const generateAuthenticationString = () => {
  const ts = new Date().getTime();
  const publicKey = process.env.MARVEL_API_PUBLIC_KEY;
  const privateKey = process.env.MARVEL_API_PRIVATE_KEY;

  if (!publicKey || !privateKey) {
    throw new Error("Las claves API de Marvel no están definidas");
  }

  const hash = md5(`${ts}${privateKey}${publicKey}`).toString();
  return `ts=${ts}&apikey=${publicKey}&hash=${hash}`;
};
