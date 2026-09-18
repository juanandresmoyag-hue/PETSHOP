import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Product {
  categoria: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
}

interface CartItem {
  product: Product;
  cantidad: number;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  activeCategory = 'Todos';
  cartItems: CartItem[] = [];
  favoriteProducts: string[] = [];
  selectedProduct: Product | null = null;
  isCartOpen = false;
  newsletterEmail = '';
  newsletterMessage = '';
  newsletterError = '';

  products: Product[] = [
    {
      categoria: 'Para consentir',
      nombre: 'Cuerda mordedora',
      descripcion: 'Juego activo para compartir.',
      imagen: 'juguete-cuerda.jpg',
      precio: 189
    },
    {
      categoria: 'Para consentir',
      nombre: 'Pelota aventurera',
      descripcion: 'Diversión para cada paseo.',
      imagen: 'juguete-pelota.jpg',
      precio: 149
    },
    {
      categoria: 'Para consentir',
      nombre: 'Mordedor resistente',
      descripcion: 'Estimula y ayuda a sus dientes.',
      imagen: 'juguete-mordedor.jpg',
      precio: 229
    },
    {
      categoria: 'Para consentir',
      nombre: 'Juego de inteligencia',
      descripcion: 'Retos para mentes curiosas.',
      imagen: 'juguete-interactivo.jpg',
      precio: 279
    },
    {
      categoria: 'Para consentir',
      nombre: 'Caña para gato',
      descripcion: 'Instinto y movimiento en casa.',
      imagen: 'juguete-gato.jpg',
      precio: 119
    },
    {
      categoria: 'Más vendido',
      nombre: 'Galletas horneadas',
      descripcion: 'Un premio crujiente y natural.',
      imagen: 'premio-galletas.jpg',
      precio: 99
    },
    {
      categoria: 'Más vendido',
      nombre: 'Snacks de pollo',
      descripcion: 'Pequeños bocados de felicidad.',
      imagen: 'premio-snacks.jpg',
      precio: 129
    },
    {
      categoria: 'Más vendido',
      nombre: 'Huesitos dentales',
      descripcion: 'Premio que también cuida.',
      imagen: 'premio-huesitos.jpg',
      precio: 159
    },
    {
      categoria: 'Más vendido',
      nombre: 'Premios naturales',
      descripcion: 'Ingredientes que puedes reconocer.',
      imagen: 'premio-natural.jpg',
      precio: 139
    },
    {
      categoria: 'Más vendido',
      nombre: 'Premios para entrenamiento',
      descripcion: 'Perfectos para aprender juntos.',
      imagen: 'premio-entrenamiento.jpg',
      precio: 109
    },
    {
      categoria: 'Cuidado diario',
      nombre: 'Peine desenredante',
      descripcion: 'Pelaje suave y sin tirones.',
      imagen: 'cuidado-peine.jpg',
      precio: 179
    },
    {
      categoria: 'Cuidado diario',
      nombre: 'Corta uñas seguro',
      descripcion: 'Cuidado preciso en casa.',
      imagen: 'cuidado-unas.jpg',
      precio: 149
    },
    {
      categoria: 'Cuidado diario',
      nombre: 'Shampoo para piel sensible',
      descripcion: 'Limpieza suave y fresca.',
      imagen: 'cuidado-shampoo.jpg',
      precio: 219
    },
    {
      categoria: 'Cuidado diario',
      nombre: 'Kit de higiene',
      descripcion: 'Todo para su rutina diaria.',
      imagen: 'cuidado-kit.jpg',
      precio: 329
    },
    {
      categoria: 'Cuidado diario',
      nombre: 'Toalla absorbente',
      descripcion: 'Secado rápido después del baño.',
      imagen: 'cuidado-toalla.jpg',
      precio: 199
    }
  ];

  ngOnInit() {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const savedCart = localStorage.getItem('petshop-cart');
    const savedFavorites = localStorage.getItem('petshop-favorites');

    if (savedCart) {
      this.cartItems = JSON.parse(savedCart) as CartItem[];
    }

    if (savedFavorites) {
      this.favoriteProducts = JSON.parse(savedFavorites) as string[];
    }
  }

  setCategory(categoria: string) {
    this.activeCategory = categoria;
  }

  get filteredProducts() {
    return this.activeCategory === 'Todos'
      ? this.products
      : this.products.filter(product => product.categoria === this.activeCategory);
  }

  formatPrice(price: number) {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(price);
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.nombre === product.nombre);

    if (existingItem) {
      existingItem.cantidad += 1;
    } else {
      this.cartItems.push({ product, cantidad: 1 });
    }

    this.saveCart();
    this.isCartOpen = true;
  }

  updateQuantity(item: CartItem, change: number) {
    item.cantidad += change;

    if (item.cantidad <= 0) {
      this.removeFromCart(item);
      return;
    }

    this.saveCart();
  }

  removeFromCart(item: CartItem) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
    this.saveCart();
  }

  toggleFavorite(product: Product) {
    const favoriteIndex = this.favoriteProducts.indexOf(product.nombre);

    if (favoriteIndex >= 0) {
      this.favoriteProducts.splice(favoriteIndex, 1);
    } else {
      this.favoriteProducts.push(product.nombre);
    }

    this.saveFavorites();
  }

  isFavorite(product: Product) {
    return this.favoriteProducts.includes(product.nombre);
  }

  openProductDetails(product: Product) {
    this.selectedProduct = product;
  }

  closeProductDetails() {
    this.selectedProduct = null;
  }

  get cartQuantity() {
    return this.cartItems.reduce((total, item) => total + item.cantidad, 0);
  }

  get cartTotal() {
    return this.cartItems.reduce(
      (total, item) => total + item.product.precio * item.cantidad,
      0
    );
  }

  getProductRating(product: Product) {
    return product.categoria === 'Más vendido' ? 4.9 : 4.8;
  }

  getProductTestimonial(product: Product) {
    if (product.categoria === 'Cuidado diario') {
      return 'Me ayudó a mantener la rutina de cuidado de mi mascota mucho más sencilla.';
    }

    if (product.categoria === 'Para consentir') {
      return 'A mi mascota le encantó desde el primer día y el material se siente resistente.';
    }

    return 'Un producto práctico, de buena calidad y que volvería a comprar.';
  }

  subscribeToNewsletter() {
    this.newsletterMessage = '';
    this.newsletterError = '';

    if (!this.newsletterEmail || !this.newsletterEmail.includes('@')) {
      this.newsletterError = 'Escribe un correo electrónico válido.';
      return;
    }

    this.newsletterMessage = '¡Listo! Recibirás nuestras novedades y consejos.';
    this.newsletterEmail = '';
  }

  private saveCart() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('petshop-cart', JSON.stringify(this.cartItems));
    }
  }

  private saveFavorites() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('petshop-favorites', JSON.stringify(this.favoriteProducts));
    }
  }

}
