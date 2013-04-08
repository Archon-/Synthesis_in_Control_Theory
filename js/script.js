function dec2bin(dec)
{
	var bin = 0,
		stringDiff = 0,
		i = 0,
		modifiedString = "";
	
    if(dec > 0) {
    	bin = dec.toString(2);
    	stringDiff = 7-bin.length;
    	if(stringDiff > 0){
    		for(i = 0; i < stringDiff; i++)
    			modifiedString = modifiedString+"0";
    	}
    	return modifiedString + bin;
    }else if(dec == 0){
    	return "0000000";
    }
}

function not(arg){
	if(arg == 0)
		return 1;
	else if(arg == 1)
		return 0;
	else
		return -1;
}

function imp(a, b){
	return !a | b;
}

Array.prototype.pushUnique = function(newElement){
	for(var i = 0; i < this.length; i++){
		if(this[i] == newElement)
			return true;
	}
	this.push(newElement);
}

function Su(arr1, arr2){
	var occurence = false,
		newArr = [];
	
	for(var i = 0; i < arr1.length; i++){
		occurence = false;
		for(var j = 0; j < arr2.length; j++){
			if(arr1[i] == arr2[j]){
				occurence = true;
				//break;
			}
		}
		if(!occurence)
			newArr.push(arr1[i]);
	}
	
	return newArr;
}

