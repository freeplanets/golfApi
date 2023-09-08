export default class stringScore {
	add(a:string, b:string) {
		if (b === '') return '';
		return String(this.convertToNumber(a) + this.convertToNumber(b));
	}
	convertToNumber(s:string) {
		return s ? parseInt(s, 10) : 0;
	}	
}