import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { mapObjectType } from "../../enum";
import { commonResWithData,  } from "../../if";
import { fairwayInfo, greenObject, mapAssetObject, mapLatLong, mapObject, Tee } from "../../../database/db.interface";

const topLeft:mapLatLong = {
	latitude: 121.479379,
	longitude: 25.088817,
}

const topRight: mapLatLong = {
	latitude:121.482555,
	longitude: 25.093029,
}

const bottomLeft: mapLatLong = {
	latitude: 121.474873,
	longitude: 25.086169,
}

const bottomRight: mapLatLong = {
	latitude: 121.485001,
	longitude: 25.084109,
}

const asset: mapAssetObject = {
	name: 'test',
	type: mapObjectType.Block,
	x: 0,
	y: 0,
	show: true,
	image: 'imageurl',
}

const mapObj: mapObject = {
	src: 'src dir',
	memo: 'memo',
	topLeft: topLeft,
	topRight: topRight,
	bottomLeft: bottomLeft,
	bottomRight: bottomRight,
	assets: [asset],
}
const blueTee:Tee = {
	name: 'BlueTee',
	distance: 156,
}
const whiteTee:Tee = {
	name: 'WhiteTee',
	distance: 138,
}
const redTee: Tee = {
	name: 'RedTee',
	distance: 120,
}
const green:greenObject = {
	sno: 'A',
	leftEdge: 6,
	rightEdge: 7,
	assets:[asset],
	width: 12,
	height: 10,
	widthDistance: 24,
}
const fairwayInfoExVal: fairwayInfo = {
	id: '',
	clubid: 'linkougolf',
	zoneid: '01',
	fairwayid: 1,
	Par: 4,
	handicap: 8,
	tees: [
		blueTee,
		whiteTee,
		redTee,
	],
	fairwayMap: mapObj,
}

const fairwayInfoRes:commonResWithData<fairwayInfo[]> = {
	errcode:'0',
	data: [fairwayInfoExVal],
}

export const fairwayInfoEx:Record<'Request', ExampleObject> = {
	Request: {
		value: fairwayInfoExVal,
	}
}

export const fairwayInfoResEx:Record<'Response', ExampleObject> = {
	Response: {
		value: fairwayInfoRes,
	}
}