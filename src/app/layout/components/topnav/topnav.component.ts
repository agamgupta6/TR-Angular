
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { Account } from 'src/app/shared/model/account.model';

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
    public pushRightClass: string;
    account: Account;
    constructor(public router: Router, private translate: TranslateService, private accountService: AccountService) {
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.accountService.identity().then((account: Account) => {
            this.account = account;
          });
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        // this.router.navigate(['/login']);
        window.location.href = '/logoutsso';
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
      }
}
