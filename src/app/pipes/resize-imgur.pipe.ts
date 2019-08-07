import { Pipe, PipeTransform } from '@angular/core';
  /*
  * s = Small Square (90×90)
  * b = Big Square (160×160)
  * t = Small Thumbnail (160×160)
  * m = Medium Thumbnail (320×320)
  * l = Large Thumbnail (640×640)
  * h = Huge Thumbnail (1024×1024)
  *
  * Resized imgur links
  * Usage:
  *   imgurlink | resizeImgur:size
  * Example:
  *   "http://i.imgur.com/1di0Zpb.jpg" | resizeImgur:'s'
  *    changes into http://i.imgur.com/1di0Zpbs.jpg
  */
@Pipe({
  name: 'resizeImgur'
})
export class ResizeImgurPipe implements PipeTransform {

  transform(value: string, size: string): any {
    if (value.includes('imgur.com')) {
      return value.replace(new RegExp('(.jpg|.png)'), size + '$1');
    }
    return value;
  }

}
