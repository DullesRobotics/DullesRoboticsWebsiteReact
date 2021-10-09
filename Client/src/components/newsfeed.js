import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectPosts,
  getMorePosts,
  deleteIndPosts
} from '../slices/postsSlice'
import Button from './button'
import { Link } from 'react-router-dom'
import LoadingIcon from '../components/lottiecomponents/loading';
import ReactMarkdown from 'react-markdown/with-html'
import gfm from 'remark-gfm'
import PropTypes from 'prop-types'
import Text from '../components/text'
import lang from '../lang/lang.json'

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function NewsFeed(props) {
  const postsData = useSelector(selectPosts);
  const dispatch = useDispatch();
  if (postsData.posts.length === 0 && !postsData.finished && !postsData.loading && !postsData.error) {
    if (postsData.indPost.length > 0) dispatch(deleteIndPosts());
    dispatch(getMorePosts());
  }

  const htmlBundle = [];
  let extraFob;

  for (let n in postsData.posts)
    if (props.max && n >= props.max)
      break;
    else
      htmlBundle.push(
        <PostBubble
          id={postsData.posts[n].id}
          title={postsData.posts[n].title}
          category={postsData.posts[n].category}
          timestamp={postsData.posts[n].timestamp}
          content={postsData.posts[n].content} />);

  if (postsData.error)
    extraFob = <p className="text-center text-gray-300">
      <Text>{lang.news.post_loading_error}</Text>
    </p>
  else
    if (!postsData.finished) {
      if (postsData.loading)
        extraFob = <LoadingIcon />
      else if (props.allowMore)
        extraFob =
          <span className="flex">
            <button
              onClick={() => {
                if (!postsData.finished && !postsData.loading && !postsData.error)
                  dispatch(getMorePosts());
              }}
              className="mx-auto">
              <Button animate={true} bstyle="primaryGray">
                <Text>{lang.news.load_more_posts}</Text>
              </Button>
            </button>
          </span>
    } else if (props.allowMore)
      extraFob = <p className="text-center text-gray-300"><Text>{lang.news.end}</Text></p>

  return (
    <div className={props.className}>
      <div>{htmlBundle}</div>
      <div>{extraFob}</div>
    </div>
  );
}

class PostBubble extends React.Component {
  render() {

    let d = new Date(0);
    d.setUTCMilliseconds(this.props.timestamp);
    let ds = monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();

    let c = this.props.content.substring(0, 200), cl = c.split(" "), cf = c;
    if (cl.length > 0 && c.length >= 200) {
      cl.pop();
      cf = cl.join(" ") + "...";
    }

    return (
      <div id={this.props.id} className="bg-gray-2 my-4 p-4 ml-4 mr-2 md:ml-0 md:mr-0 rounded shadow-lg">
        <Link to={"/news/post/" + this.props.id}><h2 className="font-bold text-3xl">
          {this.props.title}
        </h2>
        </Link>
        <p className="mb-2">{this.props.category + " ● " + ds}</p>
        <p>
          <postdisplay>
            <ReactMarkdown plugins={[gfm]} allowDangerousHtml>
              {cf}
            </ReactMarkdown>
          </postdisplay>
        </p>
        <Link to={"/news/post/" + this.props.id}><Button bstyle="tertiary" className="mt-2">
          <span className="text-sm">
            <Text>{lang.news.read_more_of_post}</Text>
          </span>
        </Button>
        </Link>
      </div>
    )
  }
}

PostBubble.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired
}

NewsFeed.defaultProps = {
  allowMore: false
}

NewsFeed.propTypes = {
  allowMore: PropTypes.bool,
  max: PropTypes.number
}

export default NewsFeed;