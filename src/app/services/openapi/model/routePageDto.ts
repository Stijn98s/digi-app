/**
 * Digicatch
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Route } from './route';


export interface RoutePageDto { 
    filter: any;
    pageSize: number;
    page: number;
    pageCount: number;
    data: Array<Route>;
}