function count(){
	var i = 0,
		j = 0,
		no = [],
		//a1 = 0, a2 = 0, a3 = 0, a4 = 0, a5 = 0, a6 = 0, a7 = 0,
		//F1 = 0, F2 = 0, F3 = 0, F4 = 0, F5 = 0,
		//F = 0;
		F11c = [], F12c = [],
		F21c = [], F22c = [],
		F31c = [], F32c = [],
		F41c = [], F42c = [];
		
	document.write('<pre>');
	document.write('                             a)      b)     c)     d)<br/>');
	document.write('<span style="font-size:9px">   a: a<sub>1</sub>a<sub>2</sub>a<sub>3</sub>a<sub>4</sub>a<sub>5</sub>a<sub>6</sub>a<sub>7</sub> </span><span style="font-size:13px">F<sub>1</sub>F<sub>2</sub>F<sub>3</sub>F<sub>4</sub>F<sub>5</sub> F</span> <span style="font-size:9px"> F<sub>y</sub> F^F F^¬F  F<sub>y</sub> F^F F^¬F  F<sub>y</sub> F^F F^¬F  F<sub>y</sub> F^F F^¬F</span><br/>');
	for(i=0; i<128; i++){
		no.push(dec2bin(i));
		var a = no[i][1] & no[i][2],
			itterator = 0,
			Uc = 0,
		a1 = no[i][0], a2 = no[i][1], a3 = no[i][2], a4 = no[i][3], a5 = no[i][4], a6 = no[i][5], a7 = no[i][6], 
		
		F1 = a1 & (a4 | not(a7)),
		F2 = imp((a2 & a4), a7),
		F3 = not(a4) | not(a3) | a5,
		F4 = a4 & (a3 | not(a6)),
		F5 = imp((a4 & not(a2)), a6),
		F = F1 & F2 & F3 & F4 & F5,
		
		Fy1 = a6,
		F1su1 = F & Fy1,
		F1su2 = F & not(Fy1),
		
		Fy2 = a7,
		F2su1 = F & Fy2,
		F2su2 = F & not(Fy2),
		
		Fy3 = a6 | a7,
		F3su1 = F & Fy3,
		F3su2 = F & not(Fy3),
		
		Fy4 = a6 & a7,
		F4su1 = F & Fy4,
		F4su2 = F & not(Fy4);
		
		if(i<10)
			itterator = "  "+i;
		else if(i<100)
			itterator = " "+i;
		else
			itterator = i;
		//console.log("no "+i+".."+no[i]+" "+no[i][1]+" "+a);
		//console.log("no "+i+" "+no[i]+" F1="+F1+" F2="+F2+" F3="+F3+" F4="+F4+" F5="+F5+" F="+F);	
		document.write(itterator+" "+no[i]+" "+F1+" "+F2+" "+F3+" "+F4+" "+F5+" "+F+" | "+Fy1+" "+F1su1+" "+F1su2+" | "+Fy2+" "+F2su1+" "+F2su2+" | "+Fy3+" "+F3su1+" "+F3su2+" | "+Fy4+" "+F4su1+" "+F4su2+"<br/>");	
		
		Uc = a1+a2;
		
		if(F1su1 == 1)
			F11c.pushUnique(Uc);		
		if(F1su2 == 1)
			F12c.pushUnique(Uc);
		if(F2su1 == 1)
			F21c.pushUnique(Uc);
		if(F2su2 == 1)
			F22c.pushUnique(Uc);
		if(F3su1 == 1)
			F31c.pushUnique(Uc);
		if(F3su2 == 1)
			F32c.pushUnique(Uc);
		if(F4su1 == 1)
			F41c.pushUnique(Uc);
		if(F4su2 == 1)
			F42c.pushUnique(Uc);
	}
	// a)
	document.write('<br/>a)<br/>S<sub>u1</sub> = {');
	for(var i = 0; i < F11c.length; i++)
		document.write("("+F11c[i][0]+","+F11c[i][1]+")");
	document.write("}<br/>");
	
	document.write('S<sub>u2</sub> = {');
	for(var i = 0; i < F12c.length; i++)
		document.write("("+F12c[i][0]+","+F12c[i][1]+")");
	document.write("}<br/>");
	console.log("SU2: "+F12c);
	
	document.write('S<sub>u</sub> = {');
	var S1u = Su(F11c, F12c);
	for(var i = 0; i < S1u.length; i++)
		document.write("("+S1u[i][0]+","+S1u[i][1]+")");
	document.write("}<br/>F<sub>u</sub>(&#945;<sub>u</sub>) = {");
	for(var i = 0; i < S1u.length; i++){
		document.write('(');
		if(S1u[i][0] == 0)
			document.write('¬');
		document.write("&#945;<sub>1</sub> ^ ");
		if(S1u[i][1] == 0)
			document.write('¬');
		document.write('&#945;<sub>2</sub>)');
		if(i != S1u.length-1)
			document.write(' v ');
	}
	document.write("}<br/>");

	// b)
	document.write('<br/>b)<br/>S<sub>u1</sub> = {');
	for(var i = 0; i < F21c.length; i++)
		document.write("("+F21c[i][0]+","+F21c[i][1]+")");
	document.write("}<br/>");
	
	document.write('S<sub>u2</sub> = {');
	for(var i = 0; i < F22c.length; i++)
		document.write("("+F22c[i][0]+","+F22c[i][1]+")");
	document.write("}<br/>");
	
	document.write('S<sub>u</sub> = {');
	var S2u = Su(F21c, F22c);
	for(var i = 0; i < S2u.length; i++)
		document.write("("+S2u[i][0]+","+S2u[i][1]+")");
	document.write("}<br/>F<sub>u</sub>(&#945;<sub>u</sub>) = {");
	for(var i = 0; i < S1u.length; i++){
		document.write('(');
		if(S2u[i][0] == 0)
			document.write('¬');
		document.write("&#945;<sub>1</sub> ^ ");
		if(S2u[i][1] == 0)
			document.write('¬');
		document.write('&#945;<sub>2</sub>)');
		if(i != S2u.length-1)
			document.write(' v ');
	}
	document.write("}<br/>");
	
	// c)
	document.write('<br/>c)<br/>S<sub>u1</sub> = {');
	for(var i = 0; i < F31c.length; i++)
		document.write("("+F31c[i][0]+","+F31c[i][1]+")");
	document.write("}<br/>");
	
	document.write('S<sub>u2</sub> = {');
	for(var i = 0; i < F32c.length; i++)
		document.write("("+F32c[i][0]+","+F32c[i][1]+")");
	document.write("}<br/>");
	
	document.write('S<sub>u</sub> = {');
	var S3u = Su(F31c, F32c);
	for(var i = 0; i < S3u.length; i++)
		document.write("("+S3u[i][0]+","+S3u[i][1]+")");
	document.write("}<br/>F<sub>u</sub>(&#945;<sub>u</sub>) = {");
	for(var i = 0; i < S3u.length; i++){
		document.write('(');
		if(S3u[i][0] == 0)
			document.write('¬');
		document.write("&#945;<sub>1</sub> ^ ");
		if(S3u[i][1] == 0)
			document.write('¬');
		document.write('&#945;<sub>2</sub>)');
		if(i != S3u.length-1)
			document.write(' v ');
	}
	document.write("}<br/>");
	
	// d)
	document.write('<br/>d)<br/>S<sub>u1</sub> = {');
	for(var i = 0; i < F41c.length; i++)
		document.write("("+F41c[i][0]+","+F41c[i][1]+")");
	document.write("}<br/>");
	
	document.write('S<sub>u2</sub> = {');
	for(var i = 0; i < F42c.length; i++)
		document.write("("+F42c[i][0]+","+F42c[i][1]+")");
	document.write("}<br/>");
	
	document.write('S<sub>u</sub> = {');
	var S4u = Su(F41c, F42c);
	for(var i = 0; i < S4u.length; i++)
		document.write("("+S4u[i][0]+","+S4u[i][1]+")");
	document.write("}<br/>F<sub>u</sub>(&#945;<sub>u</sub>) = {");
	for(var i = 0; i < S4u.length; i++){
		document.write('(');
		if(S4u[i][0] == 0)
			document.write('¬');
		document.write("&#945;<sub>1</sub> ^ ");
		if(S4u[i][1] == 0)
			document.write('¬');
		document.write('&#945;<sub>2</sub>)');
		if(i != S4u.length-1)
			document.write(' v ');
	}
	document.write("}<br/>");
	
	document.write('</pre>');
	console.log(F31c);
	console.log("XXX: "+no+" "+no[0] & no[1]);	
}

count();
/*
	var nno = [];
	for(var k=0; k<5; k++){
		nno.push(dec2bin(k));
	}
	var a;
	console.log(nno+" "+nno[1]);
	
	for(var m=0; m<5; m++){
		for(var n=0; n<5; n++)
			console.log(nno[m][n]);	
	}
*/

//var a = 1, b =2;
//console.log(nno[a][3]);
