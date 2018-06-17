const gm = require('gm')
const fs = require('fs')
const path = require('path')
const ImageJS = require("imagejs")

console.log(process.cwd())
const publicPath = path.join(process.cwd(), '/images')
const path1 = path.join(publicPath, '/big_buck_bunny_07501.png')
const path2 = path.join(publicPath, '/big_buck_bunny_07502.png')
const path3 = path.join(publicPath, '/result3.png')
const path4 = path.join(publicPath, '/result4.png')

var options = {
  tolerance: 0.003,
  // highlightColor: 'red', // optional. Defaults to red
  file: path3, // required
};
// gm.compare(path1, path2, options, function (err, isEqual, equality, raw) {
//   console.log('compare:', err, isEqual, equality, raw)
// });

// gm(path1)
// .edge(1)
// .negative()
// .emboss(1)
// .usePixmap()
// .write(path3, err => console.log('test', err))

// gm(path1).color((err, v) => console.log('color', v)).view()

const colorEqual = (c1, c2) => {
  isEqual = (v1, v2) => v1 - v2 < 10
  return isEqual(c1.r, c2.r)
  && isEqual(c1.g, c2.g)
  && isEqual(c1.b, c2.b)
  && isEqual(c1.a, c2.a)
}

const PixelIterator = (bitmap1, bitmap2, bitmap3, func, {width, height}) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const c1 = bitmap1.getPixel(x, y)
      const c2 = bitmap2.getPixel(x, y)
      const color = func(c1, c2)
      color && bitmap3.setPixel(x, y, color)
      // console.log('color', color)
    }
  }
  bitmap3.writeFile(path4)
}

const bitmap1 = new ImageJS.Bitmap()
const bitmap2 = new ImageJS.Bitmap()

const bitmapProcess = () => {
  console.log('bitmapProcess', bitmap1)
  const width = bitmap1.width
  const height = bitmap1.height
  const func = (c1, c2) => {
    if (colorEqual(c1, c2)) {
      return c1
    } else {
      return false
    }
  }
  const bitmap3 = new ImageJS.Bitmap({width, height, color: {r: 255, g: 0, b: 0, a: 255}})
  PixelIterator(bitmap1, bitmap2, bitmap3, func, {width, height})
  // bitmap.writeFile(path4)
}

const main = async () => {
  await bitmap1.readFile(path1)
  await bitmap2.readFile(path2)
  bitmapProcess()
}

main()


// const f2 = fs.readFileSync(path2)
// console.log(f2)


