const base64ToJson = (base64String) => {
  const json = Buffer.from(base64String, 'base64').toString();
  return JSON.parse(json);
};

module.exports = base64ToJson;
