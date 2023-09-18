import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Medicine } from 'src/app/models/medicine';

@Component({
  selector: 'app-medicine-table',
  styleUrls: ['./medicine-table.component.css'],
  templateUrl: './medicine-table.component.html',
  standalone: true,
  imports: [MatTableModule, DatePipe],
})

export class MedicineTableComponent {
  @Input() medicineData: Medicine[];

  constructor() {
    this.medicineData = [];
  }

  displayedColumns: string[] = ['nome', 'categoria', 'codigo_anvisa'];
}

