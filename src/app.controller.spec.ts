import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import supertest from 'supertest';
//import * as request from 'supertest';
import checkInDataJson from './test.data';

describe('App e2e test', () => {
	let app: INestApplication;
	let games = { getData: () => checkInDataJson };

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		})
		.compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	/*
	it('Get /manage/game/{gameid}', () => {
		const g = games.getData().data.game;
		delete g.carts;
		return supertest(app.getHttpServer()).get('/manage/game/1NIqHPUronsgRxZwpKbKCZ').set({
			'WWW-AUTH': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYXN0aXAiOiIxLjM0LjE5NS4yMTciLCJzaXRlaWQiOiJsaW5rb3Vnb2xmIiwibGFzdGxvZ2ludG0iOjE2OTcwNzM0NDY1MjksIm1ldGEiOnsibmlja25hbWUiOiJhZG1pbjAwMSJ9LCJwcm9maWxlIjp7fSwiY3JlYXRlZEF0IjoiMjAyMy0wNy0xM1QwNjowODozNy43MzVaIiwiZW5hYmxlMkZBIjpmYWxzZSwiZ3JvdXAiOiJhZG1pbiIsInVpZCI6IjNaQkphYjFQZkdkOWtka3c1UG1ucUUiLCJhY3RpdmUiOnRydWUsInVwZGF0ZWRBdCI6IjIwMjMtMTAtMTJUMDE6MTc6MjYuNTMxWiIsInVzZXJuYW1lIjoiYWRtaW4wMDEiLCJpYXQiOjE2OTcwNzcwOTIsImV4cCI6MTY5NzA4NDI5MiwiaXNzIjoiYXBpLm5vdmFhcHBzLm5ldCJ9.Q_g8vwNDvnIkSsgPfhXMYFPAlNSjEqfPDLdGSkOqakw'
		}).expect(200).expect({
			errcode: '0',
			data: g
		}
		).timeout(5000);
	});
	*/

  it('/cart/getCheckInData/caddie001/PC-713dbb4c-2c73-4b2f-8f4f-8ee856b245d4', () => {
		return supertest(app.getHttpServer())
			.get('/cart/getCheckInData/caddie001/PC-713dbb4c-2c73-4b2f-8f4f-8ee856b245d4').set({
				'WWW-AUTH': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYXN0aXAiOiIxLjM0LjE5NS4yMTciLCJzaXRlaWQiOiJsaW5rb3Vnb2xmIiwibGFzdGxvZ2ludG0iOjE2OTcwNzM0NDY1MjksIm1ldGEiOnsibmlja25hbWUiOiJhZG1pbjAwMSJ9LCJwcm9maWxlIjp7fSwiY3JlYXRlZEF0IjoiMjAyMy0wNy0xM1QwNjowODozNy43MzVaIiwiZW5hYmxlMkZBIjpmYWxzZSwiZ3JvdXAiOiJhZG1pbiIsInVpZCI6IjNaQkphYjFQZkdkOWtka3c1UG1ucUUiLCJhY3RpdmUiOnRydWUsInVwZGF0ZWRBdCI6IjIwMjMtMTAtMTJUMDE6MTc6MjYuNTMxWiIsInVzZXJuYW1lIjoiYWRtaW4wMDEiLCJpYXQiOjE2OTcwNzcwOTIsImV4cCI6MTY5NzA4NDI5MiwiaXNzIjoiYXBpLm5vdmFhcHBzLm5ldCJ9.Q_g8vwNDvnIkSsgPfhXMYFPAlNSjEqfPDLdGSkOqakw'
			}).expect(200).expect(
				games.getData()
			).timeout(5000);
	});

	afterAll(async () => {
		await app.close();
	});
});