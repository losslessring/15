

class DisplayField {

    constructor (container, rows, cols, class_name) {
        
        //Generate grid field based on rows and columns
        container.style.setProperty('--grid-rows', rows)
        container.style.setProperty('--grid-cols', cols)
        //container.style.setProperty('width', cols)
        //container.style.setProperty('height', cols)

        for (let c = 0; c < (rows * cols); c++) {
            let cell = document.createElement("div");
             //Текст внутри клетки               
              //cell.innerText = (c);
            container.appendChild(cell).className = class_name;
        }
        
        this.cells = document.getElementsByClassName('cell')

    }

    checkArraySize(array1, array2){
        if (array1.length === array2.length){
            return true
        } else {
            return false
        }
    }
    
    colorize(array, cssProperty, cssValue){
        //console.log(array)
        if (array.length == this.cells.length){

            for (let i = 0; i < array.length; i++) {                
                this.cells[i].style[cssProperty] = cssValue
            }
        }
    }

    showValue(array, property){
        if(array.length == this.cells.length){
            for (let i = 0; i < array.length; i++) {
                this.cells[i].innerText = array[i][property]
            }
        }
    }

    // Update colors based on array values    
    updateCssProperty(array, property, value, cssProperty, cssValue){
        
        if (array.length == this.cells.length){
            for (let i = 0; i < array.length; i++) {
                
                
                if(array[i][property] === value){
                
                    this.cells[i].style[cssProperty] = cssValue
                
                }                                
            }
        }
    }


}

