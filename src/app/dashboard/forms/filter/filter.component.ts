import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  public filterField = new FormControl('');

  @Output() public filterValueChanged: EventEmitter<string> = new EventEmitter<string>();

  public emitFilterField(): void {
    const filterField = this.filterField.value;

    filterField && this.filterValueChanged.emit(filterField);
  }
}