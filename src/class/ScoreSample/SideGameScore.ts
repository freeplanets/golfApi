export default class SideGameScore {
	private sName:string;
	private data: {
		sideGameName: '',
		detail: [],
	}
	constructor(name:string){
		this.sName = name;
	}
}