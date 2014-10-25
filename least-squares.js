//k, N
//


function executeMNK(exerciseNumber) {
	var exOne, exTwo;
	switch(exerciseNumber) {
		case 1:
			exOne = exerciseOne();
		break;
		case 2:
			exTwo = exerciseTwo();
		break;
	}
	
	console.log(exOne);
}

function exerciseOne() {
	var outputValues = [[], []], y, e = 2.71828;
	//poluchaem x znachenija i y znachenija
	//kak ja ponjal posle formuli, sto vse x berutsja v intervale ot -2 do 2 s shagom 0.5
	//posle togo kak poluchili vse znachenija vozvrashaem masiv
	xValues = range(-2, 2, 0.5);
	for(item in xValues) {
		y = Math.round((Math.sin(5 * xValues[item]) * (e ^ xValues[item])) * 1000) / 1000;
		outputValues[0][item] = xValues[item];
		outputValues[1][item] = y;
	}
	return outputValues;
}

function exerciseTwo() {
	var table = [[],[]];
	
	//x values
	table[0][0] = -3.2;
	table[0][1] = -2.1;
	table[0][2] = -0.4;
	table[0][3] = 0.7;
	table[0][4] = 2;
	table[0][5] = 2.5;
	table[0][6] = 2.777;
	
	//y values
	table[1][0] = 10;
	table[1][1] = -2;
	table[1][2] = 0;
	table[1][3] = -7;
	table[1][4] = 7;
	table[1][5] = 0;
	table[1][6] = 0;
	
	return table;
}

function range(start, stop, step) {
	var n = start, outputRange = [], i = 1;
	outputRange[0] = start;
	
	while(n < stop) {
		//etot if postavil dlja togo stobi izbavitsja ot dvuh lishnih znachenij, tak kak nam
		// nado tolko 7 znahcenij, verno?
		n += step;
		if(Math.abs(n) != 1.5) {
			outputRange[i] = n;
			i++;
		}
	}
	return outputRange;
}

executeMNK(1);