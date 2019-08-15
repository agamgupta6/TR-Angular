/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = '//10.0.176.53:8081/productmanagement';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
