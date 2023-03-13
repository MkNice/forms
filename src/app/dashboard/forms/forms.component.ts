import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator';
import { takeUntil } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DestroyService } from 'src/app/shared/services/destroy.service';

interface IFormsData {
  data: any[];
  meta: any[];
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})

export class FormsComponent implements OnInit {
  @ViewChild(MatMenuTrigger) matMenuTrigger!: MatMenuTrigger;

  public formsData: any;

  public menuTopLeftPosition = { x: '0', y: '0' };

  constructor(private authService: AuthService, private destroy$: DestroyService, private changeDetector: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.authService.getForms().pipe(takeUntil(this.destroy$)).subscribe((formsData: any) => {
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

  public onPageChange(event: PageEvent) {
    console.log(event);
    // Здесь можно загрузить данные для новой страницы
  }
}
