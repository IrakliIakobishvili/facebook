let dropDown = (item,list,className,icon,iconClass) => {
    let $li = document.getElementById(item);
    let $ul = document.getElementById(list);
    let $icon = document.getElementById(icon);
    $li.addEventListener("click",function(e) {
        e.stopPropagation();
        $icon.classList.toggle(iconClass);
        $ul.classList.toggle(className);
    });
    $ul.addEventListener("click",function(e){
        e.stopPropagation();
    })
    document.addEventListener("click",function(e){
        $ul.classList.remove(className);
        $icon.classList.remove(iconClass);
    })
}
dropDown("header-nav-dropdown-item","header-nav-dropdown-list","show","fa-caret-down","white");