import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, QrCode, Check, X } from 'lucide-react';
import { unsplash_tool } from '../../lib/unsplash';

// Mock данные книг
const mockBooks = [
  { 
    id: 1, 
    title: 'Мастер и Маргарита', 
    author: 'Булгаков М.А.', 
    genre: 'Классика', 
    publisher: 'АСТ', 
    price: 450, 
    stock: 23, 
    hasEbook: true,
    isbn: '978-5-17-123456-7',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=150&fit=crop'
  },
  { 
    id: 2, 
    title: 'Преступление и наказание', 
    author: 'Достоевский Ф.М.', 
    genre: 'Классика', 
    publisher: 'Эксмо', 
    price: 520, 
    stock: 15, 
    hasEbook: true,
    isbn: '978-5-04-098765-4',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=150&fit=crop'
  },
  { 
    id: 3, 
    title: 'Война и мир (комплект)', 
    author: 'Толстой Л.Н.', 
    genre: 'Классика', 
    publisher: 'АСТ', 
    price: 1200, 
    stock: 8, 
    hasEbook: false,
    isbn: '978-5-17-234567-8',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop'
  },
  { 
    id: 4, 
    title: 'Гарри Поттер и философский камень', 
    author: 'Роулинг Дж.К.', 
    genre: 'Фэнтези', 
    publisher: 'Росмэн', 
    price: 680, 
    stock: 42, 
    hasEbook: true,
    isbn: '978-5-353-09876-5',
    cover: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=100&h=150&fit=crop'
  },
  { 
    id: 5, 
    title: '1984', 
    author: 'Оруэлл Дж.', 
    genre: 'Антиутопия', 
    publisher: 'АСТ', 
    price: 390, 
    stock: 31, 
    hasEbook: true,
    isbn: '978-5-17-345678-9',
    cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=100&h=150&fit=crop'
  },
  { 
    id: 6, 
    title: 'Атлант расправил плечи', 
    author: 'Рэнд А.', 
    genre: 'Философия', 
    publisher: 'Альпина', 
    price: 890, 
    stock: 5, 
    hasEbook: false,
    isbn: '978-5-9614-12345-6',
    cover: 'https://images.unsplash.com/photo-1576872381149-7847515ce5d8?w=100&h=150&fit=crop'
  },
];

export function Catalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const genres = ['Все', 'Классика', 'Фэнтези', 'Антиутопия', 'Философия', 'Детектив'];

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.isbn.includes(searchQuery);
    const matchesGenre = selectedGenre === 'Все' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Каталог товаров</h1>
          <p className="text-gray-500 mt-1">Управление книгами и остатками</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
        >
          <Plus size={20} />
          Добавить книгу
        </button>
      </div>

      {/* Поиск и фильтры */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Поиск */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Поиск по названию, автору или ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          {/* Фильтр по жанру */}
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" size={20} />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Таблица книг */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Обложка</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Название книги</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Автор</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Жанр</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Издательство</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Цена</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Остаток</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">E-book / QR</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded shadow-sm"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{book.title}</p>
                    <p className="text-xs text-gray-500 mt-1">ISBN: {book.isbn}</p>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">{book.author}</td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {book.genre}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">{book.publisher}</td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{book.price} ₽</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      book.stock > 20 ? 'bg-green-100 text-green-700' :
                      book.stock > 10 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {book.stock} шт
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {book.hasEbook ? (
                      <div className="flex items-center gap-1 text-cyan-600">
                        <QrCode size={16} />
                        <Check size={16} />
                      </div>
                    ) : (
                      <X size={16} className="text-gray-400" />
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Модальное окно добавления книги */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Добавить книгу</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <form className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Название книги</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Введите название"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Автор</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option>Выберите автора</option>
                    <option>Булгаков М.А.</option>
                    <option>Достоевский Ф.М.</option>
                    <option>Толстой Л.Н.</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Жанр</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option>Выберите жанр</option>
                    {genres.filter(g => g !== 'Все').map(genre => (
                      <option key={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Издательство</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Название издательства"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ISBN</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="978-5-XXX-XXXXX-X"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Цена (₽)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Количество на складе</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500" />
                    <span className="text-sm font-medium text-gray-700">Доступна электронная версия</span>
                  </label>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Обложка</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
                >
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
