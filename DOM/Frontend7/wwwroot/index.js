$(window).load(function () {
    const list = $('.list');
    const firstElement = $('.item');
    const result = $('.result');
    const tempLine = firstElement.clone();
    //console.log(list.children().first().children().eq(2));
    $('.list .item')
    $('.up-button').on('click', RaiseElement);
    $('.down-button').on('click', DropElement);
    $('.delete-button').on('click', DeleteElement);
    $('.add-button').on('click', CreateElement);
    $('.save-button').on('click', SaveElement);

    function RaiseElement(event) {
        if (list.children().first() != $(event.target).parent()) {
            $(event.target).parent().after($(event.target).parent().prev());
        }
    }

    function DropElement(event) {
        if (list.children().last() != $(event.target).parent()) {
            // event.target.parentNode.insertBefore(event.target.parentNode, event.target.parentNode.nextElementSibling);
            $(event.target).parent().next().after($(event.target).parent());
        }
    }

    function DeleteElement(event) {
        $(event.target).parent().remove();
    }

    function CreateElement() {
        var newElement = tempLine.clone();
        list.append(newElement);

        newElement.children().eq(2).on('click', RaiseElement);
        newElement.children().eq(3).on('click', DropElement);
        newElement.children().eq(4).on('click', DeleteElement);
    }

    function SaveElement() {
        // result.innerHTML = JSON.stringify({ list })
        //console.log(firstElement);
        //console.log(firstElement.children[0].value);
      
        let listChildren = list.children();
        let input = {};
        
        for (var i = 0; i < listChildren.length; i++) {
           // console.log(listChildren.eq(i).children().eq(0).val()); 
            input[listChildren.eq(i).children().eq(0).val()] = listChildren.eq(i).children().eq(1).val();
        }
        result.html(JSON.stringify(input));
    }
});