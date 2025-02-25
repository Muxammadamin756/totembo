document.addEventListener('DOMContentLoaded', function () {
	const products = {
		cartier: {
			name: 'Cartier',
			img: './assets/images/product-1.png',
			price: 103,
			count: 0,
			favourite: false,
		},
		audemars: {
			name: 'Audemars',
			img: './assets/images/product-2.png',
			price: 113,
			count: 0,
			favourite: false,
		},
		tag: {
			name: 'Tag',
			img: './assets/images/product-3.png',
			price: 89,
			count: 0,
			favourite: false,
		},
		duchen: {
			name: 'Duchen',
			img: './assets/images/product-4.png',
			price: 75,
			count: 0,
			favourite: false,
		},
		rolex: {
			name: 'Rolex',
			img: './assets/images/product-5.png',
			price: 195,
			count: 0,
			favourite: false,
		},
		spikes: {
			name: 'Spikes',
			img: './assets/images/product-6.png',
			price: 195,
			count: 0,
			favourite: false,
		},
		pierre: {
			name: 'Pierrelannier',
			img: './assets/images/product-7.png',
			price: 102,
			count: 0,
			favourite: false,
		},
		tiamo: {
			name: 'Tiamo',
			img: './assets/images/product-8.png',
			price: 89,
			count: 0,
			favourite: false,
		},
		tag2: {
			name: 'Tag2',
			img: './assets/images/product-9.png',
			price: 89,
			count: 0,
			favourite: false,
		},
		montblanc: {
			name: 'Montblanc',
			img: './assets/images/product-10.png',
			price: 67,
			count: 0,
			favourite: false,
		},
		jaeger: {
			name: 'Jaeger',
			img: './assets/images/product-11.png',
			price: 195,
			count: 0,
			favourite: false,
		},
		hockey: {
			name: 'Hockey',
			img: './assets/images/product-12.png',
			price: 59,
			count: 0,
			favourite: false,
		},
	}

	const elements = {
		menu: document.querySelector('.hidden-header__nav'),
		menuButton: document.querySelector('.header__wrapper-btn-menu'),
		closeButton: document.querySelector('.header__wrapper-btn-close'),
		cartModal: document.querySelector('.cart'),
		favouriteModal: document.querySelector('.favourite'),
		cartBtnChecklist: document.querySelector('.cart__modal-list'),
		favouriteChecklist: document.querySelector('.favourite__modal-list'),
		totalPriceCart: document.querySelector('.cart__modal-bottom-price'),
		cartCount: document.querySelector('.header__wrapper-cart-count'),
		likesCount: document.querySelector('.header__wrapper-favourite-count'),
		selectLang: document.querySelector('.header__wrapper-select'),
	}

	// **Menu ochish/yopish**
	elements.menuButton.addEventListener('click', () =>
		elements.menu.classList.add('active')
	)
	elements.closeButton.addEventListener('click', () =>
		elements.menu.classList.remove('active')
	)

	// **Savat va sevimlilarni yangilash**
	function updateUI() {
		elements.cartBtnChecklist.innerHTML = Object.values(products)
			.filter(p => p.count > 0)
			.map(createCartItem)
			.join('')
		elements.favouriteChecklist.innerHTML = Object.values(products)
			.filter(p => p.favourite)
			.map(createFavouriteItem)
			.join('')
		elements.totalPriceCart.textContent = totalSum()
		elements.cartCount.textContent = totalCartItems()
		elements.likesCount.textContent = totalFavourites()
		elements.cartCount.classList.toggle('active', totalCartItems() > 0)
		elements.likesCount.classList.toggle('active', totalFavourites() > 0)
	}

	// **Modal oynalarni ochish/yopish**
	document
		.querySelectorAll('.cart__modal-open, .cart__modal-close')
		.forEach(btn => {
			btn.addEventListener('click', () =>
				elements.cartModal.classList.toggle('active')
			)
		})

	document
		.querySelectorAll('.favourite__modal-open, .favourite__modal-close')
		.forEach(btn => {
			btn.addEventListener('click', () =>
				elements.favouriteModal.classList.toggle('active')
			)
		})


	// **Mahsulot modallarini yaratish**
	const createCartItem = item => ` 
    <li class="cart__modal-item">
      <div class="cart__modal-item-info">
        <img src="${item.img}" width="70" height="80" alt="${item.name}" />
        <div class="cart__modal-item-name">
          <h3 class="cart__modal-item-brand">${item.name}</h3>
          <span class="cart__modal-item-price">${item.count * item.price}</span>
        </div>
      </div>
      <div class="cart__modal-item-count">
        <button class="cart__modal-item-btn minus" data-id="${item.name
		}" data-action="-">-</button>
        <span class="cart__modal-item-counter">${item.count}</span>
        <button class="cart__modal-item-btn plus" data-id="${item.name
		}" data-action="+">+</button>
      </div>
    </li>`

	const createFavouriteItem = item => `
    <li class="favourite__modal-item">
      <div class="favourite__modal-item-info">
        <img src="${item.img}" width="70" height="80" alt="${item.name}" />
        <div class="cart__modal-item-name">
          <h3 class="favourite__modal-item-brand">${item.name}</h3>
          <span class="favourite__modal-item-price">${item.price}</span>
        </div>
      </div>
      <button class="favourite__modal-item-btn">
        <i class="fa-solid fa-heart fa-xl"></i>
      </button>
    </li>`

	// **Hisoblash funksiyalari**
	const totalSum = () =>
		Object.values(products).reduce((sum, p) => sum + p.count * p.price, 0)
	const totalCartItems = () =>
		Object.values(products).reduce((sum, p) => sum + p.count, 0)
	const totalFavourites = () =>
		Object.values(products).filter(p => p.favourite).length

	// **Savatcha va sevimlilarga qo'shish**
	document.querySelectorAll('.product__link-btn').forEach(button => {
		button.addEventListener('click', function () {
			const productKey = this.closest('.product__link')?.id
			if (!products[productKey]) return

			if (this.classList.contains('cart-btn')) {
				products[productKey].count++
			} else if (this.classList.contains('favourite-btn')) {
				products[productKey].favourite = !products[productKey].favourite
			}
			updateUI()
			this.classList.toggle('active')
		})
	})

	// **Savatcha ichidagi tugmalarni boshqarish**
	elements.cartBtnChecklist.addEventListener('click', function (e) {
		const btn = e.target.closest('.cart__modal-item-btn')
		if (!btn) return

		const productKey = btn.dataset.id.toLowerCase()
		const action = btn.dataset.action

		if (products[productKey]) {
			products[productKey].count = Math.max(
				0,
				products[productKey].count + (action === '+' ? 1 : -1)
			)
			updateUI()
		}
	})

	// **Sevimlilarni o'chirish**
	elements.favouriteChecklist.addEventListener('click', function (e) {
		if (e.target.closest('.favourite__modal-item-btn')) {
			const itemElement = e.target.closest('.favourite__modal-item')
			if (!itemElement) return

			const productKey = itemElement
				.querySelector('.favourite__modal-item-brand')
				?.textContent.toLowerCase()
			if (productKey && products[productKey]) {
				products[productKey].favourite = false
				updateUI()
			}
		}
	})


	// **Tilni yangilash funksiyasi**
	const allLang = ['en', 'ru', 'uz'];

	function updateLanguage(lang) {
		if (!allLang.includes(lang)) lang = 'en'
		localStorage.setItem('language', lang)
		elements.selectLang.value = lang

		document.querySelectorAll('[data-lang]').forEach(el => {
			const key = el.dataset.lang
			const translation = languageArr[key]

			if (translation?.[lang]) {
				el.textContent = translation[lang]
			}
		})
	}

	// **Sahifa yuklanganda tilni qo‘llash**
	updateLanguage(localStorage.getItem('language') || 'en')
	elements.selectLang.addEventListener('change', () =>
		updateLanguage(elements.selectLang.value)
	)
})
