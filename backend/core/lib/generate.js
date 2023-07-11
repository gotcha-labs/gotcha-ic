

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randInt = exports.backgroundSvg = exports.puzzlePieceSvg = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var randInt = function randInt() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2147483646;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

exports.randInt = randInt;

var randShade = function randShade(hue) {
  return {
    h: hue,
    s: randInt(50, 70),
    l: randInt(50, 60)
  };
};

var hslString = function hslString(color) {
  return "hsl(".concat(color.h, ", ").concat(color.s, "%, ").concat(color.l, "%)");
};

var randScheme = function randScheme(base) {
  return [randShade(base), randShade((base + 60) % 360), randShade((base - 30) % 360), randShade((base + 30) % 360), randShade((base - 60) % 360)].map(function (color) {
    return hslString(color);
  });
};

var svgRect = function svgRect(x, y, gridWidth, gridHeight, color) {
  return "<rect filter=\"url(#noise)\" x=\"".concat(x, "\" y=\"").concat(y, "\" width=\"").concat(gridWidth, "\" height=\"").concat(gridHeight, "\" fill=\"").concat(color, "\"/>");
};

var svgGridPattern = function svgGridPattern(width, height, gridWidth, gridHeight, scheme) {
  return _toConsumableArray(Array(Math.floor(height / gridHeight)).keys()).map(function (y) {
    return _toConsumableArray(Array(Math.floor(width / gridWidth)).keys()).map(function (x) {
      return svgRect(x * gridWidth, y * gridHeight, gridWidth, gridHeight, scheme[x % 2]);
    });
  }).join('\n');
};

var backgroundSvg = function backgroundSvg(width, height) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$gridWidth = _ref.gridWidth,
      gridWidth = _ref$gridWidth === void 0 ? randInt(5, 50) : _ref$gridWidth,
      _ref$gridHeight = _ref.gridHeight,
      gridHeight = _ref$gridHeight === void 0 ? randInt(5, 50) : _ref$gridHeight,
      _ref$scheme = _ref.scheme,
      scheme = _ref$scheme === void 0 ? randScheme(randInt(0, 360)) : _ref$scheme,
      _ref$seeds = _ref.seeds,
      seeds = _ref$seeds === void 0 ? [randInt(), randInt()] : _ref$seeds;

  return "\n<svg width=\"".concat(width, "\" height=\"").concat(height, "\" viewBox=\"0 0 ").concat(width, " ").concat(height, "\">\n  <filter id=\"noise\">\n    <feTurbulence type=\"turbulence\" baseFrequency=\"0.005\"\n      seed=\"").concat(seeds[0], "\"\n        numOctaves=\"2\" result=\"turbulence\"/>\n    <feDisplacementMap in2=\"turbulence\" in=\"SourceGraphic\"\n        scale=\"30\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"heavy\">\n    <feTurbulence type=\"turbulence\" baseFrequency=\"0.005\"\n      seed=\"").concat(seeds[1], "\"\n        numOctaves=\"2\" result=\"turbulence\"/>\n    <feDisplacementMap in2=\"turbulence\" in=\"SourceGraphic\"\n        scale=\"100\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <rect width=\"").concat(width, "\" height=\"").concat(height, "\" fill=\"").concat(scheme[4], "\"/>\n  <rect filter=\"url(#heavy)\"  width=\"").concat(width / 2, "\" height=\"").concat(height, "\" x=\"").concat(width / 5, "\" fill=\"").concat(scheme[2], "\"/>\n  <rect filter=\"url(#heavy)\" width=\"").concat(width / 2, "\" height=\"").concat(height, "\" x=\"").concat(width / 2, "\" fill=\"").concat(scheme[3], "\"/>\n  ").concat(svgGridPattern(width, height, gridWidth, gridHeight, scheme), "\n</svg>\n");
};

exports.backgroundSvg = backgroundSvg;

var puzzlePieceSvg = function puzzlePieceSvg() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$distort = _ref2.distort,
      distort = _ref2$distort === void 0 ? false : _ref2$distort,
      _ref2$rotate = _ref2.rotate,
      rotate = _ref2$rotate === void 0 ? false : _ref2$rotate,
      _ref2$fill = _ref2.fill,
      fill = _ref2$fill === void 0 ? '#000' : _ref2$fill,
      _ref2$stroke = _ref2.stroke,
      stroke = _ref2$stroke === void 0 ? '#fff' : _ref2$stroke,
      _ref2$seed = _ref2.seed,
      seed = _ref2$seed === void 0 ? 0 : _ref2$seed,
      _ref2$opacity = _ref2.opacity,
      opacity = _ref2$opacity === void 0 ? '0.5' : _ref2$opacity,
      _ref2$strokeWidth = _ref2.strokeWidth,
      strokeWidth = _ref2$strokeWidth === void 0 ? '0.25' : _ref2$strokeWidth;

  return "\n  <svg viewBox=\"0 0 20 20\" height=\"60\" width=\"60\">\n    <filter id=\"noise\">\n      <feTurbulence type=\"turbulence\" baseFrequency=\"0.05\"\n        seed=\"".concat(seed, "\"\n          numOctaves=\"2\" result=\"turbulence\"/>\n      <feDisplacementMap in2=\"turbulence\" in=\"SourceGraphic\"\n          scale=\"2.5\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n    </filter>\n    <path ").concat(distort ? 'filter="url(#noise)"' : '', " ").concat(rotate ? "transform=\"rotate(".concat(seed, ", 10, 10)\"") : '', " d=\"M5.56.56a2.305 2.305 0 00-2.296 2.304 2.305 2.305 0 00.801 1.747H.135v4.295a2.305 2.305 0 011.8-.865 2.305 2.305 0 012.304 2.306 2.305 2.305 0 01-2.305 2.304 2.305 2.305 0 01-1.8-.865v4.226H11.26v-4.258a2.305 2.305 0 001.781.842 2.305 2.305 0 002.305-2.305 2.305 2.305 0 00-2.305-2.305 2.305 2.305 0 00-1.78.841V4.611H7.072a2.305 2.305 0 00.801-1.747A2.305 2.305 0 005.57.559a2.305 2.305 0 00-.009 0z\" opacity=\"").concat(opacity, "\" stroke=\"").concat(stroke, "\" fill=\"").concat(fill, "\" stroke-width=\"").concat(strokeWidth, "\" stroke-linejoin=\"round\"/>\n  </svg>\n");
};

exports.puzzlePieceSvg = puzzlePieceSvg;