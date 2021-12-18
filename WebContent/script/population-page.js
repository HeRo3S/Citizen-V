var checkbox = document.getElementsByClassName("checkbox-form");

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].children[1].onclick = function(){
        checkbox[i].children[0].click();
    }
}