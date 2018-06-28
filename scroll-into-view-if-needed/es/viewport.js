var viewport;
export default (function () {
  var doc = document;

  if (!viewport) {
    viewport = doc.compatMode !== 'CSS1Compat' && doc.scrollingElement || doc.documentElement;
  }

  return viewport;
});