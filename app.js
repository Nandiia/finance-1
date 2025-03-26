//Дэлгэцтэй ажиллах контроллор

var uiController = (function () {

})();

//Санхүүтэй ажиллах контроллор
var financeController = (function () {

})();


//Холбогч контроллор
var appController = (function (uiController, financeController) {

    var ctrlAddItem = function () {
        // Оруулах өгөгдлийг дэлгэцээс олж авна.
        console.log("дэлэгцээс өгөгдөл авлаа")
        // Олж авсан өгөгдүүдээ санхүүгийн контроллорт дамжуулж, тэнд хадгална.
        // Олж авсан өгөгдлүүдээ веб дээрээ тохирох хэсэгт гаргана
        // Төсвийг тооцоолно
        // Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана

    };

    document.querySelector(".add__btn").addEventListener("click" , function () {
        ctrlAddItem();
    });

    document.addEventListener("keypress" , function (event) {
       if (event.keyCode === 13 || event.which === 13){
        ctrlAddItem();

       } 
    })

})(uiController, financeController);