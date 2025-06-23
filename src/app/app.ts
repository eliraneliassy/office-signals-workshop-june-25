import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject, linkedSignal, resource, ResourceRef,
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
import {rxResource, toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [Users, PostsComponent, Comments],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  postsService = inject(PostsService);

  users = this.postsService.getUser();
    // ResourceRef<User[] | undefined> = // toSignal(this.postsService.getUser());
    // rxResource({
    //   stream: () => this.postsService.getUser()
    // })

  posts = rxResource({
    params: () => this.selectedUser(),
    stream: ({params: selectedUser}) => {
      return selectedUser ? this.postsService.getPosts(selectedUser.id) : of([])
    }
  })
  comments = rxResource({
    params: () => this.selectedPost(),
    stream: ({params: selectedPost}) => {
      return selectedPost ?
        this.postsService.getComments(selectedPost.id)
        : of([])
    }
  })

  selectedUser: WritableSignal<User | undefined> = signal(undefined);
  selectedPost: WritableSignal<Post | undefined> = linkedSignal({
    source: () => this.selectedUser(),
    computation: () => undefined
  })

  userId: Signal<number | undefined> = computed(() => this.selectedUser() ? this.selectedUser()?.id : undefined);



}
