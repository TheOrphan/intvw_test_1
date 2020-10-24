/**
 * Return first letter capitalize of strings.
 *
 * @param s {String} String to formated with first letter capitalize
 */
export function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Return true value if object is empty.
 *
 * @param object {Any} Any type of object to check if its empty
 */
export function isEmpty(object) {
  switch (typeof object) {
    case 'string':
      return object === '';
    case 'object': //array known as an object tho
      return Array.isArray(object)
        ? object.length === 0
        : Object.entries(object).length === 0 && object.constructor === Object;
    case 'undefined':
      return true;
    default:
  }
}

/**
 * Return promise of file uploaded.
 *
 * @param file {file} file uploaded
 */
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

/**
 * Return converted integer of bytes to closest unit.
 *
 * @param bytes {integer} byte to convert
 * @param decimals {integer} allowed decimals after comma
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function iconOfWords(word) {
  const words = word.split(' ');
  return (
    <center style={{ textTransform: 'uppercase' }}>
      {words.map(str => str.substring(0, 1))}
    </center>
  );
}

export function genCharArray(charA, charZ) {
  var a = [],
    i = charA.charCodeAt(0),
    j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
}
