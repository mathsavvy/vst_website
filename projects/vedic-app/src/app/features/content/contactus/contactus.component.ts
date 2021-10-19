import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactService } from './contactus.service';

@Component({
  selector: 'vedic-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {
  public contactFormGroup!: FormGroup;
  public isDisabled: boolean = false;
  public success: boolean = false;
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactForm();
  }

  private contactForm() {
    this.contactFormGroup = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      mobile: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])],
    });
  }

  public isErrorState(control: AbstractControl | null | undefined) {
    return control?.dirty && this.contactFormGroup?.invalid;
  }

  get ctrls() {
    return this.contactFormGroup.controls;
  }

  public restrict(e: Event) {
    const val = this.ctrls.mobile?.value;
    if (('' + val).length > 11) {
      this.contactFormGroup.get('mobile')?.setValue(('' + val).slice(0, -1));
    }
  }

  public submit() {
    this.contactFormGroup.markAllAsTouched();
    if (!this.validator) {
      return;
    }

    const { name, email, mobile, message } = this.ctrls;
    this.isDisabled = true;

    this.contactService
      .sendMail({
        name: name?.value,
        email: email?.value,
        contact: mobile?.value,
        message: message?.value,
      })
      .subscribe(
        () => {
          this.isDisabled = false;
          this.success = true;
          this.contactFormGroup.reset();
          setTimeout(() => {
            this.success = false;  
          }, 2*1000);
        },
        (err) => {
          this.isDisabled = false;
          this.success = false;
        }
      );
  }

  private get validator(): boolean {
    const { name, email, mobile, message } = this.ctrls;

    if (!name?.value || !email?.value || !mobile?.value || !message?.value) {
      return false;
    }

    return true;
  }
}
