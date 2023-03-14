import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator';
import { takeUntil } from 'rxjs';
import { IForms, IFormsData, IPaginationData } from 'src/app/shared/interfaces/auth.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DestroyService } from 'src/app/shared/services/destroy.service';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})

export class FormsComponent implements OnInit {
  @ViewChild(MatMenuTrigger) matMenuTrigger!: MatMenuTrigger;

  public formsData!: IFormsData[];

  public menuTopLeftPosition = { x: '0', y: '0' };

  public paginationDefaultValues: IPaginationData = {
    pageSize: 5,
    maxSizePages: [5, 10, 25, 50],
    collectionSize: 65, //! fix
    pageIndex: 1,
  };

  constructor(private authService: AuthService, private destroy$: DestroyService, private changeDetector: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.getDataForms();
  }

  public pagination(pageData: PageEvent): void {
    this.paginationDefaultValues.pageIndex = pageData.pageIndex++;

    this.authService.getForms(pageData)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((formsData: IForms) => {
        this.formsData = formsData.data;
        this.changeDetector.detectChanges();
      });
  }

  public sortByDate(): void {
    console.log('sort');
  }

  public closeMenu(): void {
    this.matMenuTrigger.closeMenu();
  }

  public onRightClick(event: MouseEvent,): void {
    event.preventDefault();

    this.matMenuTrigger.menuOpen && this.matMenuTrigger.closeMenu();

    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';

    setTimeout(() => {
      this.matMenuTrigger.openMenu();
    }, 200);
  }

  private getDataForms(): void {
    this.authService.getForms(this.paginationDefaultValues)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((formsData: IForms) => {
        this.formsData = formsData.data;
        this.changeDetector.detectChanges();
      });
  }
}
