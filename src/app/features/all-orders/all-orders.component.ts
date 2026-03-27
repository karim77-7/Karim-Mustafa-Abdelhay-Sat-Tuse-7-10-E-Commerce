import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-all-orders',
  imports: [RouterLink],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css',
})
export class AllOrdersComponent {
  showDetails = false;

  // private readonly ordersService = inject(OrdersService);

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  // ngOnInit(): void {
  //   let userId = localStorage.getItem('userId');

  //   if (userId) {
  //     this.getUserOrders(userId);
  //   }
  // }

  // getUserOrders(id: string) {
  //   console.log('calling API with id:', id);
  
  //   this.ordersService.getUserOrders(id).subscribe({
  //     next: (res) => {
  //       console.log('response:', res);
  //     },
  //     error: (err) => {
  //       console.log('error:', err);
  //     }
  //   });
  // }
}
