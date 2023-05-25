import { useState } from 'react';
import mergeImages from 'merge-images';
import resizeFile from './resize';
import assets from './assets';

function App() {
  const [image, setImage] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  if (uploadedImage){
    const img = new Image();
    console.log({ src: URL.createObjectURL(uploadedImage) });
    img.src = URL.createObjectURL(uploadedImage);
    img.decode().then(() => {
      resizeFile(uploadedImage, img.height, img.width).then(upload => {
        const newImg = new Image();
        newImg.src = upload;
        mergeImages([{ src: upload, x: (1200-newImg.width)/2, y: (1200-newImg.height)/3 }, { src: assets.peaceJamFrame, x: 0, y: 0 }])
          .then(image => {
            setImage(image);
        });
      });
    });
  }

  return (
    <div className='container flex flex-col justify-center items-center min-h-screen px-5'>
      <h2 className='text-lg font-bold mb-5 mt-5'>Upload your photo to create a peacejam-framed social media profile picture.</h2>
      <label htmlFor='uploadFile' className='relative h-16 w-64 mb-5 rounded-2xl cursor-pointer md:w-96' style={{ backgroundColor: '#f6ff21' }}>
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center px-5'>
          <p className='text-center pe-2'>Click or drag your photo here to upload</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
          </svg>
        </div>
        <input id='uploadFile' type='file' name='uploadedImage' onChange={(e) => setUploadedImage(e.target.files[0])} className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer" />
      </label>
      {uploadedImage && image && (
        <div className='flex flex-col justify-center gap-10 items-center mb-5 md:flex-row'>
          <div className='flex flex-col text-center'>
            <img src={URL.createObjectURL(uploadedImage)} className="w-auto rounded md:h-96" alt='uploaded image' />
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hidden md:block">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 block md:hidden">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
          </svg>
          <a href={image} download="image.png" className='flex flex-col items-center'>
            <img src={image} className="mb-3 md:h-96" />
            <p className='text-base text-center border border-black text-blue-700 px-3 py-1 rounded hover:bg-black hover:text-white max-w-fit'>Download</p>
          </a>
        </div>
      )}
      {uploadedImage && !image && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 animate-spin">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
      }
    </div>
  );
}

export default App
