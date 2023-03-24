import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator';
import { takeUntil } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { IFormFieldValues, IForms, IFormsData as IFormData, IParams } from 'src/app/shared/interfaces/auth.interface';
import { IOptionsDialogData } from 'src/app/shared/interfaces/dialogs.interface';
import { DestroyService } from 'src/app/shared/services/destroy.service';
import { FormsAPIService } from 'src/app/shared/services/forms-api.service';
import { ActionFormDialogComponent } from './dialogs/action-form-dialog/action-form-dialog.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})

export class FormsComponent implements OnInit {
  @ViewChild(MatMenuTrigger) matMenuTrigger!: MatMenuTrigger;

  public formsData: IFormData[] = [];
  public currentFormFieldValues!: IFormFieldValues[];
  public currentFormId = 0;
  public menuTopLeftPosition = { x: '0', y: '0' };

  public paramsForApi: IParams = {
    pageSize: 5,
    maxSizePages: [5, 10, 25, 50],
    length: 65,
    pageIndex: 1,
    search: '',
    filterByOrder: 'asc',
    filterByData: '',
  };

  constructor(private destroy$: DestroyService, private changeDetector: ChangeDetectorRef, private popUp: MatDialog, private formsApi: FormsAPIService,) { }

  public ngOnInit(): void {
    this.getDataForms();
  }

  public changeOrderDirection(): void {
    this.paramsForApi.filterByOrder = this.paramsForApi.filterByOrder === 'asc' ? 'desc' : 'asc';

    this.formsApi.getForms(this.paramsForApi)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((formsData: IForms) => {
        this.formsData = formsData.data;
        this.paramsForApi.length = formsData.meta.total_items_count;
        this.changeDetector.detectChanges();
      });
  }

  public getFormDataByFilter(event: string): void {
    this.paramsForApi.filterByData = event;
    this.formsApi.getForms(this.paramsForApi)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((formsData: IForms) => {
        this.formsData = formsData.data;
        this.paramsForApi.length = formsData.meta.total_items_count;
        this.changeDetector.detectChanges();
      });
  }

  public getFormDataBySearch(event: string): void {
    this.paramsForApi.search = event;
    this.formsApi.getForms(this.paramsForApi).pipe(
      takeUntil(this.destroy$)
    )
      .subscribe((formsData: IForms) => {
        this.formsData = formsData.data;
        this.paramsForApi.length = formsData.meta.total_items_count;
        this.changeDetector.detectChanges();
      });
  }

  public pagination(pageData: PageEvent): void {
    this.paramsForApi.pageIndex = pageData.pageIndex + 1;
    this.paramsForApi.pageSize = pageData.pageSize;

    this.formsApi.getForms(this.paramsForApi)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((formsData: IForms) => {
        this.formsData = formsData.data;
        this.paramsForApi.length = formsData.meta.total_items_count;
        this.changeDetector.detectChanges();
      });
  }

  public actionForms(action: 'edit' | 'create'): void {
    this.popUp.open(ActionFormDialogComponent, {
      data: {
        formFieldId: this.currentFormFieldValues,
        idForm: this.currentFormId,
        action: action,
      }
    })
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((optionsDialogData: IOptionsDialogData) => {
        if (action === 'edit') {
          optionsDialogData.valueForChange &&
            this.formsApi.patchFormValues(optionsDialogData)
              .pipe(
                takeUntil(this.destroy$)
              )
              .subscribe();
        } else {
          optionsDialogData &&
            this.formsApi.postForm(optionsDialogData)
              .pipe(
                takeUntil(this.destroy$)
              )
              .subscribe();
        }
      });
  }

  public deleteForm(): void {
    this.popUp.open(ConfirmDialogComponent, {
      data: {
        title: 'Вы действительно хотите удалить эту форму?',
        idForms: this.currentFormId,
      }
    })
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((optionsDialogData: boolean) => {
        optionsDialogData &&
          this.formsApi.deleteForm(this.currentFormId)
            .pipe(
              takeUntil(this.destroy$)
            )
            .subscribe(() => {
              this.getDataForms();
            });
      });
  }

  public closeMenu(): void {
    this.matMenuTrigger.closeMenu();
  }

  public onRightClick(event: MouseEvent, formData: IFormData): void {
    event.preventDefault();

    this.currentFormFieldValues = formData.form_field_values;
    this.currentFormId = formData.id;

    this.matMenuTrigger.menuOpen && this.matMenuTrigger.closeMenu();

    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';

    setTimeout(() => {
      this.matMenuTrigger.openMenu();
    }, 200);
  }

  private getDataForms(): void {
    this.formsApi.getForms(this.paramsForApi)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((formsData: IForms) => {
        this.formsData = formsData.data;
        this.paramsForApi.length = formsData.meta.total_items_count;
        this.changeDetector.detectChanges();
      });
  }
}