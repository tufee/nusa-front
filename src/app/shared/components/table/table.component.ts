import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-table',
  styleUrls: ['./table.component.css'],
  templateUrl: './table.component.html',
  standalone: true,
  imports: [MatTableModule, DatePipe],
})

export class TableComponent {
  @Input() patientData: Patient[];

  constructor() {
    this.patientData = [];
  }

  displayedColumns: string[] = ['nome', 'cpf', 'data_nascimento'];
}

