import { Component } from '@angular/core';

interface IMenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [
  ]
})
export class SideMenuComponent {
  public reactiveMenu: IMenuItem[] = [
    { title: 'Basics', route: './reactive/basic' },
    { title: 'Dynamic', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
  ];

  public authMenu: IMenuItem[] = [
    { title: 'Register', route: './auth' }
  ];
}
