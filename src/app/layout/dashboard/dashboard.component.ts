import { Account } from './../../shared/model/account.model';
import { AccountService } from './../../shared/services/account.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ProductResourceService } from 'src/app/api/services';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Validacion Trama Cliente', weight: 'Procesado' },
    { position: 2, name: 'Validacion Trama Operaciones', weight: 'En Proceso'  },
    { position: 3, name: 'Validacion Operaciones', weight: 'Pendiente' },
    { position: 4, name: 'Creacion Cliente', weight: 'Pendiente' },
    { position: 5, name: 'Creacion Operaciones', weight: 'Pendiente' },

];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private accountService: AccountService,
        private  productService: ProductResourceService,
        private http: HttpClient
        ) {
        this.places = [
            {
                imgSrc: 'assets/images/card-1.jpg',
                place: 'Cozy 5 Stars Apartment',
                description:
                    // tslint:disable-next-line:max-line-length
                    'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
                charge: '$899/night',
                location: 'Barcelona, Spain'
            },
            {
                imgSrc: 'assets/images/card-2.jpg',
                place: 'Office Studio',
                description:
                    // tslint:disable-next-line:max-line-length
                    'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.',
                charge: '$1,119/night',
                location: 'London, UK'
            },
            {
                imgSrc: 'assets/images/card-3.jpg',
                place: 'Beautiful Castle',
                description:
                    // tslint:disable-next-line:max-line-length
                    'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.',
                charge: '$459/night',
                location: 'Milan, Italy'
            }
        ];
    }

// editable

  cost = 'Hello angular inline input';

    displayedColumns = ['position', 'name', 'weight'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    places: Array<any> = [];
    account: Account;
    isEditable: false;
    // doughnut chart
    public doughnutChartLabels: string[] = ['Rechazados', 'Correctos'];
    public doughnutChartData: number[] = [20, 80];
    public doughnutChartType: string;
    public colors = [{backgroundColor: [
        '#ec5454', '#4D4D4D'
     ]}];
    public doughnutChartLabelsOp: string[] = ['Rechazados', 'Correctos'];
    public doughnutChartDataOp: number[] = [40, 50];


    public doughnutChartLabelsMonto: string[] = ['Valor Compra', 'Valor no se  Compra'];
    public doughnutChartDataMonto: number[] = [40, 50];


    public doughnutChartOptions = {
        legend:
        {
            position: 'right',
            fullWidth: false,
            labels:
            {
                boxWidth: 5,
                fontFamily: 'Prelo Book',
                fontColor: '#4D4D4D',

            }
        }
    };
  saveCost(value) {
    this.cost = value;
  }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    ngOnInit() {
        this.doughnutChartType = 'doughnut';
        this.accountService.identity().then((account: Account) => {
            this.account = account;
          });
           this.productService.getAllProductsUsingGET({}).subscribe(response => {

              console.log(JSON.stringify(response));
          });

    }



    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
      }
}
