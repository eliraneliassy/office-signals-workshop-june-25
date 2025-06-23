import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Users} from './users/users';
import {PostsComponent} from './posts/posts';
import {Comments} from './comments/comments';
import {PostsService} from './posts';
import {AsyncPipe} from '@angular/common';
import {User} from './user.interface';
import {Post} from './post.interface';
import {Observable, of} from 'rxjs';
import {PostComment} from './post-comment.interface';

@Component({
  selector: 'app-root',
  imports: [Users, PostsComponent, Comments, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  postsService = inject(PostsService);

  users$ = this.postsService.getUser();
  posts$?: Observable<Post[]>;
  comments$?: Observable<PostComment[]>;

  selectedUser: User | undefined = undefined
  selectedPost: Post | undefined = undefined

  onSelectedUser(user: User){
    this.selectedUser = user;

    this.posts$ = this.postsService.getPosts(user.id);
    this.comments$ = of([]);
  }

  onSelectedPost(post: Post){
    this.selectedPost = post;

    this.comments$ = this.postsService.getComments(post.id);

  }
}
