import { scoreLine } from "../../function/func.interface";
import { iScoreLine } from "../class.if";

export default class recordLine {
	createGameDetail(f0='', f1='', f2='', f3='', f4='', f5='', f6='', f7='', f8='', f9='', f10=''
		, f11='', f12='', f13='', f14='', f15='', f16='', f17='', f18='', f19=''){
		return {f0, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19};
	}
	newline(f0='', f1='', f2='', f3='', f4='', f5= ''):scoreLine {
		const ans:scoreLine = { f0, f1, f2, f3, f4 };
		if (f5) ans.f5 = f5;
		return ans;
	}
	newILine(f0=-1, f1=0,f2=0, f3=0, f4=0):iScoreLine {
		return { f0, f1, f2, f3, f4 };
	}	
}