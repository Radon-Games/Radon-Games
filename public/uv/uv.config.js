const xor = {
  encode(str){
    if (!str) return str;
    return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
  },
  decode(str){
    if (!str) return str;
    let [ input, ...search ] = str.split('?');

    return decodeURIComponent(input).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char).join('') + (search.length ? '?' + search.join('?') : '');
  },
};

self.__uv$config = {
  prefix: "/~/",
  bare: `/bare/`,
  encodeUrl: xor.encode,
  decodeUrl: xor.decode,
  handler: "/uv/uv.handler.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv/uv.config.js",
  sw: "/uv/uv.sw.js",
};
