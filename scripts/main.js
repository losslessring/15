//Разобраться с импортом, чтобы не возникало CORS ошибок

// Поскольку бесконечный игровой цикл не нужен, можно сделать шаг цикла на событие
// клика по элементу. Сделать проверку, можно ли переместить пятнашку,
// и сделать пересчет массива.




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


document.onkeydown = function(e){
        
    if (e.repeat) { return }
        
        switch(e.keyCode){
        	
        	case 37:                
                
                let index_minus = field.findIndex("value", -1) - 1
                
            	if (index_minus >= 0){
        	    	field.swap(index_minus)
                	displayUpdate()
            	}
            	break
            case 38:
        	    
            	let index_down = field.findIndex("value", -1) - cols
            	
            	if (index_down >= 0){
        	    	field.swap(index_down)
                	displayUpdate()
            	}
            	break

            case 39:
            	
                let index_plus = field.findIndex("value", -1) + 1
                
            	if (index_plus < field.cells.length){
        	    	field.swap(index_plus)
                	displayUpdate()
            	}
            	break
            case 40:
            	
            	let index_up = field.findIndex("value", -1) + cols
            	
            	if (index_up < field.cells.length){
        	    	field.swap(index_up)
                	displayUpdate()
            	}
            	break
        }
}