if (document.readyState == 'loading') { 
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready() //au chargement on lance la fonction ready()
}

function ready() { 
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    } //pour cibler tout les boutons avec une boucle avec un evenement "supprimer" au clique !

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    } //pour cibler les inputs avec une boucle (la quatitée) avec un evenement "change" !

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    } //pour cibler les boutons "ajout au panier" avec une boucle avec un evenement "ajouter" au clique ! (bouton existante sur html)

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    //pour valider nos articles au clique ca actualise de zero (btn-purchase = valider notre panier) (bouton existante sur html)
}

function purchaseClicked() {
    alert('Merci pour vos achats, à bientot !')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
} //si le parent (hasChildNodes) est true tu enleve l'enfant (removeChild) = en gros valider le panier avec les articles selectionnés puis le refresh

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
} //supprime le parent de l'article dans notre panier au clique du bouton "remove" (supprimer)

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1 //minimum 1 arcticle
    }
    updateCartTotal()
} //pour changer la quantitée des articles dans le panier 

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
} //ajout de notre arcticle dans notre panier au clique (titre + prix + image)

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row') //creation d'une div avec les propriétés de la div 'cart-row' (titre + prix + quatité)
    var cartItems = document.getElementsByClassName('cart-items')[0] //div vide dans html ou on va push la div "cart-row"
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Le jeu a bien été ajouté au panier')
            return
        }
    } //creation d'une div avdc toute les infos de l'article choisi 
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">SUPPRIME</button>
        </div>` 
    cartRow.innerHTML = cartRowContents // code qui sera inseré dans notre div creee dans Le JS 'cart-row'
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() { //fonction pour le total à chaque item ajouté au panier
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row') //div avec les : titres, prix, quantité
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0] //pour le prix
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0] //pour la quantité
        var price = parseFloat(priceElement.innerText.replace('$', '')) //on remplace l'espace vide par le $
        var quantity = quantityElement.value //valeur du nombre d'article choisi
        total = total + (price * quantity) //le prix x quantité = total
    }
    total = Math.round(total * 100) / 100 //pour arreter à deux chiffres apres la virgule
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total //total du prix du panier 
}