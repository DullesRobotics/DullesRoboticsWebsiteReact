import React from 'react'
import fetch from 'node-fetch'
import dataJson from "../data.json"
import LoadingIcon from './lottiecomponents/loading';
import { useSelector, useDispatch } from 'react-redux'
import {
  loadMediaFile,
  selectMedia
} from '../slices/mediaSlice'

export default function ServerImage(props) {

  const dispatch = useDispatch();
  const blobs = useSelector(selectMedia);
  let url

  if (blobs.cached.has(props.file))
    url = blobs.cached.get(props.file)
  else
    dispatch(loadMediaFile(props.file))

  return url ? <img src={url} alt={props.alt} className={props.className}>{props.children}</img> : <LoadingIcon />;

}