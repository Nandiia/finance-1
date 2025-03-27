//Дэлгэцтэй ажиллах контроллор

var uiController = (function () {

    var DOMstrings = {
        iputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"
    }

    return {
        getInput: function () {
            return  {
                type: document.querySelector(DOMstrings.iputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    } ;
    
   

})();

//Санхүүтэй ажиллах контроллор
var financeController = (function () {

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value
    };

    var data = {
        allItems : {
            inc : [],
            exp: []
        },
        totals : {
            inc: 0,
            exp: 0
        }

    };
   

})();


//Холбогч контроллор
var appController = (function (uiController, financeController) {

    

    var ctrlAddItem = function () {
        // Оруулах өгөгдлийг дэлгэцээс олж авна. -  хүмүүс дэлгэцэн дээр юу бичсэнийг олж авахын тулд дэлгэцтэй ажилладаг uiController хийж өгнө гэсэн үг юм.
       console.log(uiController.getInput());
        // Олж авсан өгөгдүүдээ санхүүгийн контроллорт дамжуулж, тэнд хадгална.
        // Олж авсан өгөгдлүүдээ веб дээрээ тохирох хэсэгт гаргана
        // Төсвийг тооцоолно
        // Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана

    };

    var setUpEventListeners = function () {

        var DOMstrings = uiController.getDOMstrings()

        document.querySelector(DOMstrings.addBtn).addEventListener("click" , function () {
            ctrlAddItem();
        });
    
        document.addEventListener("keypress" , function (event) {
           if (event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
    
           } 
        })

    };

    return {
        init: setUpEventListeners()
    }

 

})(uiController, financeController);

appController.init;