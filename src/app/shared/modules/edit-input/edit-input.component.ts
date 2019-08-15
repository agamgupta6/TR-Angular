import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SERVER_API_URL } from 'src/app/app.constants';

@Component({
  selector: 'app-edit-input',
  templateUrl: './edit-input.component.html',
  styleUrls: ['./edit-input.component.scss']
})
export class EditInputComponent implements OnInit {
  @Input() data: any;
  @Input() inputclass: string;
  @Input() contentkey: string;
  @Output() focusOut: EventEmitter<number> = new EventEmitter<number>();
  currency = '$';
  editMode = false;
  content: any;

  constructor(private http: HttpClient) {

   }

  ngOnInit() {
    this.http.get<any>(SERVER_API_URL + 'api/content', { observe: 'response' })
    .toPromise()
    .then(response => {
      console.log(response.body + ' ---' + this.contentkey);

      this.content = response.body[this.contentkey];
    });

  }

  onFocusOut() {
    this.focusOut.emit(this.data);
  }

  saveContent() {
    const body = {};
    body['value'] = this.content;
    body['key'] = this.contentkey;
    this.http.post<any>(SERVER_API_URL + 'api/contentupdate', body, { observe: 'response' })
    .toPromise()
    .then(response => {
      console.log(response.body);


    });
  }


}
