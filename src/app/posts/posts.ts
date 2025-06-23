import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Post} from '../post.interface';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {

  @Input() posts!: Post[] | null ;

  @Output() selectedPost = new EventEmitter<Post>();

  onSelect(post: Post) {
    this.selectedPost.emit(post);
  }

}
