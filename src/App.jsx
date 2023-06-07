import { useState } from 'react';
import mergeImages from 'merge-images';
import resizeFile from './resize';
import assets from './assets';
import { Spinner, ArrowDown, ArrowUp, Upload, ArrowLeft } from './Icons';

const frames = [
  {
    src: assets.peaceJam2023EN,
    language: "EN",
    downloadText: "Download",
    uploadText: "Upload your photo to create a peacejam-framed social media profile picture",
    uploadPrompt: "Click or drag your photo here to upload",
  },
  {
    src: assets.peaceJam2023FR,
    language: "FR",
    downloadText: "Télécharger",
    uploadText: "Téléchargez votre photo pour créer une image de profil de média social encadrée par Peacejam",
    uploadPrompt: "Cliquez ou faites glisser votre photo ici pour la télécharger",
  }
];

function App() {
  const [frame, setFrame] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [mergedImage, setMergedImage] = useState(null);
  const [index, setIndex] = useState(0);

  if (uploadedImage) {
    const img = new Image();
    img.src = URL.createObjectURL(uploadedImage);
    img.decode().then(() => {
      resizeFile(uploadedImage, img.height, img.width).then(upload => {
        const newImg = new Image();
        newImg.src = upload;
        mergeImages([{ src: upload, x: (1200-newImg.width)/2, y: (1200-newImg.height)/3 }, { src: frame, x: 0, y: 0 }])
          .then(image => {
            setMergedImage(image);
        });
      });
    });
  }

  return (
    <div className='container flex flex-col justify-center items-center min-h-screen px-5'>

      {!frame && (
        <div className='flex flex-col md:flex-row justify-between items-center gap-10 mt-5 md:mt-0'>
          {frames.map((f, i) => <img src={f.src} alt='frame' key={i} className='md:h-64 md:w-64 cursor-pointer' onClick={() => {
            setFrame(f.src);
            setIndex(i);
          }} />)}
        </div>
      )}

      {/* After frame is chosen */}
      {frame && <div className='flex flex-col items-center gap-5 mb-5 mt-5'>
        <button onClick={() => setFrame(null)}><ArrowLeft /></button>
        {!uploadedImage ? <img src={frame} alt="frame"className='mb-3 md:h-96 md:w-96' /> : !mergedImage ? <Spinner /> : (
          <div className='flex flex-col justify-center gap-10 items-center mb-3 md:flex-row'>
            <div className='flex flex-col text-center'>
              <img src={URL.createObjectURL(uploadedImage)} className="w-auto rounded md:h-96" alt='uploaded image' />
            </div>
            <ArrowDown />
            <ArrowUp />
            <a href={mergedImage} download="image.png" className='flex flex-col items-center'>
              <img src={mergedImage} className="mb-3 md:h-96" />
              <p className='text-base text-center border border-black text-black px-3 py-1 rounded bg-yellow-300 hover:bg-black hover:text-white max-w-fit'>{frames[index].downloadText}</p>
            </a>
          </div>
        )}
        <h2 className='text-lg text-center font-bold mb-5 mt-5'>{frames[index].uploadText}</h2>
        <label htmlFor='uploadFile' className='relative h-16 w-64 mb-5 rounded-2xl cursor-pointer md:w-96' style={{ backgroundColor: '#f6ff21' }}>
          <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center px-5'>
            <p className='text-center pe-2'>{frames[index].uploadPrompt}</p>
            <Upload />
          </div>
          <input id='uploadFile' type='file' name='uploadedImage' onChange={(e) => {
            setUploadedImage(e.target.files[0]);
          }} className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer" />
        </label>
      </div>}
    </div>
  );
}

export default App;

