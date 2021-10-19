import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'vedic-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationErrorsComponent implements OnInit {
  @Input() errors!: ValidationErrors | undefined | null;

  constructor() {}

  ngOnInit() {}
}
