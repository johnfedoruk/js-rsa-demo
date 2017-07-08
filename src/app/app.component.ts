import { Component, OnInit } from '@angular/core';
import { pki } from "node-forge";
import "node-forge";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	plaintext:string;
	ciphertext:string;
	title = 'Asymmetric Encryption In the Browser';
	keypair:{pub:string,priv:string} = {pub:null,priv:null};
	t:{start?:Date,end?:Date} = {};
	keysize:number = 1024;
	ngOnInit() {
		this.onGenerateKeyPair();
	}
	onGenerateKeyPair() {
		this.t.start = new Date();
		pki.rsa.generateKeyPair(this.keysize,this.keysGenerated.bind(this));
	}
	keysGenerated(e,kp:pki.KeyPair) {
		if(e)
			console.warn(e);
		this.keypair = {
			priv:pki.privateKeyToPem(kp.privateKey).trim(),
			pub:pki.publicKeyToPem(kp.publicKey).trim()
		}
		this.t.end = new Date();
		console.log(`${Math.round((this.t.end.getTime() - this.t.start.getTime()))}ms to generate key pair`);
	}
	onEncrypt(plaintext:string=null):string {
		this.ciphertext = btoa((<pki.Key>pki.publicKeyFromPem(this.keypair.pub)).encrypt(plaintext||this.plaintext));
		return this.ciphertext;
	}
	onDecrypt(ciphertext:string=null):string {
		this.plaintext = (<pki.Key>pki.privateKeyFromPem(this.keypair.priv)).decrypt(atob(ciphertext||this.ciphertext));
		return this.plaintext;
	}
}
