import { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface AddBookModalProps {
  onClose: () => void;
}

export function AddBookModal({ onClose }: AddBookModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publisher: '',
    isbn: '',
    price: '',
    hasEbook: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика сохранения книги
    console.log('Добавление книги:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Добавить книгу</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название книги *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Введите название"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Автор *
              </label>
              <select
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">Выберите автора</option>
                <option value="bulgakov">Булгаков М.А.</option>
                <option value="dostoevsky">Достоевский Ф.М.</option>
                <option value="tolstoy">Толстой Л.Н.</option>
                <option value="orwell">Оруэлл Дж.</option>
                <option value="rowling">Роулинг Дж.К.</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Жанр *
              </label>
              <select
                required
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">Выберите жанр</option>
                <option value="classic">Классическая литература</option>
                <option value="fantasy">Фэнтези</option>
                <option value="dystopia">Антиутопия</option>
                <option value="detective">Детектив</option>
                <option value="tale">Сказка</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Издательство *
              </label>
              <select
                required
                value={formData.publisher}
                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">Выберите издательство</option>
                <option value="ast">АСТ</option>
                <option value="eksmo">Эксмо</option>
                <option value="azbuka">Азбука</option>
                <option value="mahon">Махаон</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ISBN *
              </label>
              <input
                type="text"
                required
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="978-5-17-123456-7"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Цена *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Обложка книги
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Нажмите для загрузки обложки</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG до 5MB</p>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasEbook}
                  onChange={(e) => setFormData({ ...formData, hasEbook: e.target.checked })}
                  className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Есть электронная версия (E-book)
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Добавить книгу
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
