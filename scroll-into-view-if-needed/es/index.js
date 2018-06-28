import compute from './compute';
import getViewport from './viewport';

function isOptionsObject(options) {
  return options === Object(options) && Object.keys(options).length !== 0;
}

function defaultBehavior(actions, behavior) {
  if (behavior === void 0) {
    behavior = 'auto';
  }

  var viewport = getViewport();
  actions.forEach(function (_ref) {
    var el = _ref.el,
        top = _ref.top,
        left = _ref.left;

    if (el.scroll && 'scrollBehavior' in viewport.style) {
      el.scroll({
        top: top,
        left: left,
        behavior: behavior
      });
    } else {
      if (el === viewport) {
        scrollTo(left, top);
      } else {
        el.scrollTop = top;
        el.scrollLeft = left;
      }
    }
  });
}

function getOptions(options) {
  if (options === false) {
    return {
      block: 'end',
      inline: 'nearest'
    };
  }

  if (isOptionsObject(options)) {
    return options;
  }

  return {
    block: 'start',
    inline: 'nearest'
  };
}

function scrollIntoView(target, options) {
  if (isOptionsObject(options) && typeof options.behavior === 'function') {
    return options.behavior(compute(target, options));
  }

  var computeOptions = getOptions(options);
  return defaultBehavior(compute(target, computeOptions), computeOptions.behavior);
}

export default scrollIntoView;