import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { signinReq, signinRes } from "../../if";


const loginExampleValue:signinReq = {
  username: 'test',
  password: 'pass',
  reCAPTCHAToken: '1234',
}
const loginResponse:signinRes = {
  errcode: '0',
  error: 'object',
  data: 'object',
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