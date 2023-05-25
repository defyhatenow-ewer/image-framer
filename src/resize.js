import Resizer from "react-image-file-resizer";

const resizeFile = (file, height, width) => {
  if (height/width === 1){
    return new Promise((resolve) => {
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
        1050,
      );
    });
  } else if (height > 1050 || width > 1050) {
    return new Promise((resolve) => {
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
      );
    });
  } else if (width > height) {
    return new Promise((resolve) => {
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
        1050
      );
    });
  }
  return new Promise((resolve) => {
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
      width,
      1050,
    );
  });
}

export default resizeFile;
