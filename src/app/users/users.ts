import {ChangeDetectionStrategy, Component, EventEmitter, input, Input, model, Output} from '@angular/core';
import {User} from '../user.interface';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Users {

  users = input<User[] | null | undefined>();

  selectedUser = model<User | undefined>(undefined);

  selectUser(user: User) {
    this.selectedUser.set(user);
  }

}
