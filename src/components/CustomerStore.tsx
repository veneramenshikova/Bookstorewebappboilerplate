import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, BookOpen, X, Plus, Minus, Trash2, QrCode } from 'lucide-react';

interface CustomerStoreProps {
  onSwitchToAdmin?: () => void;
}

export function CustomerStore({ onSwitchToAdmin }: CustomerStoreProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const categories = [
    'Все книги',
    'Классическая литература',
    'Фэнтези',
    'Детективы',
    'Научпоп',
    'Сказки',
    'Канцелярия',
  ];

  const books = [
    {
      id: 1,
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
      title: 'Мастер и Маргарита',
      author: 'Булгаков М.А.',
      price: 890,
      inStock: true,
      hasEbook: true,
      description: 'Роман Михаила Булгакова, сочетающий в себе фантастику, сатиру и философию. История о любви, которая преодолевает все границы.'
    },
    {
      id: 2,
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
      title: '1984',
      author: 'Оруэлл Дж.',
      price: 650,
      inStock: true,
      hasEbook: true,
      description: 'Антиутопия о тоталитарном обществе, где правительство контролирует каждый аспект жизни граждан.'
    },
    {
      id: 3,
      cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop',
      title: 'Преступление и наказание',
      author: 'Достоевский Ф.М.',
      price: 720,
      inStock: true,
      hasEbook: false,
      description: 'Психологический роман о моральных дилеммах и внутренних терзаниях главного героя.'
    },
    {
      id: 4,
      cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop',
      title: 'Гарри Поттер и философский камень',
      author: 'Роулинг Дж.К.',
      price: 1290,
      inStock: true,
      hasEbook: true,
      description: 'Начало магической саги о мальчике-волшебнике и его приключениях в школе чародейства и волшебства Хогвартс.'
    },
    {
      id: 5,
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
      title: 'Война и мир',
      author: 'Толстой Л.Н.',
      price: 1450,
      inStock: true,
      hasEbook: true,
      description: 'Эпический роман о жизни русского общества в эпоху наполеоновских войн.'
    },
    {
      id: 6,
      cover: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&h=400&fit=crop',
      title: 'Маленький принц',
      author: 'Сент-Экзюпери А.',
      price: 490,
      inStock: true,
      hasEbook: false,
      description: 'Философская сказка-притча о самых важных вещах в жизни: дружбе, любви и ответственности.'
    },
  ];

  const addToCart = (book: any) => {
    const existingItem = cart.find(item => item.id === book.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  const removeFromCart = (bookId: number) => {
    setCart(cart.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === bookId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-lg">Читай-Город</div>
                <div className="text-xs text-gray-500">Книжный магазин</div>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск книг..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {onSwitchToAdmin && (
                <button
                  onClick={onSwitchToAdmin}
                  className="text-sm text-gray-600 hover:text-cyan-600"
                >
                  Админ-панель
                </button>
              )}
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto py-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category || (selectedCategory === 'all' && category === 'Все книги')
                    ? 'bg-cyan-100 text-cyan-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={book.cover} alt={book.title} className="w-full h-64 object-cover" />
                {book.hasEbook && (
                  <div className="absolute top-2 right-2 bg-cyan-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                    <QrCode className="w-3 h-3" />
                    E-book
                  </div>
                )}
                {!book.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium">
                      Нет в наличии
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{book.author}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-gray-900">{book.price} ₽</span>
                  {book.inStock && (
                    <span className="text-xs text-green-600">В наличии</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(book)}
                    disabled={!book.inStock}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      book.inStock
                        ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    В корзину
                  </button>
                  <button
                    onClick={() => setSelectedBook(book)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Menu className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Корзина ({cartItemsCount})</h3>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Корзина пуста</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <img src={item.cover} alt={item.title} className="w-16 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{item.author}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-gray-600 hover:bg-gray-200 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-gray-600 hover:bg-gray-200 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm font-bold text-gray-900 mt-2">
                        {item.price * item.quantity} ₽
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200 space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold text-gray-900">Итого:</span>
                  <span className="font-bold text-cyan-600">{totalAmount} ₽</span>
                </div>
                <button className="w-full px-4 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium">
                  Оформить заказ
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Подробнее о книге</h3>
              <button
                onClick={() => setSelectedBook(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img src={selectedBook.cover} alt={selectedBook.title} className="w-full rounded-lg" />
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{selectedBook.title}</h4>
                  <p className="text-lg text-gray-600 mb-4">{selectedBook.author}</p>
                  <p className="text-gray-700 mb-6">{selectedBook.description}</p>
                  <div className="text-3xl font-bold text-gray-900 mb-4">{selectedBook.price} ₽</div>
                  {selectedBook.hasEbook && (
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <QrCode className="w-5 h-5 text-cyan-600" />
                        <span className="font-semibold text-cyan-900">Электронная версия</span>
                      </div>
                      <p className="text-sm text-cyan-700">
                        Доступна электронная версия книги. QR-код будет отправлен на email после оплаты.
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      addToCart(selectedBook);
                      setSelectedBook(null);
                    }}
                    disabled={!selectedBook.inStock}
                    className={`w-full px-6 py-3 rounded-lg transition-colors font-medium ${
                      selectedBook.inStock
                        ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {selectedBook.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
