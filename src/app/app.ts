import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, CommonModule, TableModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('nmi.standalone.poc.ui');

  amount: number | null = null;
  responseJson: any = null;
  tableData: any[] = [];

  ngOnInit() {
    // Generate multiple mock transactions
    this.generateMockTransactions(5); // change number for more/less rows
  }

  generateMockTransactions(count: number) {
    this.tableData = [];

    for (let i = 0; i < count; i++) {
      const mock = {
        transactionid: Math.floor(Math.random() * 1000000).toString(),
        response: '1',
        responsetext: 'APPROVED',
        authcode: Math.floor(100000 + Math.random() * 900000).toString(),
        amount: (Math.random() * 100).toFixed(2),
        date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
        method: 'VISA',
      };

      this.tableData.push(mock);

      if (i === 0) {
        // Use latest as JSON sample
        this.responseJson = mock;
      }
    }
  }
}
