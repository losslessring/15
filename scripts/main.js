//Разобраться с импортом, чтобы не возникало CORS ошибок

// Поскольку бесконечный игровой цикл не нужен, можно сделать шаг цикла на событие
// клика по элементу. Сделать проверку, можно ли переместить пятнашку,
// и сделать пересчет массива.


import Field from './field.js'

import DisplayField from './displayfield.js'


const rows = 4
const cols = 4

let field = new Field(rows, cols)


let display_field = new DisplayField(document.getElementById("container"), 
	field.rows, field.cols, 'cell')


const displayUpdate = function() {

	display_field.colorize(field.cells, "backgroundColor", "#32526d")
	display_field.colorize(field.cells, "color", "#a8b1bb")
	

	display_field.updateCssProperty(field.cells, "value", -1,"backgroundColor","#2f2f2f")
	display_field.updateCssProperty(field.cells, "value", -1,"color","#2f2f2f")
	display_field.showValue(field.cells, "value")
}


field.shuffle(rows * cols * 100)

displayUpdate()





document.querySelectorAll('.cell').forEach( (element) =>{
	element.addEventListener('click', function(){
		
		let i = field.findIndex('value', parseInt(this.innerText))
		field.swap(i)

		displayUpdate()

	})
})
