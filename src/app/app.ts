import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
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
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [Users, PostsComponent, Comments, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  postsService = inject(PostsService);

  users = toSignal(this.postsService.getUser());

  posts: WritableSignal<Post[]> = signal([]);
  comments: WritableSignal<PostComment[]> = signal([]);

  selectedUser: WritableSignal<User | undefined> = signal(undefined);
  selectedPost: WritableSignal<Post | undefined> = signal(undefined);

  userId: Signal<number | undefined> = computed(() => this.selectedUser() ? this.selectedUser()?.id : undefined);


  constructor() {

    effect(() => {
      const selectedUser = this.selectedUser();

      if(selectedUser) {
        this.postsService.getPosts(selectedUser.id).subscribe(
          posts => {
            this.posts.set(posts);
          }
        )
      }
    });

    effect(() => {
      const selectedPost = this.selectedPost();

      if(selectedPost) {
        this.postsService.getComments(selectedPost.id).subscribe(
          comments => {
            this.comments.set(comments);
          }
        )
      }
    })
  }
}
