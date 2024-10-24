import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/user.service';
import { InventoryDTO } from '../../models/inventory-dto';
import { AuthService } from '../../services/auth.service'; // Import AuthService for role checking
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  inventoryItems: InventoryDTO[] = [];
  selectedInventory: InventoryDTO = new InventoryDTO();
  isEditing = false;
  errorMessage: string = '';
  userRole: string | null = ''; // To hold the current user's role

  constructor(
    private dataService: DataService,
    private authService: AuthService, // Inject AuthService
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole(); // Get the current user's role
    if (this.userRole !== 'Manager') {
      this.router.navigate(['/unauthorized']); // Redirect if not authorized
    } else {
      this.getAllInventory(); // Initialize inventory list if authorized
    }
  }

  getAllInventory(): void {
    this.dataService.getInventoryItems().subscribe(
      (data) => {
        this.inventoryItems = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load inventory items.';
      }
    );
  }

  addInventory(): void {
    this.dataService.addInventory(this.selectedInventory).subscribe(
      (newInventory) => {
        this.inventoryItems.push(newInventory);
        this.selectedInventory = new InventoryDTO();
      },
      (error) => {
        this.errorMessage = 'Failed to add inventory item.';
      }
    );
  }

  editInventory(inventory: InventoryDTO): void {
    this.selectedInventory = { ...inventory };
    this.isEditing = true;
  }

  updateInventory(): void {
    this.dataService
      .updateInventory(
        this.selectedInventory.inventoryId,
        this.selectedInventory
      )
      .subscribe(
        () => {
          this.getAllInventory();
          this.isEditing = false;
          this.selectedInventory = new InventoryDTO();
        },
        (error) => {
          this.errorMessage = 'Failed to update inventory item.';
        }
      );
  }

  deleteInventory(inventoryId: number): void {
    this.dataService.deleteInventory(inventoryId).subscribe(
      () => {
        this.inventoryItems = this.inventoryItems.filter(
          (item) => item.inventoryId !== inventoryId
        );
      },
      (error) => {
        this.errorMessage = 'Failed to delete inventory item.';
      }
    );
  }

  resetForm(): void {
    this.selectedInventory = new InventoryDTO();
    this.isEditing = false;
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
