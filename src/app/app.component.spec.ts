import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent
			],
			imports: [
				FormsModule
			],
		}).compileComponents();
	}));

	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));

	it(`should have as title 'Asymmetric Encryption In the Browser'`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('Asymmetric Encryption In the Browser');
	}));

	it(`should have a default keysize equal to a number`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.keysize).toEqual(jasmine.any(Number));
	}));

	it(`should have a default keysize greater than or equal to 1024`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.keysize).toBeGreaterThanOrEqual(1024);
	}));

	it(`should have called onGenerateKeyPair by ngOnInit`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		spyOn(app,"onGenerateKeyPair");
		app.ngOnInit();
		expect(app.onGenerateKeyPair).toHaveBeenCalled();
	}));

	it(`should properly encrypt and decrypt a message`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		app.keypair = {
			pub:	`-----BEGIN PUBLIC KEY-----\
					MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDJQYaQ/YADFgjXqfhlRaNw+m58\
					mU21aHqMpygguUicI8GyfqGN2DUw5VIkzHyTMkGwnCT51RABqmz6EFwqergVQmlt\
					0q6/j1YzIAfymHgnUjjyKt/7Db565WS+zkInLOEufZV9aOLUgXzh8gYP7+SScoI3\
					1JDskj9rGXDzRjLICQIDAQAB\
					-----END PUBLIC KEY-----`,
			priv:	`-----BEGIN RSA PRIVATE KEY-----\
					MIICWwIBAAKBgQDJQYaQ/YADFgjXqfhlRaNw+m58mU21aHqMpygguUicI8GyfqGN\
					2DUw5VIkzHyTMkGwnCT51RABqmz6EFwqergVQmlt0q6/j1YzIAfymHgnUjjyKt/7\
					Db565WS+zkInLOEufZV9aOLUgXzh8gYP7+SScoI31JDskj9rGXDzRjLICQIDAQAB\
					AoGAMi/z9b4xqRNamyVYuzB1hJv+53V3anCmduLMX/S0hbNo/zES6oNrKElXhbO0\
					sSRMO1WE5wRZ3IB6cpWX1kQKGVnVRF+VnyDaMnd2W6n29yaudmDlnW1NBdD9WefP\
					hU/x8r2TlIVDDjNxMEYLM8ilJxNXdYMpOtvtviF8pbVnCrECQQDqYj2tHE40QesD\
					AC7pIpJFpwJAEpxQcw1wRSnR8Xnk7grITNAbxfcJ0qI5rdpapbdbkW8K+GS/JWZ2\
					w4W59huFAkEA29EkstT1HZeW9ObCCPx/hDAdAkBrJZRvwoyDMERA1Jw1RnBiWbqk\
					sU2dg4B0DeBjsHkAouTElWQT14Anw1T3tQJABGRK24+IN5p0mN3MAzpOm1eBx0mR\
					/D/rpIrnObPYoN2E/jPSQnL3Kgv0VjhXuxMX2HNlLUNyP9KnlNodC1r9MQJAYSeR\
					FtF0/P1RJTEQtbQUEDLLv4EFWni+5LgCC8U++jmIeneVoJ8Tx6HMaqDNqoxww0DX\
					/Scrk/PFqUvlRzo4uQJAQUSCItM5u3fLGvO9R5fMATGiHHLtDZjwc73/Ej7hbqQS\
					ctQmiIyWmafjjTCqYYCYSYURCrawrwIUbpb79LF7Ww==\
					-----END RSA PRIVATE KEY-----`
		};
		const plaintext:string = `hello world`;
		expect(app.onEncrypt(plaintext)).not.toBe(plaintext);
		expect(app.onDecrypt(app.onEncrypt(plaintext))).toBe(plaintext);
	}));

});
