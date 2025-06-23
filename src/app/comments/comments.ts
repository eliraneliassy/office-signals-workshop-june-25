import {ChangeDetectionStrategy, Component, input, Input} from '@angular/core';
import {PostComment} from '../post-comment.interface';

@Component({
  selector: 'app-comments',
  imports: [],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Comments {

  comments = input<PostComment[] | null | undefined | any>([]);

}
