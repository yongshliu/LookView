/** 
 * utf16转utf8 
 * @param {Object} str 
 */  
function self_utf16to8(str){  
    var out, i, len, c;  
    out = "";  
    len = str.length;  
    for (i = 0; i < len; i++) {  
        c = str.charCodeAt(i);  
        if ((c >= 0x0001) && (c <= 0x007F)) {  
            out += str.charAt(i);  
        }  
        else   
            if (c > 0x07FF) {  
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));  
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));  
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
            }  
            else {  
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));  
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
            }  
    }  
    return out;  
}  
/** 
 * utf8转utf16 
 * @param {Object} str 
 */  
function self_utf8to16(str){  
    var out, i, len, c;  
    var char2, char3;  
    out = "";  
    len = str.length;  
    i = 0;  
    while (i < len) {  
        c = str.charCodeAt(i++);  
        switch (c >> 4) {  
            case 0:  
            case 1:  
            case 2:  
            case 3:  
            case 4:  
            case 5:  
            case 6:  
            case 7:  
                //i0xxxxxxx  
                out += str.charAt(i - 1);  
                break;  
            case 12:  
            case 13:  
                // 110x xxxx 10xx xxxx  
                char2 = str.charCodeAt(i++);  
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));  
                break;  
            case 14:  
                // 1110 xxxx10xx xxxx10xx xxxx  
                char2 = str.charCodeAt(i++);  
                char3 = str.charCodeAt(i++);  
                out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));  
                break;  
        }  
    }  
    return out;  
}  
function self_escape(str){
	if(str == "")return str;
	var utf8 = self_utf16to8(str);
	var ret = utf8.replace(/~/g, "~20");
	ret = ret.replace(/"/g, "~21");
	return ret.replace(/#/g, "~22");
/*	debug("escape");
	print_hex(str);
	var encoded = utf16to8(str);
	//var encoded = base64encode(utf16to8(str));
	print_hex(encoded);
	return encoded;
*/
}
function self_unescape(str){
	if(str == "")return str;
	var ret = str.replace(/~21/g, '"');
	ret = ret.replace(/~20/g, '~');
	return self_utf8to16(ret.replace(/~22/g,'#'));
/*
	debug("unexcape");
	print_hex(str);
	var unicode = utf8to16(str);
	//var unicode = utf8to16(base64decode(str));
	print_hex(unicode);
	return unicode;
*/

}
var func_tbl_escape = ["fun_des", "fun_algorithm", "fun_ret"];
var code_snippet_escape = ["des"];
var func_para_escape = ["des"];
var gv_tbl_escape = ["gv_des"];
var lv_tbl_escape = ["loc_des"];
var mac_tbl_escape = ["mac_des"];
var mod_tbl_escape = ["mod_des"];
var st_tbl_escape = ["strct_des"];
var sym_escape = {
	"sym_ker_fun":func_tbl_escape,
	"sym_ker_code_snippet":code_snippet_escape,
	"sym_ker_func_para":func_para_escape,
	"sym_ker_global_var":gv_tbl_escape,
	"sym_ker_local_var":lv_tbl_escape,
	"sym_ker_macro":mac_tbl_escape,
	"sym_ker_module":mod_tbl_escape,
	"sym_ker_structure":st_tbl_escape	
};
function tbl_escape_obj(tbl, col){
	if( angular.isUndefined(sym_escape[tbl]) ){
		console.log("undefined:"+tbl);
		return;
	}
	for(var i in sym_escape[tbl]){
		if( !angular.isUndefined(col[sym_escape[tbl][i]]) )
			col[sym_escape[tbl][i]] = self_escape(col[sym_escape[tbl][i]]);		
	}
}
function tbl_unescape_obj(tbl, col){ // could be a line. same as tbl_unescape_fields_obj
	if( angular.isUndefined(sym_escape[tbl]) ){
		console.log("undefined:"+tbl);
		return;
	}
	for(var i in sym_escape[tbl]){
		if( !angular.isUndefined(col[sym_escape[tbl][i]]) )
			col[sym_escape[tbl][i]] = self_unescape(col[sym_escape[tbl][i]]);		
	}	
}
function tbl_escape_fields_obj(tbl, fobj){ // could be a row
	if( angular.isUndefined(sym_escape[tbl]) ){
		console.log("undefined:"+tbl);
		return;
	}
	for(var i in sym_escape[tbl]){
		angular.forEach(fobj, function(val, key){
			if(sym_escape[tbl][i] == key ){
				fobj[key] = self_escape(val);
				console.log(key + " is escaped");
			}
		});
	}
		
}
function tbl_unescape_fields_obj(tbl, fobj){ // could be a row
	if( angular.isUndefined(sym_escape[tbl]) ){
		console.log("undefined:"+tbl);
		return;
	}
	for(var i in sym_escape[tbl]){
		angular.forEach(fobj, function(val, key){
			if(sym_escape[tbl][i] == key ){
				fobj[key] = self_unescape(val);
				console.log(key + " is escaped");
			}
		});
	}
}
function tbl_escape_field(tbl, field, val){
	if( angular.isUndefined(sym_escape[tbl]) ){
		console.log("undefined:"+tbl);
		return;
	}
	if( field in sym_escape[tbl] )
		return self_escape(val)
	return val;
}
function tbl_unescape_field(tbl, field, val){
	if( angular.isUndefined(sym_escape[tbl]) ){
		console.log("undefined:"+tbl);
		return;
	}
	if( field in sym_escape[tbl] )
		return self_unescape(val)
	return val;
	
}
function tbl_escape(tbl, colArray){
	if( !angular.isArray(colArray))
		return;
	for(var i in colArray){
		tbl_escape_obj(tbl, colArray[i]);
	}
}

function tbl_unescape(tbl, colArray){
	console.log(colArray);
	if( !angular.isArray(colArray))
		return;
	for(var i in colArray){
		tbl_unescape_obj(tbl, colArray[i]);
	}
}	
function makeRowInfo(listarray){ //{"fields":"yy", "val":zz...}
	var rowInfo = {};
	for( var i in listarray ){
		if( listarray[i].val != "" ){
			rowInfo[listarray[i].fields] = listarray[i].val;
					
		}				
	}			
	return rowInfo;
}
function makeRowInfoCompound(listarray){ // {"xxx":{"yy":"zz", "val":...}};
	var rowInfo = {};
	angular.forEach(listarray, function(val, key){
		if(val.val){
			rowInfo[key] = val.val;
		}
	});
	console.log(rowInfo);				
	return rowInfo;
}

