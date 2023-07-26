import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-rf',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [ReactiveFormsModule]
})
export class ProfileRFComponent {
  builder = inject(FormBuilder);

  profileForm = this.builder.nonNullable.group({
    firstName: ['']
  });

  get firstName(): FormControl {
    return this.profileForm.get('firstName') as FormControl;
  }

  onSubmit(): Partial<{ firstName: string; }> {
    return this.profileForm.value;
  }
}
