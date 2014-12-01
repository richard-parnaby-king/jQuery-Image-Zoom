jQuery-Image-Zoom
=================

jQuery plugin that allows image to be zoomed and dragged.

## Installation

Include script *after* the jQuery library (unless you are packaging scripts somehow else):

```html
<script src="/path/to/jquery.imagezoom.js"></script>
```

**Do not include the script directly from GitHub (http://raw.github.com/...).** The file is being served as text/plain and as such being blocked
in Internet Explorer on Windows 7 for instance (because of the wrong MIME type). Bottom line: GitHub is not a CDN.

## Usage

```html
<div>
  <a href="/path/to/hi-res/image.ext">
    <img src="/path/to/fallback/image.ext" alt="Alt text"/>
  </a>
</div>
```

```javascript
$('div').imageZoom();
```

### Options

This plugin comes with three options; scaleAmount, zoomInText and zoomOutText

#### scaleAmount

Controls how much to scale the image by when zooming in / out. Default is 1.2 (20%)

```javascript
$('div').imageZoom({scaleAmount:1.2});
```

#### zoomInText

Change the text on the zoom-in button. Default is '+'

```javascript
$('div').imageZoom({zoomInText:'+'});
```

#### zoomOutText

Change the text on the zoom-out button. Default is '-'

```javascript
$('div').imageZoom({zoomOutText:'-'});
```
