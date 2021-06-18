import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import gfm from 'remark-gfm'

export default function Text(props) {
  return <post><ReactMarkdown plugins={[gfm]} allowDangerousHtml>{props.children}</ReactMarkdown></post>
}

