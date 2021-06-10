import React from 'react'
import Spacer from '../components/spacer'
import Button from '../components/button'
import Text from '../components/text'
import lang from '../lang/lang.json'
import documentList from './documents.json'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectDocuments,
  loadDocuments
} from '../slices/documentSlice'
import LoadingIcon from '../components/lottiecomponents/loading';

function Documents(props) {
  const bundle = [];

  const docData = useSelector(selectDocuments);
  const dispatch = useDispatch();

  if (docData.documents.length === 0 && !docData.finished && !docData.loading && !docData.error)
    dispatch(loadDocuments());

  for (let i in docData.documents) {
    const doc = docData.documents[i]
    let url = lang.documents.url + doc.file
    bundle.push(
      <div className="py-6 px-3">
        <p className="text-left text-white text-3xl font-bold">
          {doc.title}
        </p>
        <p className="pt-1 text-left text-white text-base font-normal">
          {doc.description} ({doc.file_size_kb + " KB"})
        </p>
        {doc.date ? <p className="text-left italic text-gray-300 text-base font-normal">
          {doc.date}
        </p> : <></>}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer">
          <Button bstyle="primaryGreen" className="text-lg" animate>
            <span class="pl-2 pr-1">
              {lang.documents.view}
            </span>
            <i class="pl-1 pr-2 fas fa-eye" />
          </Button>
        </a>
        <a
          className="px-2"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          download={doc.output_file_name ? doc.output_file_name : ""}
        >
          <Button bstyle="primary" className="text-lg" animate>
            <span class="pl-2 pr-1">
              {lang.documents.download}
            </span>
            <i class="pl-1 pr-2 fas fa-cloud-download-alt" />
          </Button>
        </a>
      </div>
    );
  }

  return (
    <div>
      <Spacer className="bg-gray-1" />
      <div className="pt-6 pb-5 md:grid md:grid-cols-4 bg-gray-1">
        <div className="col-span-1" />
        <p className="col-span-2 text-center md:text-left text-white text-5xl font-bold">
          <Text>{lang.documents.title}</Text>
        </p>
        <div className="col-span-1" />
      </div>
      <div className="pt-4 pb-5 md:grid md:grid-cols-6 lg:grid-cols-4 bg-gray-3">
        <div className="col-span-1" />
        <div className={`mx-3 md:mx-0 col-span-4 lg:col-span-2 divide-y divide-white text-left text-white text-5xl font-bold`}>
          {docData.loading && !docData.finished ? <LoadingIcon /> : docData.error ? <p>Sorry, there was an error loading documents. Try again or contact us.</p> : bundle}
          <div />
        </div>
        <div className="col-span-1" />
      </div>
      <div className="bg-gray-3" style={docData.loading && !docData.finished ? { 'min-height': '70vh' } : { 'min-height': '58vh' }}></div>
    </div>
  );
}

export default Documents;