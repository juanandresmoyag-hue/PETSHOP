import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface PetForm {
  name: string;
  species: string;
  age: number | null;
  breed: string;
  contact: string;
  notes: string;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  pet: PetForm = {
    name: '',
    species: '',
    age: null,
    breed: '',
    contact: '',
    notes: ''
  };

  successMessage = '';

  submitForm(form: NgForm): void {
    if (form.invalid) {
      this.successMessage = '';
      return;
    }

    this.successMessage = `${this.pet.name} ha sido registrada correctamente.`;
    form.resetForm({ species: '' });
  }

}
