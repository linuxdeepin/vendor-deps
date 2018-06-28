import getViewport from './viewport';

function isElement(el) {
  return el != null && typeof el === 'object' && (el.nodeType === 1 || el.nodeType === 11);
}

function canOverflow(el, axis, skipOverflowHiddenElements) {
  var overflowValue = getComputedStyle(el, null)[axis];

  if (skipOverflowHiddenElements && overflowValue === 'hidden') {
    return false;
  }

  return overflowValue !== 'visible' && overflowValue !== 'clip';
}

function isScrollable(el, skipOverflowHiddenElements) {
  return el === getViewport() || el.clientHeight < el.scrollHeight && canOverflow(el, 'overflowY', skipOverflowHiddenElements) || el.clientWidth < el.scrollWidth && canOverflow(el, 'overflowX', skipOverflowHiddenElements);
}

function alignNearest(scrollingEdgeStart, scrollingEdgeEnd, scrollingSize, scrollingBorderStart, scrollingBorderEnd, elementEdgeStart, elementEdgeEnd, elementSize) {
  if (elementEdgeStart < scrollingEdgeStart && elementEdgeEnd > scrollingEdgeEnd || elementEdgeStart > scrollingEdgeStart && elementEdgeEnd < scrollingEdgeEnd) {
    return 0;
  }

  if (elementEdgeStart < scrollingEdgeStart && elementSize < scrollingSize || elementEdgeEnd > scrollingEdgeEnd && elementSize > scrollingSize) {
    return elementEdgeStart - scrollingEdgeStart - scrollingBorderStart;
  }

  if (elementEdgeEnd > scrollingEdgeEnd && elementSize < scrollingSize || elementEdgeStart < scrollingEdgeStart && elementSize > scrollingSize) {
    return elementEdgeEnd - scrollingEdgeEnd + scrollingBorderEnd;
  }

  return 0;
}

export default (function (target, options) {
  var scrollMode = options.scrollMode,
      block = options.block,
      inline = options.inline,
      boundary = options.boundary,
      skipOverflowHiddenElements = options.skipOverflowHiddenElements;
  var checkBoundary = typeof boundary === 'function' ? boundary : function (node) {
    return node !== boundary;
  };

  if (!isElement(target)) {
    throw new Error('Element is required in scrollIntoView');
  }

  var targetRect = target.getBoundingClientRect();
  var frames = [];
  var parent;

  while (isElement(parent = target.parentNode || target.host) && checkBoundary(target)) {
    if (isScrollable(parent, skipOverflowHiddenElements)) {
      frames.push(parent);
    }

    target = parent;
  }

  var viewport = getViewport();
  var viewportWidth = window.visualViewport ? window.visualViewport.width : Math.min(viewport.clientWidth, window.innerWidth);
  var viewportHeight = window.visualViewport ? window.visualViewport.height : Math.min(viewport.clientHeight, window.innerHeight);
  var viewportX = window.scrollX || window.pageXOffset;
  var viewportY = window.scrollY || window.pageYOffset;

  if (scrollMode === 'if-needed') {
    var isVisible = frames.every(function (frame) {
      var frameRect = frame.getBoundingClientRect();

      if (targetRect.top < frameRect.top) {
        return false;
      }

      if (targetRect.bottom > frameRect.bottom) {
        return false;
      }

      if (frame === viewport) {
        if (targetRect.bottom > viewportHeight || targetRect.top < 0) {
          return false;
        }

        if (targetRect.left > viewportWidth || targetRect.right < 0) {
          return false;
        }
      }

      return true;
    });

    if (isVisible) {
      return [];
    }
  }

  var targetBlock = block === 'start' ? targetRect.top : block === 'end' ? targetRect.bottom : block === 'nearest' ? targetRect.top : targetRect.top + targetRect.height / 2;
  var targetInline = inline === 'start' ? targetRect.left : inline === 'center' ? targetRect.left + targetRect.width / 2 : inline === 'end' ? targetRect.right : targetRect.left;
  var computations = frames.map(function (frame) {
    var frameRect = frame.getBoundingClientRect();
    var frameStyle = getComputedStyle(frame);
    var borderLeft = parseInt(frameStyle.borderLeftWidth, 10);
    var borderTop = parseInt(frameStyle.borderTopWidth, 10);
    var borderRight = parseInt(frameStyle.borderRightWidth, 10);
    var borderBottom = parseInt(frameStyle.borderBottomWidth, 10);
    var scrollbarWidth = 'offsetWidth' in frame ? frame.offsetWidth - frame.clientWidth - borderLeft - borderRight : 0;
    var scrollbarHeight = 'offsetHeight' in frame ? frame.offsetHeight - frame.clientHeight - borderTop - borderBottom : 0;
    var blockScroll = 0;
    var inlineScroll = 0;

    if (block === 'start') {
      blockScroll = viewport === frame ? viewportY + targetBlock : targetBlock - frameRect.top - borderTop;
    } else if (block === 'end') {
      blockScroll = viewport === frame ? viewportY + (targetBlock - viewportHeight) : frame.scrollTop - (frameRect.bottom - targetBlock) + borderBottom + scrollbarHeight;
    } else if (block === 'nearest') {
      blockScroll = viewport === frame ? viewportY + alignNearest(viewportY, viewportY + viewportHeight, viewportHeight, borderTop, borderBottom, viewportY + targetBlock, viewportY + targetBlock + targetRect.height, targetRect.height) : frame.scrollTop + alignNearest(frameRect.top, frameRect.bottom, frameRect.height, borderTop, borderBottom + scrollbarHeight, targetBlock, targetBlock + targetRect.height, targetRect.height);
    } else {
      blockScroll = viewport === frame ? viewportY + targetBlock - viewportHeight / 2 : frame.scrollTop - (frameRect.top + frameRect.height / 2 - targetBlock);
    }

    if (inline === 'start') {
      inlineScroll = viewport === frame ? viewportX + targetInline : frame.scrollLeft + (targetInline - frameRect.left) - borderLeft;
    } else if (inline === 'center') {
      inlineScroll = viewport === frame ? viewportX + targetInline - viewportWidth / 2 : frame.scrollLeft - (frameRect.left + frameRect.width / 2 - targetInline);
    } else if (inline === 'end') {
      inlineScroll = viewport === frame ? viewportX + (targetInline - viewportWidth) : frame.scrollLeft - (frameRect.right - targetInline) + borderRight + scrollbarWidth;
    } else {
      inlineScroll = viewport === frame ? viewportX + alignNearest(viewportX, viewportX + viewportWidth, viewportWidth, borderLeft, borderRight, viewportX + targetInline, viewportX + targetInline + targetRect.width, targetRect.width) : frame.scrollLeft + alignNearest(frameRect.left, frameRect.right, frameRect.width, borderLeft, borderRight + scrollbarWidth, targetInline, targetInline + targetRect.width, targetRect.width);
    }

    targetBlock += frame.scrollTop - blockScroll;
    targetInline += frame.scrollLeft - inlineScroll;
    return {
      el: frame,
      top: blockScroll,
      left: inlineScroll
    };
  });
  return computations;
});