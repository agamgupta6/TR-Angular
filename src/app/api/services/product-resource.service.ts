/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Product } from '../models/product';


/*
    Link header read
  */
 export interface LinkParams {

  /**
   * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   */
  next?: PaginationParams;

  /**
   * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   */
  prev?: PaginationParams;


  /**
   * Size of a page
   */
  last?: PaginationParams;

  /**
   * Page number of the requested page
   */
  first?: PaginationParams;
}

export interface PaginationParams {
  page:string;
    size:string;
}


/**
 * Product Resource
 */
@Injectable({
  providedIn: 'root',
})
class ProductResourceService extends __BaseService {
  static readonly searchProductsUsingGETPath = '/api/_search/products';
  static readonly getAllProductsUsingGETPath = '/api/products';
  static readonly createProductUsingPOSTPath = '/api/products';
  static readonly updateProductUsingPUTPath = '/api/products';
  static readonly getProductUsingGETPath = '/api/products/{id}';
  static readonly deleteProductUsingDELETEPath = '/api/products/{id}';
  links: LinkParams;
  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `ProductResourceService.SearchProductsUsingGETParams` containing the following parameters:
   *
   * - `query`: query
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  searchProductsUsingGETResponse(params: ProductResourceService.SearchProductsUsingGETParams): __Observable<__StrictHttpResponse<Array<Product>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.query != null) __params = __params.set('query', params.query.toString());
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/_search/products`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Product>>;
      })
    );
  }
  /**
   * @param params The `ProductResourceService.SearchProductsUsingGETParams` containing the following parameters:
   *
   * - `query`: query
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  searchProductsUsingGET(params: ProductResourceService.SearchProductsUsingGETParams): __Observable<Array<Product>> {
    return this.searchProductsUsingGETResponse(params).pipe(
      __map(_r => {
        this.parse_link_header(_r.headers.get('Link'));
        return _r.body as Array<Product>;
      })
    );
  }

  /**
   * @param params The `ProductResourceService.GetAllProductsUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  getAllProductsUsingGETResponse(params: ProductResourceService.GetAllProductsUsingGETParams): __Observable<__StrictHttpResponse<Array<Product>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/products`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Product>>;
      })
    );
  }
  /**
   * @param params The `ProductResourceService.GetAllProductsUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  getAllProductsUsingGET(params: ProductResourceService.GetAllProductsUsingGETParams): __Observable<Array<Product>> {
    return this.getAllProductsUsingGETResponse(params).pipe(
      __map(_r => {
        this.parse_link_header(_r.headers.get('Link'));
        
        return _r.body as Array<Product>;
      })
    );
  }

  /**
   * @param product product
   * @return OK
   */
  createProductUsingPOSTResponse(product: Product): __Observable<__StrictHttpResponse<Product>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = product;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/products`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Product>;
      })
    );
  }
  /**
   * @param product product
   * @return OK
   */
  createProductUsingPOST(product: Product): __Observable<Product> {
    return this.createProductUsingPOSTResponse(product).pipe(
      __map(_r => _r.body as Product)
    );
  }

  /**
   * @param product product
   * @return OK
   */
  updateProductUsingPUTResponse(product: Product): __Observable<__StrictHttpResponse<Product>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = product;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/products`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Product>;
      })
    );
  }
  /**
   * @param product product
   * @return OK
   */
  updateProductUsingPUT(product: Product): __Observable<Product> {
    return this.updateProductUsingPUTResponse(product).pipe(
      __map(_r => _r.body as Product)
    );
  }

  /**
   * @param id id
   * @return OK
   */
  getProductUsingGETResponse(id: number): __Observable<__StrictHttpResponse<Product>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/products/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => {
        
        return  _r instanceof HttpResponse;
      }),
      __map((_r) => {
       
        return _r as __StrictHttpResponse<Product>;
      })
    );
  }
  /**
   * @param id id
   * @return OK
   */
  getProductUsingGET(id: number): __Observable<Product> {
    return this.getProductUsingGETResponse(id).pipe(
      __map(_r => {
        this.parse_link_header(_r.headers.get('Link'));
        return _r.body as Product;
      })
    );
  }

  /**
   * @param id id
   */
  deleteProductUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/products/${id}`,
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
   * @param id id
   */
  deleteProductUsingDELETE(id: number): __Observable<null> {
    return this.deleteProductUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  parse_link_header(header) {
    this.links= null;
    if (!header || header.length == 0) {
      return
    }

    let parts = header.split(',');
    var links = {};
    parts.forEach( p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var search  = url.substring(url.indexOf('?')+1);
      search = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = search;

    });
    this.links =  links;
  }  

}

module ProductResourceService {

  /**
   * Parameters for searchProductsUsingGET
   */
  export interface SearchProductsUsingGETParams {

    /**
     * query
     */
    query: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for getAllProductsUsingGET
   */
  export interface GetAllProductsUsingGETParams {

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  
}

export { ProductResourceService }
