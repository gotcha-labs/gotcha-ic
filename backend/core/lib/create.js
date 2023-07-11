const sharp = require("sharp");
const { createImageBufferFromLink } = require("../../utils/fileDownload");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var _generate = require("./generate");

var sizes = {
  WIDTH: 250,
  HEIGHT: 150,
  PUZZLE: 60,
  PADDING: 20,
};

var createCaptcha = async function createCaptcha(coordinates) {
  var _ref =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    image = await createImageBufferFromLink(coordinates[2]);
    (_ref$distort = _ref.distort),
    (distort = _ref$distort === void 0 ? false : _ref$distort),
    (_ref$rotate = _ref.rotate),
    (rotate = _ref$rotate === void 0 ? false : _ref$rotate),
    (_ref$fill = _ref.fill),
    (fill = _ref$fill === void 0 ? "#000" : _ref$fill),
    (_ref$stroke = _ref.stroke),
    (stroke = _ref$stroke === void 0 ? "#fff" : _ref$stroke),
    (_ref$strokeWidth = _ref.strokeWidth),
    (strokeWidth = _ref$strokeWidth === void 0 ? ".4" : _ref$strokeWidth),
    (_ref$opacity = _ref.opacity),
    (opacity = _ref$opacity === void 0 ? "0.5" : _ref$opacity);
    var seed = (0, _generate.randInt)();
    var overlay = Buffer.from(
    (0, _generate.puzzlePieceSvg)({
      rotate: rotate,
      distort: distort,
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
      opacity: opacity,
      seed: seed,
    })
  );
  var mask = Buffer.from(
    (0, _generate.puzzlePieceSvg)({
      rotate: rotate,
      distort: distort,
      seed: seed,
      strokeWidth: strokeWidth,
      fill: "#fff",
      stroke: "#fff",
      opacity: "1",
    })
  );
  var outline = Buffer.from(
    (0, _generate.puzzlePieceSvg)({
      rotate: rotate,
      distort: distort,
      seed: seed,
      stroke: stroke,
      strokeWidth: strokeWidth,
      fill: "none",
      opacity: "1",
    })
  );
  var location = {
    // Solution for slider
    left: parseInt(coordinates[0]),
    // Vertical offset
    top: parseInt(coordinates[1]),
  };
  async function convertToBuffers(
    image,
    sizes,
    overlay,
    location,
    mask,
    outline
  ) {
    try {
      const background = await sharp(image)
        .resize({
          width: sizes.WIDTH,
          height: sizes.HEIGHT,
        })
        .composite([
          {
            input: overlay,
            blend: "over",
            top: location.top,
            left: location.left,
          },
        ])
        .toBuffer();

      const slider = await sharp(image)
        .resize({
          width: sizes.WIDTH,
          height: sizes.HEIGHT,
        })
        .composite([
          {
            input: mask,
            blend: "dest-in",
            top: location.top,
            left: location.left,
          },
          {
            input: outline,
            blend: "over",
            top: location.top,
            left: location.left,
          },
        ])
        .extract({
          left: location.left,
          top: 0,
          width: sizes.PUZZLE,
          height: sizes.HEIGHT,
        })
        .toBuffer();

      return {
        data: {
          background: background,
          slider: slider,
        },
        solution: location.left,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const rsp = await convertToBuffers(
    image,
    sizes,
    overlay,
    location,
    mask,
    outline
  );
  return rsp;
};
var _default = createCaptcha;
exports["default"] = _default;
