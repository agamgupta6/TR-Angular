/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = '//rsgconsole.net:8089/productmanagement';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
