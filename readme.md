# srcadapt

### Easy and lightweight responsive image tool



`srcadapt` is responsive image tool aimed to provide user with method for specifying different image sources according to different screen sizes. It uses well known Bootstrap's viewport nomenclature which, in short, means:

>  if you know how to use Bootstrap's grid, than you already know how to use srcadapt

So, what this exactly means?

First, you include `<script src="path/to/srcadapt.js"></script>` in document's `head` tag. Then you specify your **srcadapt** image.

* What is **srcadapt** image?

That's an image that has `srcadapt` class and one or more `data-[dimension]` attributes that contains path to related image. Like this:

```html
<img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="" class="srcadapt"
data-xs="images/imageofmax767px.jpg"
data-sm="images/imageofmin768.jpg"
data-md="images/imageofmin992.jpg"
data-lg="images/imageofmin1200.jpg" />
```

You have noticed that this image contains transparent 1px x 1px GIF as `src`. That is going to be "adapted". You have also noticed `data-xs`, `data-sm`, `data-md`, `data-lg` attributes which means, for those who haven't used Bootstrap's grid system:

attr     | meaning
-------- | ---
data-xs  | image applies to **max** width of 767px
data-sm  | applies to **min** width of 768px
data-md  | applies to min width of 992px
data-lg  | applies to min width of 1200px

* Do I have to use all 4 attrs?

No. You might just specify "mobile" (`data-xs`) image and `data-sm` for all other sizes.

### What triggers adapting or ASAP problem

You do, by using `srcadapt.all()` which iterates over DOM to find `.srcadapt` images and fix them accordingly, or `srcadapt(HTMLImageElement | HTMLCollection | querySelectorAll string)`.
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

* Do I lose (have cancelled) one HTTP request when appropriate image get in place previous one?

Yes, and this is inevitable scenario. Request get cancelled and new one starts to provide adequate image. However, I haven't found this to be much of an issue in my projects. More authoritative note here is welcome.

* What happens on resize?

just what should happen, all images gets updated. It is planned to let user to be in control in this behavior i.e. `onresize: false` for single image elements.

* What is browser support for this?

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

One word: **TESTS**. Srcadapt badly needs tests. I'm using code from which I built this project for a while, but this needs to be thoroughly tested against devices and frameworks.

