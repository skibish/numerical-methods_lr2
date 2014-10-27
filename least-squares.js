var K = 6, N = 7, exerciseNumber = 2, exercise, fx = createMultiArray(), b = createEmptyArray();

function executeMNK() {
	switch(exerciseNumber) {
		case 1:
			exercise = exerciseOne();
		break;
		case 2:
			exercise = exerciseTwo();
		break;
	}
	
	var result = mnk();
	outputResult(result);
}

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

function filledMatrix(values) {
	for(var i = 0; i < K; i++) {
		for(var j = 0; j < K; j++) {
			fx[i][j] = 0;
			for(var k = 0; k < N; k++) {
				fx[i][j] += Math.pow(values[0][k], (i+j));
			}
		}
	}
	
	for(var i = 0; i < K; i++) {
		for(var j = 0; j < N; j++) {
			b[i] += (Math.pow(values[0][j], i) * values[1][j]);
		}
	}
	return [fx, b];
}

function mainGaussWithZeros(matrixes) {
	for (var i = 0; i < K; i++) {
		for (var j = i + 1; j < K; j++) {
			var temp3 = -matrixes[0][j][i] / matrixes[0][i][i];
			for (var k = i; k < K; k++) {
				matrixes[0][j][k] = matrixes[0][j][k] + temp3 * matrixes[0][i][k];
			}
			matrixes[1][j] = matrixes[1][j] + temp3 * matrixes[1][i];
		}
	}
	return matrixes;
}

function reverseGauss(matrixes) {
	var a = createEmptyArray();
	for(var i = K - 1; i >= 0; i--){
		var sum = 0;
		for(var j = i; j < K; j++){
			sum += matrixes[0][i][j] * a[j];
		}
		a[i] = (matrixes[1][i] - sum) / matrixes[0][i][i];
	}
	return [matrixes, a];
}

function mnk() {
	var matrixes = filledMatrix(exercise);
	matrixes = mainGaussWithZeros(matrixes);
	matrixes = reverseGauss(matrixes);
	
	return matrixes;
}

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

function createMultiArray() {
	var matrix = [];
	for(var i = 0; i < K; i++) {
		matrix.push([]);
	}
	return matrix;
}

function createEmptyArray() {
	var matrix = [];
	for(var i = 0; i < K; i++) {
		matrix[i] = 0;
	}
	return matrix;
}

function outputResult(result) {
	var html = '								\
		<style type="text/css"> 				\
			table {								\
				width: 500px;					\
				border: 1px solid green;		\
			}									\
			td {								\
				border: 1px solid green; 		\
				width: 20px;					\
				padding: 5px;					\
			}									\
			h3, p {								\
				padding: 0;						\
				margin: 0;						\
			}									\
			span.superscript {					\
				vertical-align: super;			\
			}									\
		</style>								\
												\
		<h3>System at a given order:</h3>		\
		<table cellspacing="0" cellpadding="0"> \
	';
	
	for(var i = 0; i < K; i++) {
		html += '<tr>';
		for(var j = 0; j < K; j++) {
			html += '<td>' + result[0][0][i][j] + '</td>';
		}
		html += '<td style="background-color: red;">' + result[0][1][i] + '</td>';
		html += '</tr>';
	}
	
	html += '										\
		</table>									\
		<br />										\
		<h3>Coefficients <i>a</i></h3>\
		<table cellspacing="0" cellpadding="0">		\
		<tr>										\
	';
	
	for(var u = 0; u < K; u++) {
		html += '<td>' + result[1][u] + '</td>';
	}
	html += '										\
		</tr>										\
		</table>									\
		<br />										\
		<h3>X and Y values</h3>						\
		<table cellspacing="0" cellpadding="0">		\
	';
	for(var y = 0; y < 2; y++) {
		html += '<tr><td>' + (y == 0 ? 'X' : 'Y') + '</td>';
		for(var t = 0; t < N; t++) {
			html += '<td>' + exercise[y][t] + '</td>';
		}
		html += '</tr>';
	}
	html += '							\
		</table>						\
		<br />							\
		<h3>Approximation order</h3>	\
	';
	
	var val = '';
	for(var x = 0; x < K; x++) {
		if(x == 0) {
			val += result[1][x];
		} else if(x == 1) {
			val += (result[1][x] > 0 ? ' + ' : ' ') + result[1][x] + 'x ';
		} else {
			val += (result[1][x] > 0 ? ' + ' : ' ') + result[1][x] + 'x<span class="superscript">' + x + '</span> ';
		}
	}
	html += '<p>' + val + '</p>';
	document.getElementById('result').innerHTML = html;
}

executeMNK();