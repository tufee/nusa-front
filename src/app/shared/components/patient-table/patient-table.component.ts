import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-patient-table',
  styleUrls: ['./patient-table.component.css'],
  templateUrl: './patient-table.component.html',
  standalone: true,
  imports: [MatTableModule, DatePipe],
})

export class PatientTableComponent {
  @Input() patientData: Patient[];

  constructor() {
    this.patientData = [];
  }

  displayedColumns: string[] = ['nome', 'cpf', 'data_nascimento'];
}

