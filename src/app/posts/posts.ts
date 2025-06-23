import {ChangeDetectionStrategy, Component, EventEmitter, input, Input, model, Output} from '@angular/core';
import {Post} from '../post.interface';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {

  posts = input<Post[] | null | undefined>([]) ;

  selectedPost =model<Post | undefined>(undefined);

  onSelect(post: Post) {
    this.selectedPost.set(post);
  }

}
