import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {PostComment} from '../post-comment.interface';

@Component({
  selector: 'app-comments',
  imports: [],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Comments {

  @Input() comments!: PostComment[] | null;

}
