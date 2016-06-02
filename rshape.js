(function (factory) {

  self.rShape = factory(_, {});

}(function (_, rShape) {

  //code adapted from https://github.com/peeinears/MagicEye.js
  var doodle = function (el) {
    this.canvas = document.getElementById(el);
    this.context = this.canvas.getContext("2d");
  };

  doodle.prototype.redraw = function (options) {

    options = options || {};
    options.minShape = options.minShape || 3;
    options.maxShape = options.maxShape || 6;

    function randomRGB() {
      return [_.random(255), _.random(255), _.random(255)];
    }

    function shaders(color, maxShape) {
      return _.map(color, function (x) {
        return Math.round((256 - x) / maxShape);
      });
    }

    function toRGB(color, transform, coeff) {
      function apply(i) {
        return color[i] + (coeff * transform[i]);
      }
      return 'rgb(' + apply(0) + ',' + apply(1) + ',' + apply(2) + ')';
    }

    var i,
      width = this.canvas.width,
      height = this.canvas.height,
      shapes = _.random(options.minShape, options.maxShape);

    this.clear();

    var color = randomRGB();
    var shades = shaders(color, shapes);

    for (i = 0; i < shapes; i++) {
      this.context.fillStyle = toRGB(color, shades, i);
      this.context.beginPath();
      this.context.moveTo(Math.floor(Math.random() * width), Math.floor(Math.random() * height));
      this.context.lineTo(Math.floor(Math.random() * width), Math.floor(Math.random() * height));
      this.context.lineTo(Math.floor(Math.random() * width), Math.floor(Math.random() * height));
      this.context.fill();
    }

  };

  doodle.prototype.clear = function () {
    this.context.fillStyle = 'rgba(255,255,255, 0)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  doodle.prototype.resize = function () {
    this.canvas.width = window.innerWidth > 1000 ? 1000 : window.innerWidth;
    this.redraw();
  };

  rShape.pick = function (el) {
    return new doodle(el);
  };

  return rShape;
}));
