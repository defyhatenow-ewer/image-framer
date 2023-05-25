import Resizer from "react-image-file-resizer";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1050,
      1050,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64",
      1050,
      1050
    );
  });

export default resizeFile;
