var IMAGE_WIDTH = 100;
var IMAGE_MARGIN_LEFT = 10;

var parsePx = function(px) {
  if (typeof px == "number") { // no need to parse.
    return px;
  }
  return parseInt(px.replace("px", ""));
}

var GalleryList = function(container) {
  if (container) {
    this.container_el = container;

    this.list_el = container.getElementsByClassName("list_item_gallery_list")[0];
    this.list_el.style.marginLeft = 0;

    this.images = this.list_el.getElementsByTagName("img"); // image list

    this.width = ((this.images.length * IMAGE_WIDTH) + (this.images.length - 1) * IMAGE_MARGIN_LEFT) + "px";
    this.list_el.style.width = this.width;

    this.container_el.onmouseover = this.mouseMove.bind(this);
    this.container_el.onmouseout = this.mouseOut.bind(this);
  }
};

GalleryList.prototype.mouseMove = function(e) {
  var left = e.x - this.container_el.offsetLeft;
  this.moving = false;

  if (left < 100) {
    if (!this.moving) {
      this.anim = setInterval(this.moveListLeft.bind(this), 20);
      this.moving = true;
    }
  } else if (left > 500) {
    if (!this.moving) {
      this.anim = setInterval(this.moveListRight.bind(this), 20);
      this.moving = true;
    }
  } else {
    clearInterval(this.anim);
    this.moving = false;
  }
};

GalleryList.prototype.mouseOut = function(e) {
  clearInterval(this.anim);
  this.moving = false;
}

GalleryList.prototype.moveListLeft = function() {
  var margin_left = parsePx(this.list_el.style.marginLeft);

  if (margin_left < 0) {
    this.list_el.style.marginLeft = (margin_left + 2) + "px";
  }
};

GalleryList.prototype.moveListRight = function() {
  var list_width = this.list_el.offsetWidth;
  var container_width = this.container_el.offsetWidth;

  var margin_left = parsePx(this.list_el.style.marginLeft);

  if (- margin_left < list_width - container_width) {
    this.list_el.style.marginLeft = (margin_left - 2) + "px";
  }
};

document.ready = function() {
  var gallery_lists = document.getElementsByClassName("list_item_gallery_container");

  for (var i = 0; i < gallery_lists.length; i++) {
    var list = new GalleryList(gallery_lists[i]);
  }
};
