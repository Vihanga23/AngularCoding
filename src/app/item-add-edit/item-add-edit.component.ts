import { Component ,OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-item-add-edit',
  templateUrl: './item-add-edit.component.html',
  styleUrls: ['./item-add-edit.component.scss']
})
export class ItemAddEditComponent implements OnInit {

  itemForm: FormGroup;
  
  category: string[] = [
    'Food',
    'Electronic',
    'Furniture',
    'Equipments'
  ];

  constructor(
    private _fb: FormBuilder, 
    private _itemService: ItemService, 
    private _dialogRef: MatDialogRef<ItemAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _coreService: CoreService
    
    ){
    this.itemForm =this._fb.group ({
      itemTitle: '',
      itemDesc: '',
      category: '',
      price: '',
      date: '',
    })
  }

  ngOnInit(): void {
    this.itemForm.patchValue(this.data)
  }

  onFormSubmit(){
    if(this.itemForm.valid) {
      if(this.data) {
        this._itemService.updateItems(this.data.id, this.itemForm.value).subscribe({
          next: (val: any) =>{
            this._coreService.openSnackBar('Item Update Successfully!')
            this._dialogRef.close(true);
        },
  
        error: (err: any) =>{
          console.error(err);
          
        }
        });
      }else {
        this._itemService.addItems(this.itemForm.value).subscribe({
          next: (val: any) =>{
            this._coreService.openSnackBar('Item add Successfully!')
            this._dialogRef.close(true);
        },
  
        error: (err: any) =>{
          console.error(err);
          
        }
        });
      }
      
    }
  }

}
