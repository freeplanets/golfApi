import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { commonResWithData, errObj, signinReq, signinResData, tokenObj } from "../../if";


const loginExampleValue:signinReq = {
  username: 'test',
  password: 'pass',
  reCAPTCHAToken: '1234',
}
const err:errObj = {
  message: 'error message',
  extra: {},
}
const token: tokenObj = {
  token: 'token',
  refreshToken: 'XXXXXX',
}
const resdata:signinResData = {
  tokens: token,
  twofaqrcode: 'aaaaaa',
  needfa: true,
}
const loginResponse:commonResWithData<signinResData> = {
  errcode: '0',
  error: err,
  data: resdata,
}
export const signinReqEx:Record<'signin', ExampleObject> = {
  signin: {
    value: loginExampleValue
  }
}
export const signinResRx:Record<'Response', ExampleObject> = {
  Response: {
    description: '回傳範例',
    value: loginResponse,
  }
}