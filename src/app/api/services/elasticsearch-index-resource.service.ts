/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';


/**
 * Elasticsearch Index Resource
 */
@Injectable({
  providedIn: 'root',
})
class ElasticsearchIndexResourceService extends __BaseService {
  static readonly reindexAllUsingPOSTPath = '/api/elasticsearch/index';
  static readonly reindexSelectedUsingPOSTPath = '/api/elasticsearch/selected';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  reindexAllUsingPOSTResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/elasticsearch/index`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }  reindexAllUsingPOST(): __Observable<null> {
    return this.reindexAllUsingPOSTResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param selectedEntities selectedEntities
   */
  reindexSelectedUsingPOSTResponse(selectedEntities: Array<string>): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = selectedEntities;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/elasticsearch/selected`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param selectedEntities selectedEntities
   */
  reindexSelectedUsingPOST(selectedEntities: Array<string>): __Observable<null> {
    return this.reindexSelectedUsingPOSTResponse(selectedEntities).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ElasticsearchIndexResourceService {
}

export { ElasticsearchIndexResourceService }
