import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {
    selectedFile: any;
    selectedFileName: string;
    constructor(private http: HttpClient) {}
    uploadPercentage: any;
    ngOnInit() {}

    onFileSelected(event) {
        console.log(event);
        this.selectedFile = event.target.files[0];
        this.selectedFileName = this.selectedFile.name;
    }

    onFileUpload(event) {
        console.log(event);
        const formData: FormData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);
        // formData.append('file', 'dfsdfsdf');
        formData.append('something', 'dsfsdfsdfsdf');
        const header  = new HttpHeaders();
        header.append( 'Content-Type', 'multipart/form-data');
        const req = new HttpRequest('POST', 'http://localhost:8080/fileupload', formData, {
            reportProgress: true,
            headers: header
          });


          this.http.request(req).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {

              // calculate the progress percentage
              const percentDone = Math.round(100 * event.loaded / event.total);
                console.log('upload percentage==> ' + percentDone);
                this.uploadPercentage = percentDone;
            } else if (event instanceof HttpResponse) {

              // Close the progress-stream if we get an answer form the API
              // The upload is complete
              console.log('upload done ==|');
            }
          });

    }

}
