import { Component, OnInit } from '@angular/core';
import { pki } from "node-forge";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app works!';
	keypair:{pub:string,priv:string};
	t:{start?:Date,end?:Date};
	ngOnInit() {
		this.t = {};
		this.t.start = new Date();
		pki.rsa.generateKeyPair(2048,this.keysGenerated.bind(this));
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
}
