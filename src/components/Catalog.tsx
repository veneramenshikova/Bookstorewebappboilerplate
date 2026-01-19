import { useState } from 'react';
import { Search, Plus, Edit, Filter, CheckCircle, XCircle } from 'lucide-react';
import { AddBookModal } from './modals/AddBookModal';

export function Catalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedPublisher, setSelectedPublisher] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const books = [
    {
      id: 1,
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=150&fit=crop',
      title: 'Мастер и Маргарита',
      author: 'Булгаков М.А.',
      genre: 'Классическая литература',
      publisher: 'АСТ',
      price: '890 ₽',
      stock: 15,
      hasEbook: true,
      isbn: '978-5-17-123456-7'
    },
    {
      id: 2,
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop',
      title: '1984',
      author: 'Оруэлл Дж.',
      genre: 'Антиутопия',
      publisher: 'Азбука',
      price: '650 ₽',
      stock: 23,
      hasEbook: true,
      isbn: '978-5-389-12345-6'
    },
    {
      id: 3,
      cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=100&h=150&fit=crop',
      title: 'Преступление и наказание',
      author: 'Достоевский Ф.М.',
      genre: 'Классическая литература',
      publisher: 'Эксмо',
      price: '720 ₽',
      stock: 8,
      hasEbook: false,
      isbn: '978-5-699-87654-3'
    },
    {
      id: 4,
      cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=100&h=150&fit=crop',
      title: 'Гарри Поттер и философский камень',
      author: 'Роулинг Дж.К.',
      genre: 'Фэнтези',
      publisher: 'Махаон',
      price: '1 290 ₽',
      stock: 32,
      hasEbook: true,
      isbn: '978-5-389-23456-7'
    },
    {
      id: 5,
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=150&fit=crop',
      title: 'Война и мир',
      author: 'Толстой Л.Н.',
      genre: 'Классическая литература',
      publisher: 'АСТ',
      price: '1 450 ₽',
      stock: 12,
      hasEbook: true,
      isbn: '978-5-17-234567-8'
    },
    {
      id: 6,
      cover: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=100&h=150&fit=crop',
      title: 'Маленький принц',
      author: 'Сент-Экзюпери А.',
      genre: 'Сказка',
      publisher: 'Эксмо',
      price: '490 ₽',
      stock: 45,
      hasEbook: false,
      isbn: '978-5-699-34567-9'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Каталог товаров</h2>
          <p className="text-gray-600">Управление книгами в магазине</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Добавить книгу</span>
        </button>
      </div>

      {/* Фильтры и поиск */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по названию, автору, ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">Все жанры</option>
              <option value="classic">Классическая литература</option>
              <option value="fantasy">Фэнтези</option>
              <option value="dystopia">Антиутопия</option>
              <option value="tale">Сказка</option>
            </select>
          </div>

          <div>
            <select
              value={selectedPublisher}
              onChange={(e) => setSelectedPublisher(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">Все издательства</option>
              <option value="ast">АСТ</option>
              <option value="eksmo">Эксмо</option>
              <option value="azbuka">Азбука</option>
              <option value="mahon">Махаон</option>
            </select>
          </div>
        </div>
      </div>

      {/* Таблица книг */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Обложка</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Автор</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Жанр</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Издательство</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Цена</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Остаток</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-book</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <img src={book.cover} alt={book.title} className="w-12 h-16 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{book.title}</div>
                    <div className="text-xs text-gray-500">{book.isbn}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{book.author}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{book.genre}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{book.publisher}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{book.price}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${
                      book.stock > 20 ? 'text-green-600' : 
                      book.stock > 10 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {book.stock} шт.
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {book.hasEbook ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-gray-300" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && <AddBookModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
