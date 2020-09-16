export default class Field {
    constructor(rows = 10, cols = 10){
		this.rows = rows;
        this.cols = cols;
        this.cells = []

        this.fill()

        //Сделать пустую клетку
        this.cells[this.cells.length - 1] = {value: -1}
        
        this.leftBoundary = this.createBoundary(0, (i, index, cols) => (i * cols) + index, cols, rows)
        this.rightBoundary = this.createBoundary(cols - 1, (i, index, cols) => (i * cols) + index , cols, rows)
	}


	fill() {
		for (let i = 0; i < this.rows * this.cols; i++){
			this.cells[i] = {value: i + 1}
		}
	}

	findIndex(property, value){
		let result = []
		for (let i = 0; i < this.rows * this.cols; i++){
			if (this.cells[i][property] === value){
				result.push(i)
			}
		}
		if (result.length === 0){
		
			return null
		
		} else if (result.length === 1){
		
			return result[0]
		
		} else {
		
			return result
		}

	}

	//Граничная клетка это клетка с индексами по краям
	createBoundary(index, expression, cols, rows){
		let result = []
		for(let i = 0; i < rows; i++){
			result[i] = expression(i, index, cols)
		}
		return result

	}

	checkBoundary(index, boundary){
		//console.log(boundary)
		return boundary.some(boundaryIndex => boundaryIndex === index)
	}

	checkValue(){

	}


	
	swap(center){
		// Ищем крестом - вот массив, где смотреть соседние клетки
		const array = [ center - this.cols, center + 1, center + this.cols, center - 1 ]
		
		let targetIndex = undefined
		for (let i = 0; i < array.length; i++){
			// Проверка, находится ли элемент на краю,
			// чтобы не переходила в другой край экрана
			// Если у границы поля элемент - пропускаем
			if (this.checkBoundary(center, this.rightBoundary) &&
			    this.checkBoundary(array[i], this.leftBoundary) ||
			    this.checkBoundary(center, this.leftBoundary) &&
			    this.checkBoundary(array[i], this.rightBoundary) ||
			    this.cells[array[i]] === undefined
			    ) {
					continue
			} else {
				//console.log(this.cells[array[i]])
				
				//Если элемент - пустышка, сохраняем индекс
				if(this.cells[array[i]]["value"] === -1){
					//result.push(array[i])
					targetIndex = array[i]					

				}
			}			
		}
		if(targetIndex !== undefined){
			//Меняем местами пустышку и элемент, на который кликнули
			//console.log(targetIndex)
			//console.log(center)
			this.swap2elements(this.cells, center, targetIndex)
		}

	}

	random(min, max){
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	//Рандомное перемешивание, может получиться несобираемая комбинация 15-14
	// shuffle(steps){
	// 	for(let i = 0; i < steps; i++){
	// 		//console.log(this.random(0, (this.rows * this.cols)-1 ))
	// 		this.swap2elements(this.cells, this.random(0, (this.rows * this.cols)-1),
	// 			this.random(0, (this.rows * this.cols)-1))
	// 	}
	// }

	findCross(array, center){
		// Ищем крестом - array массив, где смотреть соседние клетки
		//const array = [ center - this.cols, center + 1, center + this.cols, center - 1 ]
		
		let result = []
		for (let i = 0; i < array.length; i++){
			// Проверка, находится ли элемент на краю,
			// чтобы не переходила в другой край экрана
			// Если у границы поля элемент - пропускаем
			if (this.checkBoundary(center, this.rightBoundary) &&
			    this.checkBoundary(array[i], this.leftBoundary) ||
			    this.checkBoundary(center, this.leftBoundary) &&
			    this.checkBoundary(array[i], this.rightBoundary) ||
			    this.cells[array[i]] === undefined
			    ) {
					continue
			} else {
				result.push(array[i])
			}
		}
		return result
	}

	// Перемешиваем просто рандомно двигая пятнашку в пустышку как человек
	//Находим пустышку, потом соседние клетки, потом рандомно выбираем 
	// соседнюю пятнашку от пустышки, и сдвигаем.
	shuffle(steps){

		for(let s = 0; s < steps; s++){
			let i = this.findIndex("value", -1)
			let indices = this.findCross([ i - this.cols, i + 1, i + this.cols, i - 1 ], i)
			let direction = indices[Math.floor(Math.random() * indices.length)]
			this.swap(direction)
		}
	}

	swap2elements(array, index1, index2){
		let temp = array[index1]
		array[index1] = array[index2]
		array[index2] = temp
	}


	snapshot(array) {

		this.cells = array
		
	}




}

