import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectPosts,
  getMorePosts,
  getPost
} from '../slices/postsSlice'
import Spacer from '../components/spacer'
import Button from '../components/button'
import LoadingIcon from '../components/lottiecomponents/loading';
import ReactMarkdown from 'react-markdown/with-html'
import gfm from 'remark-gfm'
import { Redirect, useParams, Link } from "react-router-dom";
import '../styles/posts.module.css'
import Text from '../components/text'
import lang from '../lang.json'

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function PostPage() {
  const postsData = useSelector(selectPosts);
  const dispatch = useDispatch();

  let isLoading = false;

  let { id } = useParams(), post, d = new Date(0), ds;

  if (!id)
    return <Redirect to="/news" />;

  if (postsData.indPost.length > 0 && postsData.indPost.map(a => a.id).indexOf(id) > -1)
    post = postsData.indPost[postsData.indPost.map(a => a.id).indexOf(id)];
  else {
    for (let n in postsData.posts) {
      if (postsData.posts[n].id === id) {
        post = postsData.posts[n];
        break;
      }
    }
    if (!post && !postsData.loading) {
      isLoading = true;
      console.log("hi: " + postsData.indPost);
      dispatch(getPost(id));
    }
  }

  if (postsData.error)
    return <Redirect to="/news" />;

  if (!isLoading && !postsData.loading) {
    if (!post || !post.content)
      return <Redirect to="/news" />;

    d.setUTCMilliseconds(post.timestamp);
    ds = monthNames[d.getMonth()] + " " + d.getDay() + ", " + d.getFullYear();
  }

  const prevButton = <Button bstyle={!isLoading && !postsData.loading && post.prevID ? "secondary" : "secondaryDisabled"} >
    <Text>{lang.news.post_navigation.prev}</Text>
  </Button>,
    nextButton = <Button bstyle={!isLoading && !postsData.loading && post.nextID ? "secondary" : "secondaryDisabled"} >
      <Text>{lang.news.post_navigation.next}</Text>
    </Button>;

  return (
    <div><Spacer className="bg-gray-5" />
      <div className="py-2 md:py-6 md:grid md:grid-cols-5 xl:grid-cols-4 bg-gray-5">
        <div className="col-span-1" />
        <div className="md:col-span-3 xl:col-span-2">
          <p className="text-gray-500 text-xl md:text-2xl xl:text-3xl font-bold mx-5 leading-10 md:mb-2">
            {!isLoading && !postsData.loading ? post.category : ""}
          </p>
          <p className="text-white text-3xl md:text-4xl xl:text-5xl font-bold mx-5 leading-10">
            {!isLoading && !postsData.loading ? post.title : <LoadingIcon />}
          </p>
        </div>
        <div className="col-span-1" />
      </div>
      <div className="md:py-2 md:grid md:grid-cols-5 xl:grid-cols-4 bg-gray-3">
        <div className="col-span-1" />
        <div className="md:col-span-3 xl:col-span-2 text-white text-lg md:text-xl font-semibold mx-5 leading-10">
          <p>{!isLoading && !postsData.loading ? "Published " + ds : <LoadingIcon />}</p>
        </div>
        <div className="col-span-1" />
      </div>
      <div className="py-4 md:grid md:grid-cols-5 xl:grid-cols-4">
        <div className="col-span-1" />
        <div className="md:col-span-3 xl:col-span-2 text-white text-lg mx-5">
          <p>
            {!isLoading && !postsData.loading ?
              <post>
                <ReactMarkdown allowDangerousHtml plugins={[gfm]}>
                  {post.content}
                </ReactMarkdown>
              </post> : <LoadingIcon />
            }
          </p>
          <div className="mt-20 flex">
            <span className="mx-auto">
              <span>{!isLoading && !postsData.loading && post.prevID ? <Link to={`/news/post/${post.prevID}`}>{prevButton}</Link> : prevButton}</span>
              <span className="mx-2">
                <Link to="/news">
                  <Button bstyle="secondary" >
                    <Text>{lang.news.post_navigation.back}</Text>
                  </Button>
                </Link>
              </span>
              <span>{!isLoading && !postsData.loading && post.nextID ? <Link to={`/news/post/${post.nextID}`}>{nextButton}</Link> : nextButton}</span>
            </span>
          </div>
        </div>
        <div className="col-span-1" />
      </div>
      <div style={{ 'min-height': '54vh' }}></div>
    </div>
  );
}