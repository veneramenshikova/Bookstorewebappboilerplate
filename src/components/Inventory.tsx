import { useState } from 'react';
import { Search, AlertTriangle, CheckSquare } from 'lucide-react';

export function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLowStock, setShowLowStock] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const inventory = [
    {
      id: 1,
      title: 'Мастер и Маргарита',
      sku: 'BK-001-2024',
      category: 'Классическая литература',
      supplier: 'ООО "КнигаОпт"',
      totalStock: 15,
      reserved: 3,
      available: 12,
      minStock: 10,
      needsReorder: false
    },
    {
      id: 2,
      title: '1984',
      sku: 'BK-002-2024',
      category: 'Антиутопия',
      supplier: 'ООО "КнигаОпт"',
      totalStock: 23,
      reserved: 5,
      available: 18,
      minStock: 15,
      needsReorder: false
    },
    {
      id: 3,
      title: 'Преступление и наказание',
      sku: 'BK-003-2024',
      category: 'Классическая литература',
      supplier: 'ИП Иванов',
      totalStock: 8,
      reserved: 2,
      available: 6,
      minStock: 10,
      needsReorder: true
    },
    {
      id: 4,
      title: 'Гарри Поттер и философский камень',
      sku: 'BK-004-2024',
      category: 'Фэнтези',
      supplier: 'ООО "Детские книги"',
      totalStock: 32,
      reserved: 8,
      available: 24,
      minStock: 20,
      needsReorder: false
    },
    {
      id: 5,
      title: 'Война и мир',
      sku: 'BK-005-2024',
      category: 'Классическая литература',
      supplier: 'ООО "КнигаОпт"',
      totalStock: 12,
      reserved: 4,
      available: 8,
      minStock: 10,
      needsReorder: false
    },
    {
      id: 6,
      title: 'Маленький принц',
      sku: 'BK-006-2024',
      category: 'Сказка',
      supplier: 'ИП Петров',
      totalStock: 4,
      reserved: 1,
      available: 3,
      minStock: 15,
      needsReorder: true
    },
    {
      id: 7,
      title: 'Анна Каренина',
      sku: 'BK-007-2024',
      category: 'Классическая литература',
      supplier: 'ООО "КнигаОпт"',
      totalStock: 5,
      reserved: 0,
      available: 5,
      minStock: 8,
      needsReorder: true
    },
  ];

  const toggleItem = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredInventory = showLowStock
    ? inventory.filter(item => item.needsReorder)
    : inventory;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Склад и остатки</h2>
          <p className="text-gray-600">Управление складскими запасами</p>
        </div>
        <button
          disabled={selectedItems.length === 0}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedItems.length > 0
              ? 'bg-cyan-600 text-white hover:bg-cyan-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Сформировать заявку на закупку ({selectedItems.length})
        </button>
      </div>

      {/* Предупреждение о низких остатках */}
      {inventory.filter(i => i.needsReorder).length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-orange-900 mb-1">
              Внимание! Товары требуют пополнения
            </h4>
            <p className="text-sm text-orange-700">
              {inventory.filter(i => i.needsReorder).length} позиций ниже минимального остатка.
              Рекомендуется создать заявку на закупку.
            </p>
          </div>
        </div>
      )}

      {/* Поиск и фильтры */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по названию, SKU, категории..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none bg-white">
            <option value="all">Все категории</option>
            <option value="classic">Классическая литература</option>
            <option value="fantasy">Фэнтези</option>
            <option value="dystopia">Антиутопия</option>
            <option value="tale">Сказка</option>
          </select>

          <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={showLowStock}
              onChange={(e) => setShowLowStock(e.target.checked)}
              className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
            />
            <span className="text-sm text-gray-700">Только низкие остатки</span>
          </label>
        </div>
      </div>

      {/* Таблица остатков */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(filteredInventory.map(i => i.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название книги</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU/ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Категория</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Поставщик</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Остаток всего</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Зарезервировано</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Доступно</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Мин. остаток</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    item.needsReorder ? 'bg-orange-50' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItem(item.id)}
                      className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.sku}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{item.totalStock} шт.</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{item.reserved} шт.</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      item.available > item.minStock ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.available} шт.
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.minStock} шт.
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.needsReorder ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <AlertTriangle className="w-3 h-3" />
                        Нужно заказать
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckSquare className="w-3 h-3" />
                        В норме
                      </span>
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
