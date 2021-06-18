import React from 'react'
import Spacer from '../components/spacer'
import Button from '../components/button'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  loadMediaFile,
  selectMedia
} from '../slices/mediaSlice'
import images from '../lang/images.json'

export default function FourOFourPage(props) {

  const dispatch = useDispatch();
  const blobs = useSelector(selectMedia);
  let url

  if (blobs.cached.has(images.fourOfour))
    url = blobs.cached.get(images.fourOfour)
  else
    dispatch(loadMediaFile(images.fourOfour))

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${url})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          margin: '0 auto',
          width: '100%',
          backgroundPosition: "center center"
        }}>
        <div
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(0, 203, 221, 0.6) 0%, rgba(165, 28, 28, 0.65) 90%)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            margin: '0 auto',
            width: '100%',
            backgroundPosition: "center center"
          }}
        >
          <p className="text-white font-bold text-center pt-32 text-7xl" style={{ textShadow: "10px 10px 5px rgba(119,119,119,0.5)" }}>404</p>
          <p className="text-white text-2xl md:text-4xl font-bold text-center">That Page Can't Be Found
            <p className="pt-8 md:mt-0">
              <Link to="/">
                <Button bstyle="primary" className="text-lg shadowmx-auto shadow-bluehover" animate>Return Home</Button>
              </Link>
            </p>
          </p>
          <div style={{ 'min-height': '60vh' }}></div>
        </div>
      </div>
    </div>
  );

}
