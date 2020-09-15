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
				console.log(this.cells[array[i]])
				
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

	swap2elements(array, index1, index2){
		let temp = array[index1]
		array[index1] = array[index2]
		array[index2] = temp
	}


	snapshot(array) {

		this.cells = array
		
	}




}

