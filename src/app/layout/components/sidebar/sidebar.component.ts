import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public showMenu: string;
  constructor(private router: Router) {}
  menus = [
    {
      routerlink: 'dashboard',
      routerText: 'Inicio'
    } , {
            menutitle: 'Products',
            submenus: [
                {
                    routerlink: 'charts',
                    routerText: 'Charts'
                  },
                  {
                    routerlink: 'tables',
                    routerText: 'Tables'
                  },
                  {
                    routerlink: 'forms',
                    routerText: 'Forms'
                  },
                  {
                    routerlink: 'grid',
                    routerText: 'Grid'
                  }
              ]
          }
  ];
  ngOnInit() {}

  ifActiveRoute(subRoutes: any[]) {
    const subLinks = subRoutes.map(m => '/' + m.routerlink);
    const activeRoute = this.router.url;
    return subLinks.indexOf(activeRoute) >= 0;
  }
}
