import { X, User, Phone, Mail, MapPin, Package, QrCode } from 'lucide-react';

interface OrderDetailModalProps {
  order: any;
  onClose: () => void;
}

export function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Заказ {order.id}</h3>
            <p className="text-sm text-gray-600 mt-1">{order.date}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Информация о клиенте */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-gray-900 mb-3">Информация о клиенте</h4>
              
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">ФИО</div>
                  <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Телефон</div>
                  <div className="text-sm font-medium text-gray-900">{order.phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="text-sm font-medium text-gray-900">{order.email}</div>
                </div>
              </div>

              {order.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Адрес доставки</div>
                    <div className="text-sm font-medium text-gray-900">{order.address}</div>
                  </div>
                </div>
              )}

              {order.pickupPoint && (
                <>
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Точка выдачи</div>
                      <div className="text-sm font-medium text-gray-900">{order.pickupPoint}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <QrCode className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Код получения</div>
                      <div className="text-lg font-bold text-cyan-600">{order.pickupCode}</div>
                    </div>
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-1">История заказов</div>
                <div className="text-sm font-medium text-gray-900">15 заказов на сумму 42 350 ₽</div>
              </div>
            </div>

            {/* Список товаров */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Товары в заказе</h4>
                
                <div className="space-y-3">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500">
                          {item.quantity} × {item.price} ₽
                        </div>
                      </div>
                      <div className="font-semibold text-gray-900">{item.total} ₽</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-semibold text-gray-900">Итого:</span>
                    <span className="font-bold text-cyan-600">{order.amount}</span>
                  </div>
                </div>
              </div>

              {/* Статус и действия */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Статус и действия</h4>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Текущий статус
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none bg-white">
                    <option>Новый</option>
                    <option>Подтвержден</option>
                    <option>Собран</option>
                    <option>Передан курьеру</option>
                    <option>Выполнен</option>
                    <option>Отменён</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ответственный сотрудник
                  </label>
                  <input
                    type="text"
                    value={order.responsible}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
                  />
                </div>

                {/* Шаговый индикатор */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white mb-1">
                        ✓
                      </div>
                      <span className="text-xs text-gray-600">Создан</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-gray-300"></div>
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white mb-1">
                        2
                      </div>
                      <span className="text-xs text-gray-600">Подтвержден</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-gray-300"></div>
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white mb-1">
                        3
                      </div>
                      <span className="text-xs text-gray-600">Собран</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-gray-300"></div>
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white mb-1">
                        4
                      </div>
                      <span className="text-xs text-gray-600">Доставлен</span>
                    </div>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                    Подтвердить
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Отметить как собран
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Передать курьеру
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Завершить заказ
                  </button>
                  <button className="col-span-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                    Отменить заказ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
