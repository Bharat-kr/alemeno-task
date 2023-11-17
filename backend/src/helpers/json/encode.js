const jsonToBase64 = (object) => {
  const json = JSON.stringify(object);
  return Buffer.from(json).toString('base64');
};

module.exports = jsonToBase64;
