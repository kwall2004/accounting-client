import { NgModule, Component, Directive, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-progress-bar',
  template: ''
})
class MockProgressBarComponent {
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-icon',
  template: ''
})
class MockIconComponent {
}

class MockDialogService {
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[matTooltip]'
})
class MockTooltipDirective {
  @Input() matTooltip: any;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'button[mat-dialog-close]'
})
class MockDialogCloseDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('mat-dialog-close') matDialogClose: any;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-form-field',
  template: ''
})
class MockFormFieldComponent {
  @Input() color: any;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[matDatepicker]'
})
class MockDatepickerDirective {
  @Input() matDatepicker: any;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-datepicker-toggle',
  template: ''
})
class MockDatepickerToggleComponent {
  @Input() for: any;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-datepicker',
  template: ''
})
class MockDatepickerComponent {
}

@NgModule({
  declarations: [
    MockProgressBarComponent,
    MockIconComponent,
    MockTooltipDirective,
    MockDialogCloseDirective,
    MockFormFieldComponent,
    MockDatepickerDirective,
    MockDatepickerToggleComponent,
    MockDatepickerComponent
  ],
  exports: [
    MockProgressBarComponent,
    MockIconComponent,
    MockTooltipDirective,
    MockDialogCloseDirective,
    MockFormFieldComponent,
    MockDatepickerDirective,
    MockDatepickerToggleComponent,
    MockDatepickerComponent
  ],
  providers: [{
    provide: MatDialog,
    useClass: MockDialogService
  }, {
    provide: MatDialogRef,
    useClass: MockDialogService
  }, {
    provide: MAT_DIALOG_DATA,
    useClass: MockDialogService
  }]
})
export class AngularMaterialTestingModule { }
