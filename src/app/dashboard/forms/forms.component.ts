import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormsComponent {
  public arr = [1,2,3,4,5,6,7,8,9,10]
}
