import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input() itemsPerPage!: number;
  @Input() maxSizePages!: number[];
  @Input() collectionSize!: number;

  @Output() nextPage = new EventEmitter<PageEvent>();

  public onPageChange(pageData: PageEvent) {
    this.nextPage.emit(pageData);
  }
}
