import { Injectable } from '@angular/core';

//side navbar component

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
    ],
  },
  {
    id: 'applicants',
    title: 'Applicants',
    type: 'group',
    icon: 'icon-pages',
    children: [
      {
        id: 'applicant',
        title: 'Applicant',
        type: 'collapse',
        icon: 'feather icon-user',
        children: [
          {
            id: 'applicant',
            title: 'Applicants',
            type: 'item',
            url: '/applicant/view',
            classes: 'nav-item',
          },
          // {
          //   id: 'add_applicant',
          //   title: 'Add Applicant',
          //   type: 'item',
          //   url: '/applicant/add',
          //   classes: 'nav-item',
          // },
        ],
      },
    ]
  },
  {
    id: 'user',
    title: 'Users',
    type: 'group',
    icon: 'icon-users',
    children: [
      {
        id: 'user',
        title: 'Users',
        type: 'collapse',
        icon: 'feather icon-user',
        children: [
          {
            id: 'user',
            title: 'Users',
            type: 'item',
            url: '/user/view',
            classes: 'nav-item',
          },
        ],
      },
    ]
  }, 
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
