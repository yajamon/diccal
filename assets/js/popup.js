window.onload = function () {
    var template = Diccal.templates.popup.message;
    var param = {
        value: "hello world!!"
    };
    var html = template(param);
    console.log(html);
    document.body.innerHTML = html;
}
