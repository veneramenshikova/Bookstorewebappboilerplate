export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Настройки</h2>
        <p className="text-gray-600">Конфигурация системы</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Общие настройки */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Общие настройки</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название магазина
              </label>
              <input
                type="text"
                defaultValue="Читай-Город"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email для уведомлений
              </label>
              <input
                type="email"
                defaultValue="info@chitai-gorod.ru"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Телефон
              </label>
              <input
                type="tel"
                defaultValue="+7 (495) 123-45-67"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Адрес
              </label>
              <textarea
                rows={3}
                defaultValue="г. Москва, ул. Ленина, д. 1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Настройки программы лояльности */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Программа лояльности</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Процент начисления бонусов
              </label>
              <input
                type="number"
                defaultValue="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">От суммы покупки</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Минимальная сумма для начисления
              </label>
              <input
                type="number"
                defaultValue="500"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">В рублях</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Порог для VIP статуса
              </label>
              <input
                type="number"
                defaultValue="50000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Сумма покупок за все время</p>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                />
                <span className="text-sm text-gray-700">Начислять бонусы за каждую покупку</span>
              </label>
            </div>
          </div>
        </div>

        {/* Настройки склада */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Управление складом</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Минимальный остаток по умолчанию
              </label>
              <input
                type="number"
                defaultValue="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Штук</p>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                />
                <span className="text-sm text-gray-700">Уведомлять о низких остатках</span>
              </label>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                />
                <span className="text-sm text-gray-700">Автоматическое резервирование при заказе</span>
              </label>
            </div>
          </div>
        </div>

        {/* Настройки заказов */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Заказы</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Минимальная сумма заказа
              </label>
              <input
                type="number"
                defaultValue="300"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">В рублях</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Бесплатная доставка от
              </label>
              <input
                type="number"
                defaultValue="2000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">В рублях</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Стоимость доставки
              </label>
              <input
                type="number"
                defaultValue="300"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">В рублях</p>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                />
                <span className="text-sm text-gray-700">Отправлять SMS-уведомления клиентам</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Отмена
        </button>
        <button className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
          Сохранить изменения
        </button>
      </div>
    </div>
  );
}
