'use strict';
/* eslint-disable no-magic-numbers */

const serialize = require('serialize-javascript');

const ONE_SECOND = 1000;
const FIFTEEN_MINUTES = 1000 * 60 * 15;

const createRenderer = bundle => {
  return require('vue-server-renderer').createBundleRenderer(bundle, {
    cache: require('lru-cache')({
      max: ONE_SECOND,
      maxAge: FIFTEEN_MINUTES
    })
  });
}

/* Return index.html, split at the point where SPA code is injected */
const parseIndex = template => {
  const contentMarker = '<!-- APP -->';
  const contentIdx = template.indexOf(contentMarker);
  return {
    head: template.slice(0, contentIdx),
    tail: template.slice(contentIdx + contentMarker.length)
  };
}

/* Update metadata of generated index.html file */
const updateMeta = (head, context) => {

  const injectHeader = (regex, field) => {
    if (context[field]) {
      head = head.replace(regex, `$1${context[field]}$3`);
    }
  }

  // Inject title, metadata, and keywords into header if present
  injectHeader(/(<title>)(.*?)(<\/title>)/, 'title');
  injectHeader(/(<meta name="description" content=")(.*?)(">)/, 'description');
  injectHeader(/(<meta name="keywords" content=")(.*?)(">)/, 'keywords');

  return head;
}

// Performs server-side rendering
// Context: { renderer, indexHTML }
function ssr(req, res, next) {
  if (!this.renderer) {
    return res.end('waiting for compilation... refresh in a moment.');
  }

  res.setHeader("Content-Type", "text/html");
  const context = { url: req.url };
  const renderStream = this.renderer.renderToStream(context);

  renderStream.once('data', () => {
    res.write(updateMeta(this.indexHTML.head, context));
  });

  renderStream.on('data', chunk => {
    res.write(chunk);
  });

  renderStream.on('end', () => {
    // embed initial store state
    if (context.initialState) {
      res.write(
        `<script>window.__INITIAL_STATE__=${
          serialize(context.initialState, { isJSON: true })
        }</script>`
      );
    }
    res.end(this.indexHTML.tail);
  });

  renderStream.on('error', err => {
    next(err);
  })
}

module.exports = { createRenderer, parseIndex, ssr };
