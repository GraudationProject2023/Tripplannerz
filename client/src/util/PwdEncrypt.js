import CryptoJS from "crypto-js";

export const PwdEncrypt = (pwd, originSalt, originIv) => {
  const salt =
    originSalt ||
    CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
  const iv =
    originIv ||
    CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);

  const iterations = 10000;

  const key512Bits10000Iterations = CryptoJS.PBKDF2(
    pwd, // 실제 비밀번호를 사용
    CryptoJS.enc.Hex.parse(salt),
    {
      keySize: 512 / 32,
      iterations,
    }
  );

  const encrypted = CryptoJS.AES.encrypt(pwd, key512Bits10000Iterations, {
    iv: CryptoJS.enc.Hex.parse(iv),
  });

  return {
    encryptedPwd: encrypted.toString(),
    salt,
    iv,
  };
};

export const PwdDecrypt = (encryptedPwd, salt, iv) => {
  const key512Bits10000Iterations = CryptoJS.PBKDF2(
    encryptedPwd,
    CryptoJS.enc.Hex.parse(salt),
    {
      keySize: 512 / 32,
      iterations: 10000,
    }
  );

  const decrypted = CryptoJS.AES.decrypt(
    encryptedPwd,
    key512Bits10000Iterations,
    {
      iv: CryptoJS.enc.Hex.parse(iv),
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
};
