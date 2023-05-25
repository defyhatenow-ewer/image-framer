import { useState } from 'react';
import mergeImages from 'merge-images';
import resizeFile, { expandFile } from './resize';
import assets from './assets';

function App() {
  const [image, setImage] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  if (uploadedImage){
    const img = new Image();
    img.src = URL.createObjectURL(uploadedImage);
    img.decode().then(() => {
      if (img.width > 1050 || img.height > 1050){
        resizeFile(uploadedImage).then(upload => {
          const newImg = new Image();
          newImg.src = upload;
          mergeImages([{ src: upload, x: (1200-newImg.width)/2, y: (1200-newImg.height)/3 }, { src: assets.peaceJamFrame, x: 0, y: 0 }])
          .then(image => {
            setImage(image);
          });
        })
      } else {
        expandFile(uploadedImage).then(upload => {
          mergeImages([{ src: upload, x: 75, y: 25 }, { src: assets.peaceJamFrame, x: 0, y: 0 }])
          .then(image => {
            setImage(image);
          });
        })
      }
    });
    // resizeFile(uploadedImage).then(upload => {
    //   mergeImages([{ src: upload, x: (1200-img.width)/2, y: (1200-img.height)/3 }, { src: assets.peaceJamFrame, x: 0, y: 0 }])
    //   .then(image => {
    //     setImage(image);
    //   });
    // })
  }

  return (
    <div className='container flex flex-col justify-center items-center min-h-screen'>
      <h2 className='text-lg font-bold mb-5'>This is an Image Framing App. Upload your image and it will be framed using the peaceJam custom frame</h2>
      <input type='file' name='uploadedImage' onChange={(e) => setUploadedImage(e.target.files[0])} className="mb-5" />
      {uploadedImage && image && (
        <div className='flex justify-center gap-10 items-center'>
          <div className='flex flex-col text-center'>
            <img src={URL.createObjectURL(uploadedImage)} className="h-96 w-auto rounded" alt='uploaded image' />
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
          <a href={image} download="image.png" className='flex flex-col items-center'>
            <img src={image} className="h-96 w-96 mb-3" />
            <p className='text-base text-center border border-black text-blue-700 px-3 py-1 rounded hover:bg-black hover:text-white max-w-fit'>Download</p>
          </a>
        </div>
      )}
    </div>
  );
}

export default App
