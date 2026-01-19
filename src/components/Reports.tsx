import { useState } from 'react';
import { Calendar, TrendingUp, Award } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, PieChart, Cell, Legend } from 'recharts';

export function Reports() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');

  const salesByCategory = [
    { category: 'Классическая литература', sales: 145000, color: '#0891b2' },
    { category: 'Фэнтези', sales: 98000, color: '#7c3aed' },
    { category: 'Детективы', sales: 67000, color: '#2563eb' },
    { category: 'Сказки', sales: 45000, color: '#db2777' },
    { category: 'Научпоп', sales: 32000, color: '#059669' },
  ];

  const topBooks = [
    { rank: 1, title: 'Мастер и Маргарита', author: 'Булгаков М.А.', sales: 156, revenue: '138 840 ₽' },
    { rank: 2, title: 'Гарри Поттер и философский камень', author: 'Роулинг Дж.К.', sales: 142, revenue: '183 180 ₽' },
    { rank: 3, title: '1984', author: 'Оруэлл Дж.', sales: 128, revenue: '83 200 ₽' },
    { rank: 4, title: 'Война и мир', author: 'Толстой Л.Н.', sales: 98, revenue: '142 100 ₽' },
    { rank: 5, title: 'Преступление и наказание', author: 'Достоевский Ф.М.', sales: 87, revenue: '62 640 ₽' },
    { rank: 6, title: 'Маленький принц', author: 'Сент-Экзюпери А.', sales: 76, revenue: '37 240 ₽' },
    { rank: 7, title: 'Анна Каренина', author: 'Толстой Л.Н.', sales: 65, revenue: '58 500 ₽' },
    { rank: 8, title: 'Евгений Онегин', author: 'Пушкин А.С.', sales: 54, revenue: '32 400 ₽' },
    { rank: 9, title: 'Три товарища', author: 'Ремарк Э.М.', sales: 48, revenue: '38 400 ₽' },
    { rank: 10, title: 'Атлант расправил плечи', author: 'Рэнд А.', sales: 42, revenue: '63 000 ₽' },
  ];

  const turnoverData = [
    { month: 'Июль', turnover: 3.2 },
    { month: 'Август', turnover: 3.5 },
    { month: 'Сентябрь', turnover: 3.8 },
    { month: 'Октябрь', turnover: 4.1 },
    { month: 'Ноябрь', turnover: 4.5 },
    { month: 'Декабрь', turnover: 5.2 },
    { month: 'Январь', turnover: 4.8 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Отчёты и аналитика</h2>
          <p className="text-gray-600">Анализ продаж и ключевых показателей</p>
        </div>
        
        {/* Переключатель периода */}
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
          {(['day', 'week', 'month', 'year'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                period === p
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p === 'day' && 'День'}
              {p === 'week' && 'Неделя'}
              {p === 'month' && 'Месяц'}
              {p === 'year' && 'Год'}
            </button>
          ))}
        </div>
      </div>

      {/* Ключевые показатели */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-cyan-600" />
            <span className="text-sm text-gray-600">Выручка за период</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">612 340 ₽</div>
          <div className="text-sm text-green-600">+18% к предыдущему</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-600">Заказов</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">247</div>
          <div className="text-sm text-green-600">+12% к предыдущему</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-yellow-600" />
            <span className="text-sm text-gray-600">Средний чек</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">2 478 ₽</div>
          <div className="text-sm text-green-600">+340 ₽</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600">Конверсия</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">24.5%</div>
          <div className="text-sm text-green-600">+2.3%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* График продаж по категориям */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Продажи по категориям</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="sales"
              >
                {salesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} ₽`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* График оборачиваемости */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Оборачиваемость товара (раз/месяц)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={turnoverData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="turnover" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Топ-10 книг по продажам */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Топ-10 книг по продажам</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Место</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Автор</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Продано (шт)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Выручка</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topBooks.map((book) => (
                <tr key={book.rank} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white font-bold">
                      {book.rank}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{book.title}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{book.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {book.sales}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-600">
                    {book.revenue}
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
