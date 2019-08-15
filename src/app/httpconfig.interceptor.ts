import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MyAPIInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  const authReq = req.clone({
    headers: new HttpHeaders({

      // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU3NDg3NDk5NX0.2yYV4YWNBngPfRfPqmJec8MR5yRRKoa9rKRsypyv6cjUo5KRlD5TYhiM_R_Sfk_deENaHzsS1dAn2l256hkrYA'
    })
  });

  //console.log('Intercepted HTTP call', authReq);

  return next.handle(authReq);
}
}
