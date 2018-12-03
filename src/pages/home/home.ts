import { Attendace } from './../../app/models/attendance.model';
import { Service } from './../../services/Service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  data = "";
  matricula;
  option: BarcodeScannerOptions;
  lastAttendance

  constructor(public navCtrl: NavController, public barcodeScanner: BarcodeScanner, public service: Service) {
  }

  scan() {
    this.option = {
      prompt: "Escanea tu Credencial"
    }
    this.barcodeScanner.scan(this.option).then(barcodeData => {
      console.log('Barcode data', barcodeData);

      this.data = barcodeData.text

      this.matricula = parseInt(this.data);

      this.validateLastAttendance(this.matricula);


    }).catch(err => {
      console.log('Error', err);
    });
  }

  validateLastAttendance(memberId) {
    this.service.getGetLastAttendanceByMemberId(memberId).subscribe(
      (data) => {

        if (data == null) {
          this.saveNewAttendance(memberId);
        }else{
          let date = new Date();
          let attendance = new Attendace();
          this.lastAttendance = data;
  
          if (this.lastAttendance.checkOut != null) {
            let datetext = date.toTimeString().split(' ')[0];
            attendance.checkIn = datetext;
            attendance.date = date;
            this.saveAttendances(attendance, memberId);
          } else {
            this.lastAttendance.checkOut = date;
            let datetext;
            this.lastAttendance.checkOut = datetext = this.lastAttendance.checkOut.toTimeString().split(' ')[0];
            this.saveAttendances(this.lastAttendance, memberId);
          }
        }
      }
    )
  }

  saveNewAttendance(memberId) {
    let date = new Date();
    let attendance = new Attendace();
    let datetext = date.toTimeString().split(' ')[0];

    attendance.checkIn = datetext;
    attendance.date = date;
    this.saveAttendances(attendance, memberId);


  }

  saveAttendances(attendance, memberId) {
    this.service.saveAttendance(attendance, memberId).subscribe(
      (data) => {
        console.log(data)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  sendAttendance() {
    this.lastAttendance = this.validateLastAttendance(9566);
  }

}
