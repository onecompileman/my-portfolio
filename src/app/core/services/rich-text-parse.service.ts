import { Injectable } from '@angular/core';
import * as cheerio from 'cheerio';
import { getFileTypeFromBase64 } from '../utils/file-type-base64.util';
import { getFileExtensionFromBase64 } from '../utils/file-extension-base64.util';
import { base64ToBlob } from '../utils/base-64-to-blob.util';

@Injectable({
  providedIn: 'root',
})
export class RichTextParseService {
  getImagesFileFromHTML(html: string): File[] {
    const $ = cheerio.load(html);

    const images = $('img');

    const files: File[] = [];

    for (let i = 0; i < images.length; i++) {
      const src = $(images[i]).attr('src');
      if (src && src.startsWith('data:')) {
        const fileType = getFileTypeFromBase64(src);
        const fileExtension = getFileExtensionFromBase64(src);

        const blob = base64ToBlob(src, fileType);
        files.push(
          new File([blob], `image${i + 1}.${fileExtension}`, { type: fileType })
        );
      }
    }

    return files;
  }

  replaceBase64ImagesWithFileUrl(html: string, fileUrls: string[]): string {
    const $ = cheerio.load(html);

    const images = $('img');

    for (let i = 0; i < images.length; i++) {
      const src = $(images[i]).attr('src');
      if (src && src.startsWith('data:')) {
        $(images[i]).attr('src', fileUrls.shift());
      }
    }

    return $.html();
  }

  removeAllImagesHtml(html: string): string {
    const $ = cheerio.load(html);

    $('img').remove();

    return $.text();
  }
}
