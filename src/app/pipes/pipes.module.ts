import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizeImgurPipe } from './resize-imgur.pipe';
import { TruncateTextPipe} from './truncate-text.pipe';

@NgModule({
  declarations: [ResizeImgurPipe, TruncateTextPipe],
  imports: [
    CommonModule
  ],
  exports: [
    ResizeImgurPipe,
    TruncateTextPipe,
  ]
})
export class PipesModule { }
