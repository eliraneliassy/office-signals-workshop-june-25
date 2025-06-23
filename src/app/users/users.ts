import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../user.interface';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Users {

  @Input() users!: User[] | null;

  @Output() selectedUser = new EventEmitter<User>();

  selectUser(user: User) {
    this.selectedUser.emit(user);
  }

}
