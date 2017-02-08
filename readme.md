# srcadapt

[![GitHub version](https://badge.fury.io/gh/milosdjakonovic%2Fsrcadapt.svg)](https://badge.fury.io/gh/milosdjakonovic%2Fsrcadapt)
[![GitHub issues](https://img.shields.io/github/issues/milosdjakonovic/srcadapt.svg)](https://github.com/milosdjakonovic/srcadapt/issues)



### Easy and lightweight responsive image tool



`srcadapt` is responsive image tool aimed to provide user with method for specifying different image sources according to different screen sizes. It uses well known Bootstrap's viewport nomenclature which, in short, means:

>  if you know how to use Bootstrap's grid, than you already know how to use srcadapt

### TLDR; USAGE
Include `<script src="path/to/srcadapt.js"></script>` somewhere before first usage. Add `srcadapt` class and two or more `data-[dimension]` attributes to `<img />` element which `src` attribute is aimed to be "adapted". Call `srcadapt.all()` to adapt all designated images or `srcadapt(HTMLImageElement | HTMLCollection | querySelectorAll string)` specify exactly which one(s).

### EXAMPLE

```html
<img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="" class="srcadapt"
data-xs="images/imageofmax767px.jpg"
data-sm="images/imageofmin768.jpg"
data-md="images/imageofmin992.jpg"
data-lg="images/imageofmin1200.jpg" />
```

You have noticed that this image contains transparent 1x1px GIF as `src`. That is going to be "adapted". You have also noticed `data-xs`, `data-sm`, `data-md`, `data-lg` attributes which means, for those who haven't used Bootstrap's grid system:

attr     | meaning
-------- | ---
data-xs  | image applies to **max** width of 767px
data-sm  | applies to **min** width of 768px
data-md  | applies to min width of 992px
data-lg  | applies to min width of 1200px

##### -Do I have to use all 4 attrs?
No. You might just specify one "mobile" (`data-xs`) image and one `data-sm` for all other sizes.

### ASAP adapting

In order for appropriate image to appear as soon as possible, you should call functions as soon as `<img>` markup appears.  

Fastest (and ugliest) way is to insert `script` tag right after `img`, like this:

```html
<img id="myImg" src="images/some-default-image.jpg" alt="" class="srcadapt"
data-xs="images/imageofmax767px.jpg"
data-sm="images/imageofmin768.jpg"
data-md="images/imageofmin992.jpg"
data-lg="images/imageofmin1200.jpg" />
<script>srcadapt( document.getElementById('myImg') )</script>
```

##### -What happens on resize?
just what should happen, all images gets updated. 

#### Browser support

in short, works in IE8. Tested on: 
- Chrome current, 
- Firefox current, 
- Safari 5.1, 
- IE 8,9,10,11
- Android 4.3

### API
method        | desc
-------- | ---
srcadapt  | global scope variable, main method and space for others
srcadapt.all()  | iterates DOM, updates ('adapts') or leaves images alone
srcadapt.onAdapt(callback)  | adds callback to be executed whenever any image gets 'adapted'
srcadapt.offAdapt(callback)  | removes callback from being executed whenever any image gets 'adapted'


## Contribution

One word: **TESTS**.
