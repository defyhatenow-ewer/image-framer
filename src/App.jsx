import { useState } from 'react';
import mergeImages from 'merge-images';
import resizeFile from './resize';
import assets from './assets';
import { Spinner, ArrowDown, ArrowUp, Upload } from './Icons';

function App() {
  const [englishImage, setEnglishImage] = useState(null);
  const [englishMergedImage, setEnglishMergedImage] = useState(null);
  const [frenchImage, setfrenchImage] = useState(null);
  const [frenchMergedImage, setFrenchMergedImage] = useState(null);

  if (englishImage) {
    const img = new Image();
    img.src = URL.createObjectURL(englishImage);
    img.decode().then(() => {
      resizeFile(englishImage, img.height, img.width).then(upload => {
        const newImg = new Image();
        newImg.src = upload;
        mergeImages([{ src: upload, x: (1200-newImg.width)/2, y: (1200-newImg.height)/3 }, { src: assets.peaceJam2023EN, x: 0, y: 0 }])
          .then(image => {
            setEnglishMergedImage(image);
        });
      });
    });
  }

  if (frenchImage) {
    const img = new Image();
    img.src = URL.createObjectURL(frenchImage);
    img.decode().then(() => {
      resizeFile(frenchImage, img.height, img.width).then(upload => {
        const newImg = new Image();
        newImg.src = upload;
        mergeImages([{ src: upload, x: (1200-newImg.width)/2, y: (1200-newImg.height)/3 }, { src: assets.peaceJam2023FR, x: 0, y: 0 }])
          .then(image => {
            setFrenchMergedImage(image);
        });
      });
    });
  }

  return (
    <div className='container flex flex-col justify-center items-center min-h-screen px-5'>

      {/* English frame */}
      <div className='flex flex-col items-center gap-5 mb-5 mt-5'>
        {!englishImage ? <img src={assets.peaceJam2023EN} alt="English frame"className='mb-3 md:h-96 md:w-96' /> : !englishMergedImage ? <Spinner /> : (
          <div className='flex flex-col justify-center gap-10 items-center mb-5 md:flex-row'>
            <div className='flex flex-col text-center'>
              <img src={URL.createObjectURL(englishImage)} className="w-auto rounded md:h-96" alt='uploaded image' />
            </div>
            <ArrowDown />
            <ArrowUp />
            <a href={englishMergedImage} download="image.png" className='flex flex-col items-center'>
              <img src={englishMergedImage} className="mb-3 md:h-96" />
              <p className='text-base text-center border border-black text-black px-3 py-1 rounded bg-yellow-300 hover:bg-black hover:text-white max-w-fit'>Download</p>
            </a>
          </div>
        )}
        <h2 className='text-lg text-center font-bold mb-5 mt-5'>Upload your photo to create a peacejam-framed social media profile picture</h2>
        <label htmlFor='uploadFile' className='relative h-16 w-64 mb-5 rounded-2xl cursor-pointer md:w-96' style={{ backgroundColor: '#f6ff21' }}>
          <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center px-5'>
            <p className='text-center pe-2'>Click or drag your photo here to upload</p>
            <Upload />
          </div>
          <input id='uploadFile' type='file' name='uploadedImage' onChange={(e) => {
            setEnglishImage(e.target.files[0]);
          }} className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer" />
        </label>
      </div>

      {/* French frame */}
      <div className='flex flex-col items-center gap-5 mb-5 mt-5'>
        {!frenchImage ? <img src={assets.peaceJam2023FR} alt="English frame"className='mb-3 md:h-96 md:w-96' /> : !frenchMergedImage ? <Spinner /> : (
          <div className='flex flex-col justify-center gap-10 items-center mb-5 md:flex-row'>
            <div className='flex flex-col text-center'>
              <img src={URL.createObjectURL(frenchImage)} className="w-auto rounded md:h-96" alt='uploaded image' />
            </div>
            <ArrowDown />
            <ArrowUp />
            <a href={frenchMergedImage} download="image.png" className='flex flex-col items-center'>
              <img src={frenchMergedImage} className="mb-3 md:h-96" />
              <p className='text-base text-center border border-black text-blue-700 px-3 py-1 rounded hover:bg-black hover:text-white max-w-fit'>Télécharger</p>
            </a>
          </div>
        )}
        <h2 className='text-lg text-center font-bold mb-5 mt-5'>Téléchargez votre photo pour créer une image de profil de média social encadrée par Peacejam</h2>
        <label htmlFor='uploadFile' className='relative h-16 w-64 mb-5 rounded-2xl cursor-pointer md:w-96' style={{ backgroundColor: '#f6ff21' }}>
          <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center px-5'>
            <p className='text-center pe-2'>Cliquez ou faites glisser votre photo ici pour la télécharger</p>
            <Upload />
          </div>
          <input id='uploadFile' type='file' name='uploadedImage' onChange={(e) => {
            setfrenchImage(e.target.files[0]);
          }} className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer" />
        </label>
      </div>
    </div>
  );
}

export default App;

