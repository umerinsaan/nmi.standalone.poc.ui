import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { PaymentService } from './services/payment-service';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, CommonModule, TableModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private paymentService  = inject(PaymentService);
  protected readonly title = signal('nmi.standalone.poc.ui');

  amount: number | null = 1;
  cardNumber: string | null = "4000000000002701";
  cardExpiry: string = '1229';
  CVV : string = '123';
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

  startTransaction():void{
    const dto = {
      cardNumber: this.cardNumber,
      amount :this.amount,
      cardExpiry: this.cardExpiry,
      CVV:this.CVV
    }
    this.paymentService.MakeSalePayment(dto).subscribe(res => {
      this.responseJson = res;
    });
  }
}