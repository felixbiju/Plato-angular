import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgxPermissionsStore } from '../store/permissions.store';
import { NgxPermission } from '../model/permission.model';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/from';
export declare type NgxPermissionsObject = {
    [name: string]: NgxPermission;
};
export declare const USE_PERMISSIONS_STORE: InjectionToken<{}>;
export declare class NgxPermissionsService {
    private isolate;
    private permissionsStore;
    private permissionsSource;
    permissions$: Observable<NgxPermissionsObject>;
    constructor(isolate: boolean, permissionsStore: NgxPermissionsStore);
    /**
     * Remove all permissions from permissions source
     */
    flushPermissions(): void;
    hasPermission(permission: string | string[]): Promise<boolean>;
    loadPermissions(permissions: string[], validationFunction?: Function): void;
    addPermission(permission: string | string[], validationFunction?: Function): void;
    /**
     * @param {string} permissionName
     * Removes permission from permissionsObject;
     */
    removePermission(permissionName: string): void;
    getPermission(name: string): NgxPermission;
    getPermissions(): NgxPermissionsObject;
    private reducePermission(source, name, validationFunction?);
    private hasArrayPermission(permissions);
    private hasPermissionValidationFunction(key);
}
