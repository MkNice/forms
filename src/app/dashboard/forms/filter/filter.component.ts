import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  public filterField = new FormGroup({ filter: new FormControl('') });

  @Output() public filterValueChanged: EventEmitter<string> = new EventEmitter<string>();

  public emitFilterField(): void {
    const filterField = this.filterField.value.filter;

    filterField && this.filterValueChanged.emit(filterField);
  }
}
