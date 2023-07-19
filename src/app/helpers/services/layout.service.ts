import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  constructor() {}

  sidebar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  toggle = (value: boolean) => this.sidebar.next(value);
}
