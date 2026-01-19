import React, { useState } from 'react';
import { Search, AlertTriangle, Package, TrendingDown, FileText } from 'lucide-react';

// Mock данные склада
const mockInventory = [
  { 
    id: 1, 
    title: 'Мастер и Маргарита', 
    sku: 'BK-001234',
    category: 'Классика',
    total: 23, 
    reserved: 5, 
    available: 18,
    minStock: 10,
    supplier: 'АСТ',
    needsReorder: false
  },
  { 
    id: 2, 
    title: 'Преступление и наказание', 
    sku: 'BK-001235',
    category: 'Классика',
    total: 15, 
    reserved: 3, 
    available: 12,
    minStock: 10,
    supplier: 'Эксмо',
    needsReorder: false
  },
  { 
    id: 3, 
    title: 'Война и мир (комплект)', 
    sku: 'BK-001236',
    category: 'Классика',
    total: 8, 
    reserved: 2, 
    available: 6,
    minStock: 10,
    supplier: 'АСТ',
    needsReorder: true
  },
  { 
    id: 4, 
    title: 'Гарри Поттер и философский камень', 
    sku: 'BK-001237',
    category: 'Фэнтези',
    total: 42, 
    reserved: 8, 
    available: 34,
    minStock: 20,
    supplier: 'Росмэн',
    needsReorder: false
  },
  { 
    id: 5, 
    title: '1984', 
    sku: 'BK-001238',
    category: 'Антиутопия',
    total: 31, 
    reserved: 6, 
    available: 25,
    minStock: 15,
    supplier: 'АСТ',
    needsReorder: false
  },
  { 
    id: 6, 
    title: 'Атлант расправил плечи', 
    sku: 'BK-001239',
    category: 'Философия',
    total: 5, 
    reserved: 1, 
    available: 4,
    minStock: 8,
    supplier: 'Альпина',
    needsReorder: true
  },
  { 
    id: 7, 
    title: 'Евгений Онегин', 
    sku: 'BK-001240',
    category: 'Классика',
    total: 3, 
    reserved: 2, 
    available: 1,
    minStock: 10,
    supplier: 'АСТ',
    needsReorder: true
  },
];

export function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyLowStock, setShowOnlyLowStock] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const filteredInventory = mockInventory.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLowStock = !showOnlyLowStock || item.needsReorder;
    return matchesSearch && matchesLowStock;
  });

  const toggleItemSelection = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const lowStockCount = mockInventory.filter(item => item.needsReorder).length;

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Склад и остатки</h1>
        <p className="text-gray-500 mt-1">Управление товарными запасами</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Всего позиций</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{mockInventory.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Товаров на складе</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {mockInventory.reduce((sum, item) => sum + item.total, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Зарезервировано</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {mockInventory.reduce((sum, item) => sum + item.reserved, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Package className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Требует заказа</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{lowStockCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Поиск и фильтры */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Поиск по названию или SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={showOnlyLowStock}
              onChange={(e) => setShowOnlyLowStock(e.target.checked)}
              className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
            />
            <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <TrendingDown size={16} className="text-red-500" />
              Только ниже минимального остатка
            </span>
          </label>
        </div>
      </div>

      {/* Кнопка для создания заявки на закупку */}
      {selectedItems.length > 0 && (
        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-cyan-900">
              Выбрано позиций: {selectedItems.length}
            </p>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium flex items-center gap-2">
              <FileText size={18} />
              Сформировать заявку на закупку
            </button>
          </div>
        </div>
      )}

      {/* ��аблица остатков */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-4">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(filteredInventory.map(item => item.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                    className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                  />
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Название книги</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">SKU</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Категория</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Остаток всего</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Зарезервировано</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Доступно</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Мин. остаток</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Поставщик</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Статус</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr 
                  key={item.id} 
                  className={`border-b border-gray-100 hover:bg-gray-50 ${item.needsReorder ? 'bg-red-50' : ''}`}
                >
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItemSelection(item.id)}
                      className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{item.title}</p>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{item.sku}</td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{item.total} шт</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{item.reserved} шт</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      item.available > 20 ? 'bg-green-100 text-green-700' :
                      item.available > 10 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.available} шт
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{item.minStock} шт</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{item.supplier}</td>
                  <td className="py-4 px-4">
                    {item.needsReorder ? (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertTriangle size={16} />
                        <span className="text-xs font-medium">Нужно заказать</span>
                      </div>
                    ) : (
                      <span className="text-xs text-green-600 font-medium">OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
