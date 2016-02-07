# srcadapt

###Easy and lightweight responsive image tool


`srcadapt` is responsive image tool aimed to provide user with method for specifying different image sources according to different screen sizes. It uses well known Bootstrap's viewport nomenclature which, in short, means:

```
if you know how to use Bootstrap's grid, than you already know how to use srcadapt
```

####Example, mobile first image:

```
<img src="images/imageofmax767px.jpg" alt="" class="srcadapt"
data-xs="images/imageofmax767px.jpg"
data-sm="images/imageofmin768.jpg"
data-md="images/imageofmin992.jpg"
data-lg="images/imageofmin1200.jpg" />
```

More updates soon, under heavy development.
