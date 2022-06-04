import React, { useState } from 'react'
import fetch from 'node-fetch'
import dataJson from "../data.json"
import LoadingIcon from './lottiecomponents/loading';
import { useSelector, useDispatch } from 'react-redux'
import {
  loadMediaFile,
  selectMedia
} from '../slices/mediaSlice'
import { InView } from 'react-intersection-observer';

export default function ServerImage(props) {

  const dispatch = useDispatch();
  const blobs = useSelector(selectMedia);

  const [visible, setVisible] = useState(false);

  if (!visible)
    return (
      <InView
        as="div"
        threshold={0}
        rootMargin="10px 10px 10px 10px"
        onChange={(isVisible) => {
          console.log("isVisible:" + isVisible);
          setVisible(isVisible);
        }}
      >
        <LoadingIcon />
      </InView>
    )

  let url

  if (blobs.cached.has(props.file))
    url = blobs.cached.get(props.file)
  else
    dispatch(loadMediaFile(props.file))

  return url ? <img src={url} style={props.style} alt={props.alt} className={props.className}>{props.children}</img> : <LoadingIcon />;

}