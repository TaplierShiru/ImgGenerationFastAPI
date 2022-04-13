import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdvancePaymentType, AdvancePaymentUpdateDto } from 'src/app/project/dtos/advance-payments.dto';
import { DialogResultDataInterface } from 'src/app/project/utils/dialig-data.interface';
import { dateToCleanData } from 'src/app/utils/helpers/date-helpers';
import { PageMode } from 'src/app/utils/pages/modes-enum';

@Component({
  selector: 'app-advance-payment-dialog',
  templateUrl: './dialog-advance-payments.component.html',
  styleUrls: ['./dialog-advance-payments.component.scss']
})
export class DialogAdvancePaymentComponent implements OnInit {
  advancePaymentForm: FormGroup;
  pageMode: PageMode;

  advancePaymentsTypeArray: Array<string> = Object.values(AdvancePaymentType);
  // Choosen state from array above
  advancePaymentsTypeCtrl: FormControl;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAdvancePaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdvancePaymentUpdateDto | null
  ) {
    this.advancePaymentsTypeCtrl = this.fb.control('', [Validators.required]);
    this.advancePaymentForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: [''],
      paymentType: this.advancePaymentsTypeCtrl,
      title: ['', Validators.required],
      description: [''],
      amount: ['', Validators.required],
      warrantyRetention: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const advancePaymentUpdateDto = this.data;
    if (advancePaymentUpdateDto) {
      this.advancePaymentForm.setValue({
        fromDate: advancePaymentUpdateDto.fromDate,
        toDate: dateToCleanData(advancePaymentUpdateDto.toDate),
        paymentType: advancePaymentUpdateDto.paymentType,
        title: advancePaymentUpdateDto.title,
        description: advancePaymentUpdateDto.description ? advancePaymentUpdateDto.description : '',
        amount: advancePaymentUpdateDto.amount,
        warrantyRetention: advancePaymentUpdateDto.warrantyRetention
      });
      this.pageMode = PageMode.Update;
    } else {
      this.pageMode = PageMode.Create;
    }
  }

  async submit() {
    if (this.advancePaymentForm.valid) {
      // Send data and close form after click `save` button
      const resultDto = {
        mode: this.pageMode,
        data: this.advancePaymentForm.value as AdvancePaymentUpdateDto
      } as DialogResultDataInterface;
      this.dialogRef.close(resultDto);
    } else {
      console.log('Form is invalid');
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
