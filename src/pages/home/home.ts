import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  data="";
  matricula;
  option:BarcodeScannerOptions ;

  constructor(public navCtrl: NavController, public barcodeScanner: BarcodeScanner) {

  }

  scan(){
    this.option ={
      showFlipCameraButton:true,
      prompt:"Escanea tu Credencial"
    }
    this.barcodeScanner.scan(this.option).then(barcodeData => {
      console.log('Barcode data', barcodeData);

      this.data = barcodeData.text

      this.matricula = parseInt(this.data);


     }).catch(err => {
         console.log('Error', err);
     });
  }

}
