
function getBase64(file: Blob): Promise<string | ArrayBuffer | null> {
  return new Promise(resolve => {
    let baseURL: string | ArrayBuffer | null = '';
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

async function getImageBase64URL(file: Blob): Promise<string> {
  let imgBaseURL = '';
  let baseURL = await getBase64(file);
  if (typeof baseURL === 'string') {
    //https://stackoverflow.com/questions/38633061/how-can-i-strip-the-dataimage-part-from-a-base64-string-of-any-image-type-in-ja
    imgBaseURL = baseURL.replace(/^data:image\/[a-z]+;base64,/, '');
  }
  return imgBaseURL;
}

export {
  getBase64,
  getImageBase64URL
};