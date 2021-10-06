const randomString = (length=7) => {
  let result;
  let results = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    results.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  result = results.join('');
  return result;
};

export default randomString;