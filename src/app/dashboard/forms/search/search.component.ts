import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchComponent {
  public searchField = new FormControl('');

  @Output() public searchValueChanged: EventEmitter<string> = new EventEmitter<string>();

  public emitSearchField(): void {
    const searchField = this.searchField.value;
    searchField && this.searchValueChanged.emit(searchField);
  }
}