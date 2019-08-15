
import { HasAnyAuthorityDirective } from 'src/app/shared/auth/has-any-authority.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';

import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { EditInputComponent } from 'src/app/shared/modules/edit-input/edit-input.component';
import { FormsModule } from '@angular/forms';
import { ApiModule } from 'src/app/api/api.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatGridListModule,
        StatModule,
        MatCardModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        Ng2Charts,
        FlexLayoutModule.withConfig({addFlexToParent: false}),
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ApiModule


    ],

    declarations: [DashboardComponent, HasAnyAuthorityDirective, EditInputComponent]
})
export class DashboardModule {}
