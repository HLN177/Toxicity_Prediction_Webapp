const REGEX = {
  FILE_EXTENSION: /\.[0-9a-z]+$/i,
  FILE_NAME: /([^\/]+)(?=\.\w+$)/,
  LINE_BREAKS: /(\r\n|\n|\r)/gm
};

export default REGEX;