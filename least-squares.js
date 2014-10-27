var exercise, matrixes;

/**
* osnovnaja funkcija, kotoraja vozvrashaet polinom
*/
function getPolinom(exerciseNumber, K, N) {
	switch(exerciseNumber) {
		case 1:
			exercise = exerciseOne();
		break;
		case 2:
			exercise = exerciseTwo();
		break;
	}
	return mnk(K, N);
}

/**
* zadanie odin iz laboratorki
*/
function exerciseOne() {
	var outputValues = [[], []], y, e = 2.71828;
	//poluchaem x znachenija i y znachenija
	//kak ja ponjal posle formuli, sto vse x berutsja v intervale ot -2 do 2 s shagom 0.5
	//posle togo kak poluchili vse znachenija vozvrashaem masiv
	xValues = range(-2, 2, 0.5);
	for(item in xValues) {
		y = Math.round((Math.sin(5 * xValues[item]) * Math.pow(e, xValues[item])) * 1000) / 1000;
		outputValues[0][item] = xValues[item];
		outputValues[1][item] = y;
	}
	return outputValues;
}

/**
* zadanie dva iz laboratorki
*/
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

/**
* funckija dlja togo stobi vivesti
* kakuenibudj oblastj
*/
function range(start, stop, step) {
	var n = start, outputRange = [], i = 1;
	outputRange[0] = start;

	while(n < stop) {
		n += step;
		outputRange[i] = n;
		i++;
	}
	return outputRange;
}

/**
* toze samaja funkcija sto i createEmptyArray(), no tolko dlja
* dvuh mernogo masiva i bez 0
*/
function createMultiArray(K) {
	var matrix = [];
	for(var i = 0; i < K + 1; i++) {
		matrix.push([]);
	}
	return matrix;
}

/**
* sozdaet pustoi massiv s 0, nuzna dlja togo stobi v javascripte
* nebilo oshibok s massivami
*/
function createEmptyArray(K) {
	var matrix = [];
	for(var i = 0; i < K + 1; i++) {
		matrix[i] = 0;
	}
	return matrix;
}

/**
* funkcija postroenija matrici najmenshih kvadratov
*/
function mnkMatrix(values, K, N) {
	var fx = createMultiArray(K), b = createEmptyArray(K);

	for(var i = 0; i < K + 1; i++) {
		for(var j = 0; j < K + 1; j++) {
			fx[i][j] = 0;
			for(var k = 0; k < N; k++) {
				fx[i][j] += Math.pow(values[0][k], (i+j));
			}
		}
	}

	for(var i = 0; i < K + 1; i++) {
		for(var j = 0; j < N; j++) {
			b[i] += (Math.pow(values[0][j], i) * values[1][j]);
		}
	}
	return [fx, b];
}

/**
* funkcija prjamogo hoda gausa + srazu zhe zapolnjaet matricu nuljami stobi
* sozdatj trehugolnuju matricu
*/
function mainGaussWithZeros(mnkMatrixValues, K) {
	for (var i = 0; i < K + 1; i++) {
		for (var j = i + 1; j < K + 1; j++) {
			var temp3 = -mnkMatrixValues[0][j][i] / mnkMatrixValues[0][i][i];
			for (var k = i; k < K; k++) {
				mnkMatrixValues[0][j][k] = mnkMatrixValues[0][j][k] + temp3 * mnkMatrixValues[0][i][k];
			}
			mnkMatrixValues[1][j] = mnkMatrixValues[1][j] + temp3 * mnkMatrixValues[1][i];
		}
	}
	return mnkMatrixValues;
}

/**
* obratnij hod gausa, dostaem polinomi i vozvrashaem rezultat
*/
function reverseGauss(mnkMatrixValues, K) {
	var polinoms = createEmptyArray(K);
	for(var i = (K - 1) + 1; i >= 0; i--){
		var sum = 0;
		for(var j = i; j < K + 1; j++){
			sum += mnkMatrixValues[0][i][j] * polinoms[j];
		}

		polinoms[i] = (mnkMatrixValues[1][i] - sum) / mnkMatrixValues[0][i][i];
	}
	return polinoms;
}

/**
* funkcija, kotoraja snachalo sostavljaet matricu najmenshih kvadratov
* potom metodom iskljuchenija gausa nahodit polinomi
*
*/
function mnk(K, N) {
	matrixes = mnkMatrix(exercise, K, N);
	matrixes = mainGaussWithZeros(matrixes, K);

	var polinoms = reverseGauss(matrixes, K);

	return polinoms;
}

/**
* vivod rezultata
*/
function outputResult(polinoms, K, N) {
	var html = '<table class="table table-striped table-bordered">';

	for(var i = 0; i < K + 1; i++) {
		html += '<tr>';
		for(var j = 0; j < K + 1; j++) {
			html += '<td>' + matrixes[0][i][j] + '</td>';
		}
		html += '<td class="danger">' + matrixes[1][i] + '</td>';
		html += '</tr>';
	}

	html += '										\
		</table>									\
		<br />										\
		<h1>Coefficients <i>a</i></h1>\
		<table class="table table-striped table-bordered">		\
		<tr>										\
	';

	for(var u = 0; u < K + 1; u++) {
		html += '<td>' + polinoms[u] + '</td>';
	}
	html += '										\
		</tr>										\
		</table>									\
		<br />										\
		<h1>Y values at a given X value</h1>						\
		<table class="table table-striped table-bordered">		\
	';
	var pointY = [];
	for(var xx = 0; xx < exercise[0].length; xx++) {
		pointY[xx] = getYpoint(result, xx);
	}
	for(var o = 0; o < 2; o++) {
		html += '<tr><td>' + (o == 0 ? 'X' : 'Y') + '</td>';
		for(var t = 0; t < exercise[0].length; t++) {
			if(o == 0) {
				html += '<td>' + exercise[0][t] + '</td>';
			} else {
				html += '<td>' + pointY[t] + '</td>';
			}
		}
		html += '</tr>';
	}
	html += '							\
		</table>						\
		<br />							\
		<h1>Approximation order</h1>	\
	';

	var val = '';
	for(var x = 0; x < K + 1; x++) {
		if(x == 0) {
			val += polinoms[x];
		} else if(x == 1) {
			val += (polinoms[x] > 0 ? ' + ' : ' ') + polinoms[x] + 'x ';
		} else {
			val += (polinoms[x] > 0 ? ' + ' : ' ') + polinoms[x] + 'x<span class="superscript">' + x + '</span> ';
		}
	}
	html += '<h3>' + val + '</h3>';
	document.getElementById('mnk').innerHTML = html;
}

/**
* funkcija dostajuschaja Y tochku v zadanoi tochke X (prisudstvuet polinom)
*/
function getYpoint(polinom, X) {
	var y = 0;

	for(var i = 0; i < polinom.length; i++) {
		if(i == 0) {
			y += polinom[i];
		} else if(i == 1) {
			y += polinom[i] * X;
		} else {
			y += polinom[i] * Math.pow(X, i);
		}
	}
	return y;
}

var result = getPolinom(2, 4, 7);
outputResult(result, 4, 7);
