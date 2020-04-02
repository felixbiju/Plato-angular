import { EventEmitter, TemplateRef, ViewContainerRef } from '@angular/core';
export declare class NgxPermissionsAllowStubDirective {
    private viewContainer;
    private templateRef;
    ngxPermissionsOnly: string | string[];
    ngxPermissionsOnlyThen: TemplateRef<any>;
    ngxPermissionsOnlyElse: TemplateRef<any>;
    ngxPermissionsExcept: string | string[];
    ngxPermissionsExceptElse: TemplateRef<any>;
    ngxPermissionsExceptThen: TemplateRef<any>;
    ngxPermissionsThen: TemplateRef<any>;
    ngxPermissionsElse: TemplateRef<any>;
    permissionsAuthorized: EventEmitter<{}>;
    permissionsUnauthorized: EventEmitter<{}>;
    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<any>);
    ngOnInit(): void;
    private getAuthorizedTemplate();
}
