class Menu {
    // Atribuindo o constructor e passando como parametros as class do menu
    constructor(menu, nav, links) {
        this.menu = document.querySelector(menu);
        this.nav = document.querySelector(nav);
        this.links = document.querySelectorAll(links);
        this.active = 'active';
    }
    // Um metodo que verifica se existe uma animation no elemento e caso exista, ele remove, caso não exista, ele adiciona
    animationLinks() {
        this.links.forEach((link, index) => {
            link.style.animation
            ? (link.style.animation = '')
            : (link.style.animation = `animation_links 0.5s ease forwards ${index / 7 + 0.3 }s`) 
        })
    }
    // Aqui ele está adicionando o evento de click no menu sanduiche 
    addClickEvent() {
        this.menu.addEventListener('click', () => {
            this.nav.classList.toggle(this.active);
            this.animationLinks();
        })
    }
    // Aqui estou iniciando o metodo para adicionar o evento click
    init() {
        this.addClickEvent();
    }
}

// Instanciando a class menu e passando os parametros pedidos
const menu = new Menu(
    '.bar',
    '.nav',
    '.nav li'
);

menu.init();