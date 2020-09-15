//Разобраться с импортом, чтобы не возникало CORS ошибок

// Поскольку бесконечный игровой цикл не нужен, можно сделать шаг цикла на событие
// клика по элементу. Сделать проверку, можно ли переместить пятнашку,
// и сделать пересчет массива.


import Field from './field.js'

import DisplayField from './displayfield.js'


const rows = 4
const cols = 4

let field = new Field(rows, cols)
console.log(field)

let display_field = new DisplayField(document.getElementById("container"), 
	field.rows, field.cols, 'cell')

const displayUpdate = function() {
	display_field.colorize(field.cells, "deepSkyBlue")
	display_field.update(field.cells, "value", -1,"black")
	display_field.showValue(field.cells, "value")
}

displayUpdate()





document.querySelectorAll('.cell').forEach( (element) =>{
	element.addEventListener('click', function(){
		//console.log(parseInt(this.innerText ))
		let i = field.findIndex('value', parseInt(this.innerText))
		field.swap([ i-cols, i+1, i+cols, i-1 ], i)

		displayUpdate()

	})
})
