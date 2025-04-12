//Дэлгэцтэй ажиллах контроллор

var uiController = (function () {

    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"
    }

    return {
        getInput: function () {
            return  {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        getDOMstrings: function () {
            return DOMstrings;
        },

        addListItem: function (item, type) {
            //Орлого зарлагын элементийг агуулсан HTML-г бэлтгэнэ.
            var html;
            var list;

            if( type === "inc"){
                list = ".income__list"
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%%DESCRIPTION%%</div> <div class="right clearfix"> <div class="item__value">+ %%VALUE%%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            } else {
                list = ".expenses__list"
                html = ' <div class="item clearfix" id="expense-%id%"> <div class="item__description">%%DESCRIPTION%%</div> <div class="right clearfix"> <div class="item__value">- %%VALUE%%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }
            //Тэр HTML дотроо орлого зарлагын утгуудыг replace ашиглаж өөрчилж өгнө.

            html = html.replace('%id%', item.id);
            html = html.replace('%%DESCRIPTION%%', item.description);
            html = html.replace('%%VALUE%%', item.value);
            //Бэлтгэсэн HTML-ээ dom-руу хийж өгнө    
            document.querySelector(list).insertAdjacentHTML("beforeend", html)   
         },

         clearField: function () {
            var allfield = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
           
            var allfieldArr = Array.prototype.slice.call(allfield);
            

            // for (var i = 0; i < allfieldArr.length; i++){
            //     allfieldArr[i].value = ""
            // };

            allfieldArr.forEach(function(el){
                el.value="";
            });

            allfieldArr[0].focus();

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

    var calculateTotals = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (el) {
            sum = sum + el.value;
        });

        data.totals[type] = sum;
    }

    var data = {
        allItems : {
            inc : [],
            exp: []
        },
        totals : {
            inc: 0,
            exp: 0
        },

        tusuv: 0,

        huwi:0,

    };

    

    return {
        addItem : function (type, description, value) {

            var item = {};

            var id = 0

            if(data.allItems[type].length === 0) id =1 
            else {
                 //жишээ нь income -ийн хамгийн сүүлийн ЭЛЕМЕНТИЙН id дээр нэгийг нэмээд id үүсгээд байна.
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            
            if( type === "inc") {
                item = new Income (id, description, value);
            } else {
                item = new Expense (id, description, value)
            }

           data.allItems[type].push(item);
           //allItems[type].push(item);
            //санхүүгийн контролорт нэмсэн ч эргээд дэлгэцэндээр гаргах учраас буцаах хэрэгтэй
           return item
        },

        tusuvTootsooloh : function () {

            calculateTotals("inc");
            calculateTotals("exp");

            data.tusuv = data.totals.inc - data.totals.exp;
            data.huwi = Math.round((data.totals.exp / data.totals.inc) * 100)

        },

        tusuvAvah : function () {
            return {
                totalIncome: data.totals.inc,
                tatalExpense: data.totals.exp,
                tusuv: data.tusuv,
                huwi: data.huwi
            }
        }
    }
   

})();


//Холбогч контроллор
var appController = (function (uiController, financeController) {

    

    var ctrlAddItem = function () {
        // Оруулах өгөгдлийг дэлгэцээс олж авна. -  хүмүүс дэлгэцэн дээр юу бичсэнийг олж авахын тулд дэлгэцтэй ажилладаг uiController хийж өгнө гэсэн үг юм.
       var input = uiController.getInput();

       if ( input.description !== "" && input.value !== "") {
         // Олж авсан өгөгдүүдээ санхүүгийн контроллорт дамжуулж, тэнд хадгална.
        // financeController.addItem(input.type, input.description, input.value)

            //
            var item = financeController.addItem(input.type, input.description, input.value)
        

        // Олж авсан өгөгдлүүдээ веб дээрээ тохирох хэсэгт гаргана
        uiController.addListItem(item, input.type);
        uiController.clearField();

        // Төсвийг тооцоолно
        financeController.tusuvTootsooloh();

        financeController.tusuvAvah();
        console.log(financeController.tusuvAvah())
        // Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана

       }

       

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
        });

        console.log("app ajillaa..")

    };

    return {
        init: function () {
            setUpEventListeners();
        } 
    }

 

})(uiController, financeController);

appController.init();

