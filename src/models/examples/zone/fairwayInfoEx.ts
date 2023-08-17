import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { mapAssetObjectType } from "../../enum";
import { commonResWithData,  } from "../../if";
import { fairwayObject, greenObject, mapAssetObject, mapLatLong, mapObject, teeObject } from "../../../database/db.interface";

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
	type: mapAssetObjectType.Block,
	x: 0,
	y: 0,
	show: true,
	image: 'imageurl',
}

const mapObj: mapObject = {
	image: 'src dir',
	memo: 'memo',
	topLeft: topLeft,
	topRight: topRight,
	bottomLeft: bottomLeft,
	bottomRight: bottomRight,
	assets: [asset],
	width: 8,
	height: 12,
	widthDistance: 10,
	heading: 25,
}

const tee1:teeObject = {
	teeName: 'WhiteTee',
	teeColor: 'White',
	distance: 138,
};
const tee2:teeObject = {
	teeName: 'BlueTee',
	teeColor: 'Blue',
	distance: 156,
};
const tee3:teeObject = {
	teeName: 'RedTee',
	teeColor: 'Red',
	distance: 120,
};
const green:greenObject = {
	sno: 'A',
	leftEdge: 6,
	rightEdge: 7,
	image: 'imageurl',
	assets:[asset],
	width: 12,
	height: 10,
	widthDistance: 24,
}
const fairwayInfoExVal: fairwayObject = {
	fairwayno: 1,
	par: 4,
	handicap: 8,
	tees: [
		tee1,
		tee2,
		tee3,
	],
	fairwayMap: mapObj,
	greens: [green],
}

const fairwayInfoRes:commonResWithData<fairwayObject[]> = {
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