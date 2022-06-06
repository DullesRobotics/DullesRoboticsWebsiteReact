import React, { useState } from 'react'
import Spacer from '../components/spacer'
import Button from '../components/button'
import Text from '../components/text'
import lang from '../lang/lang.json'
import SectionDivider from '../components/sectiondivider'
import ServerImage from '../components/serverimage'
import Input from '../components/input'
import { useSelector, useDispatch } from 'react-redux'
import {
  loadMediaFolder,
  selectMediaFolders
} from '../slices/mediaPageSlice'
import LoadingIcon from '../components/lottiecomponents/loading'

export default function Media(props) {

  const dispatch = useDispatch();
  const mediaInformation = useSelector(selectMediaFolders);
  if (!mediaInformation.currentFolder && Object.keys(mediaInformation.media).length === 0) {
    dispatch(loadMediaFolder());
  }

  const options = Object.keys(mediaInformation.media);

  const [filters, setFilters] = useState({
    search: null,
    filter: window.location.hash ?
      window.location.hash.replaceAll("_", " ").replaceAll("%20", " ").replace("#", "")
      : 'All Media',
  })

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }
    window.addEventListener('resize', handleResize)
    return _ => window.removeEventListener('resize', handleResize)
  })

  const mediaBundle = []
  if (!mediaInformation.loading) {
    if (filters.filter !== 'All Media') {
      for (let m in mediaInformation.media[filters.filter]) {
        if ((filters.search !== null && mediaInformation.media[filters.filter][m].title.toLowerCase().includes(filters.search.toLowerCase())) || filters.search === null) {
          const currentEntry = mediaInformation.media[filters.filter][m];
          mediaBundle.push(
            <div>
              <MediaElement
                title={currentEntry.title}
                description={currentEntry.description}
                mediaType={currentEntry.type}
                media={currentEntry.url}
                date={currentEntry.date}
                dimensions={dimensions} />
            </div>)
        }
      }
    } else {
      for (let o in options) {
        for (let m in mediaInformation.media[options[o]]) {
          if ((filters.search !== null && mediaInformation.media[options[o]][m].title.toLowerCase().includes(filters.search.toLowerCase())) || filters.search === null) {
            const currentEntry = mediaInformation.media[options[o]][m];
            mediaBundle.push(
              <div>
                <MediaElement
                  title={currentEntry.title}
                  description={currentEntry.description}
                  mediaType={currentEntry.type}
                  media={currentEntry.url}
                  date={currentEntry.date}
                  dimensions={dimensions} />
              </div>)
          }
        }
      }
    }
  }

  return (
    <div>
      <Spacer className="bg-gray-1" />
      <div className="pt-6 pb-5 md:grid md:grid-cols-4 bg-gray-1">
        <div className="col-span-1" />
        <p className="col-span-2 text-center text-white text-5xl font-bold">
          <Text>{lang.media.title}</Text>
        </p>
        <div className="col-span-1" />
      </div>
      <SectionDivider className="h-10 lg:h-15" divider="skew-c" color1={1} color2={5} />
      <div className='bg-gray-5'>
        <div className='w-4/5 mx-auto px-4 pb-4 grid sm:grid-cols-2'>
          {/** have drop downs to choose the category of media to view, and a search bar */}
          <div className='mx-auto sm:mx-0'>
            <p className='text-white text-lg font-semibold'>Filter Media:</p>
            <select onChange={(event) => setFilters({ ...filters, filter: event.target.value })} name='Filter' id='filter' className='rounded p-2 bg-gray-300'>
              <option key='All Media' value='All Media'>All Media</option>
              {options.map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className='mx-auto sm:mx-0 grid grid-cols-12 pt-6'>
            <div className='col-span-11 mr-2 sm:w-9/12 sm:ml-auto'>
              <Input
                placeholder={lang.media.search}
                id="searchField"
              />
            </div>
            <div className='col-span-1'>
              <Button onClick={() => setFilters({ ...filters, search: document.getElementById("searchField").value })} bstyle="primary" className="mt-1"><i className="fas mt-1 fa-magnifying-glass" /></Button>
            </div>
          </div>
        </div>
      </div>
      <SectionDivider className="h-10 lg:h-15" divider="skew-c" color1={5} color2={4} />
      <div className='bg-gray-4'>
        {mediaInformation.loading ? <div className='h-screen py-4'><LoadingIcon /></div> :
          mediaBundle.length === 0 ?
            <div className='text-white text-center text-xl font-semibold h-screen py-4'>No media found</div> :
            <div className="py-4 w-4/5 mx-auto grid grid-cols-1 h-screen md:grid-cols-2 xl:grid-cols-3">
              {mediaBundle}
            </div>
        }
      </div>
    </div>
  )
}

function MediaElement(props) {

  //media type 1 - embed, 0 - image

  const colCount = props.dimensions.width > 768 ? props.dimensions.width > 1280 ? 3 : 2 : 1
  const widthMod = colCount === 3 ? 0.33 : colCount === 2 ? 0.5 : 1

  return (
    <div className='my-3 text-white mx-3 py-3 px-4 rounded bg-gray-3'>
      <div>
        {props.mediaType === 1 ? <iframe
          className='mx-auto rounded'
          src={props.media}
          title={props.title}
          width={props.dimensions.width * 0.72 * widthMod - 24}
          height={props.dimensions.width * 0.72 * widthMod * (12 / 16) - 24}
          allow="autoplay" /> : null}
        {props.mediaType === 0 ? <ServerImage className="mx-auto rounded" alt={props.title} file={props.media} /> : null}
        <p className='font-bold text-3xl pt-4'>{props.title}</p>
        <p className='text-lg font-bold'>{props.date}</p>
        <p className='text-lg'>{props.description}</p>
      </div>
    </div>
  )
}