export class InventoryDTO {
  inventoryId: number;
  itemName: string;
  itemDescription: string;
  quantity: number;
  unitPrice: number;

  constructor(
    inventoryId: number = 0,
    itemName: string = '',
    itemDescription: string = '',
    quantity: number = 0,
    unitPrice: number = 0.0
  ) {
    this.inventoryId = inventoryId;
    this.itemName = itemName;
    this.itemDescription = itemDescription;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }
}
